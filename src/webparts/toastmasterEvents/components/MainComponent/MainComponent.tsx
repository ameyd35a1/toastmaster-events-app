import React, { useContext, useEffect, useState } from 'react'
import { getCategoryTitles, getEventData, getEventLikes, getEventsDates, getEventWinner } from '../../../../api';
import { useWebPartContext } from '../../../../hooks/useWebpartContext';
import { IEvent, IEventDropdownOption, IEventLikes, IEventLikesData, IEventWinner } from '../../Interfaces/IEvent';
import EventsComponent from '../EventsComponent/EventsComponent'
import styles from './MainComponent.module.scss'
import { Dropdown, IDropdownOption, IDropdownStyles, ISpinnerStyles, Separator, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import _ from '@microsoft/sp-lodash-subset';
import { DataContext } from '../../../../common/DataContext';
import CommentsSectionComponent from '../CommentsSectionComponent/CommentsSectionComponent';

const MainComponent = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [eventLoading, setEventLoading] = useState<boolean>(false);
    const [ddOptions, setDdOptions] = useState<IDropdownOption[]>([{ key: "--Select--", text: "Select" }]);
    const [event, setEvent] = useState<IEvent>(null);
    const [eventWinners, setEventWinners] = useState<IEventWinner[]>(null);
    const [categories, setCategories] = useState<Map<string, string>>(null);
    //const [eventLikes, setEventLikes] = useState<IEventLikes[]>(null);

    const { setLikes } = useContext(DataContext);

    const ctx = useWebPartContext(context => ({
        client: context.spHttpClient,
        user: context.pageContext.user.displayName,
        webUrl: context.pageContext.web.absoluteUrl,
        email: context.pageContext.user.email
    }));

    useEffect(() => {
        const onInit = async () => {
            setLoading(true);

            const options: IEventDropdownOption[] = await getEventsDates(ctx.client, ctx.webUrl);
            const tempOptions: IDropdownOption[] = options.map(e => { return { key: e.eventId.toString(), text: e.eventDate.toDateString() } })
            setDdOptions(tempOptions);

            const tempCategories: Map<string, string> = await getCategoryTitles(ctx.client, ctx.webUrl);
            setCategories(tempCategories)

            setLoading(false);
        }
        onInit();
    }, []);

    const loadSelectedEvent = async (_e, entry) => {
        setEventLoading(true);
        const eventData: IEvent = await getEventData(ctx.client, ctx.webUrl, entry.key);


        const eventWinnersData: IEventWinner[] = await getEventWinner(ctx.client, ctx.webUrl, new Date(entry.text));
        setEventWinners(eventWinnersData);

        //set Winner Data
        eventWinnersData.forEach(e => {
            if (eventData[e.category].length > 1) {
                eventData[e.category].filter(i => i.email === e.member)[0].winner = true
            } else {
                eventData[e.category].winner = true
            }
        })

        setEvent(eventData);

        const eventLikesData: IEventLikesData = await getEventLikes(ctx.client, ctx.webUrl, new Date(entry.text))
        // const data = _.groupBy(eventLikesData, 'member')        
        setLikes(eventLikesData);
        setEventLoading(false);
    }

    const dropdownStyles: Partial<IDropdownStyles> = {
        label: { color: "#460073" }
    };

    const spinnerStyle: Partial<ISpinnerStyles> = {
        circle: { color: "#460073" },
        label: { color: "#460073" }
    }

    return (
        <div className={styles.mainComponent}>
            {loading
                ? <Spinner size={SpinnerSize.large} label="Loading Events..." labelPosition="left" styles={spinnerStyle} />
                :
                <div>
                    <div className={styles.dropdown}>
                        <Dropdown placeholder="Select Event Date" label="Toastmaster Events on" options={ddOptions} onChange={loadSelectedEvent} styles={dropdownStyles} />
                    </div>
                    {eventLoading
                        ? <Spinner size={SpinnerSize.large} label="Loading Event Details..." labelPosition="left" styles={spinnerStyle} />
                        : event &&
                        <div>
                            <EventsComponent event={event} categories={categories} />
                            <Separator />
                            <CommentsSectionComponent data={event.comments} id={event.id} />
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default MainComponent
