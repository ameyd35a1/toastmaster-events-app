import React, { FC } from 'react'
import UserComponent from '../UserComponent/UserComponent'
import styles from './CategoryComponent.module.scss'
import { IEventLikes, IEventMember } from '../../Interfaces/IEvent'
import { ITooltipHostStyles, TooltipHost } from 'office-ui-fabric-react'

interface ICategoryComponentProps {
    members: IEventMember[],
    categoryTitle: string,
    categoryId: string,
    theme?: string[]
}

const CategoryComponent: FC<ICategoryComponentProps> = ({ members, categoryTitle, categoryId, theme }) => {

    const calloutProps = { gapSpace: 0 };    

    return (
        <div className={styles.categoryComponent}>
            <div className={styles.enclosure}>
                <div className={styles.title}>{categoryTitle}</div>
                <div className={members.length > 1 ? styles.moreMembers : ''}>
                    {
                        members.map((m, i) =>
                            <TooltipHost content={theme ? theme[i] : null} calloutProps={calloutProps}>
                                <UserComponent member={m} category={categoryId} />
                            </TooltipHost>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryComponent
