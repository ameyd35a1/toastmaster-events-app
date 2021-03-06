import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import React, { FC, Fragment, useEffect, useState } from 'react'
import { Segment } from 'semantic-ui-react';
import { useWebPartContext } from '../../../../hooks/useWebpartContext'
import { IEvent, IEventLikes } from '../../Interfaces/IEvent';
import CategoryAltComponent from '../CategoryAltComponent/CategoryAltComponent';
import CategoryComponent from '../CategoryComponent/CategoryComponent';
import CollageComponent from '../CollageComponent/CollageComponent';
import styles from "./EventsComponent.module.scss"

interface IEventsComponentProps {
    event: IEvent,
    categories: Map<string, string>
}

const EventsComponent: FC<IEventsComponentProps> = ({ event, categories }) => {

    const [openModal, setOpenModal] = useState<boolean>(false);

    const handler = () => {
        setOpenModal(false);
    }

    return (
        <Fragment>
            <div className="">
                <PrimaryButton className={styles.viewCollage} onClick={() => setOpenModal(!openModal)} text='View Collage' />
                {openModal && <CollageComponent content={event} handler={handler} />}
            </div>
            <div>
            {event.TTH && <Segment raised inverted color='purple'>{event.TTH}</Segment>}
            </div>
            <div className={styles.main}>
                {categories && event &&
                    <Fragment>
                        <div className={styles.one}>
                            <CategoryComponent categoryId="SAA" categoryTitle={categories.get("SAA")} members={[event.SAA]} />
                        </div>
                        <div className={styles.two}>
                            <CategoryComponent categoryId="TOD" categoryTitle={categories.get("TOD")} members={[event.TOD]} />
                            <CategoryComponent categoryId="TTM" categoryTitle={categories.get("TTM")} members={[event.TTM]} />
                            <CategoryComponent categoryId="GE" categoryTitle={categories.get("GE")} members={[event.GE]} />
                        </div>
                        <div className={styles.two}>
                            <CategoryComponent categoryId="GMR" categoryTitle={categories.get("GMR")} members={[event.GMR]} />
                            <CategoryComponent categoryId="AHC" categoryTitle={categories.get("AHC")} members={[event.AHC]} />
                            <CategoryComponent categoryId="TMR" categoryTitle={categories.get("TMR")} members={[event.TMR]} />
                        </div>
                        <div className={styles.one}>
                            {/* <CategoryComponent categoryTitle={categories.get("PS")} members={[...event.PPS, ...event.PPE]} /> */}
                            <CategoryAltComponent categoryId="PS" categoryTitle={categories.get("PS")} members={[...event.PPS]} evaluaters={[...event.PPE]} theme={[...event.PPSS]} />
                        </div>
                        <div className={styles.one}>
                            <CategoryComponent categoryId="TTS" categoryTitle={categories.get("TTS")} members={[...event.TTS]} theme={[...event.TTSS]} />
                        </div>
                    </Fragment>
                }
            </div>
        </Fragment>
    )
}

export default EventsComponent