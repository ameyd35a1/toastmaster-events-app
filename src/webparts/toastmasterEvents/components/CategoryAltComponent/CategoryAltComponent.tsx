import React, { FC } from 'react'
import UserComponent from '../UserComponent/UserComponent'
import styles from './CategoryAltComponent.module.scss'
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IEventLikes, IEventMember } from '../../Interfaces/IEvent'
import { ITooltipHostStyles, TooltipHost } from 'office-ui-fabric-react'

interface ICategoryAltComponentProps {
    members: IEventMember[],
    evaluaters: IEventMember[],
    categoryTitle: string,
    categoryId: string,
    theme?: string[]
}

const CategoryAltComponent: FC<ICategoryAltComponentProps> = ({ members, evaluaters, categoryTitle, categoryId, theme }) => {

    const calloutProps = { gapSpace: 0 };
    const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'flex' } };

    return (
        <div className={styles.categoryComponent}>
            <div className={styles.enclosure}>
                <div className={styles.title}>{categoryTitle}</div>
                <div className={members.length > 1 ? styles.moreMembers : ''}>
                    {
                        members.map((m, i) =>
                            <div className={styles.group}>
                                <TooltipHost content={theme[i]} calloutProps={calloutProps} styles={hostStyles}>
                                    <UserComponent member={m} category={categoryId} />
                                    <Icon iconName='Link12' className={styles.link} />
                                    <UserComponent member={evaluaters[i]} category={categoryId} />
                                </TooltipHost>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryAltComponent
