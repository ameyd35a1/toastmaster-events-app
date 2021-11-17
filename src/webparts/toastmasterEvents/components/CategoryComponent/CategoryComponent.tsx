import React, { FC } from 'react'
import UserComponent from '../UserComponent/UserComponent'
import styles from './CategoryComponent.module.scss'
import { IEventLikes, IEventMember } from '../../Interfaces/IEvent'

interface ICategoryComponentProps {
    members: IEventMember[],
    categoryTitle: string,
    categoryId: string  
}

const CategoryComponent: FC<ICategoryComponentProps> = ({ members, categoryTitle, categoryId }) => {
    return (
        <div className={styles.categoryComponent}>
            <div className={styles.enclosure}>
                <div className={styles.title}>{categoryTitle}</div>
                <div className={members.length > 1 ? styles.moreMembers : ''}>
                    {
                        members.map(m =>
                            <UserComponent member={m} category={categoryId} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryComponent
