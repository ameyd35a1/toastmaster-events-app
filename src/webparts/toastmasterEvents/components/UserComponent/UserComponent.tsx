import React, { FC, useContext, useEffect, useState } from 'react'
import styles from './UserComponent.module.scss'
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IEventMember } from '../../Interfaces/IEvent';
import { DataContext } from '../../../../common/DataContext';
import { useWebPartContext } from '../../../../hooks/useWebpartContext';

interface IUserComponentProps {
    member: IEventMember,
    category: string
}

const UserComponent: FC<IUserComponentProps> = ({ member, category }) => {

    const [like, setLike] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { likes } = useContext(DataContext);

    const ctx = useWebPartContext(context => ({
        email: context.pageContext.user.email
    }));

    const updateLike = () => {
        //setLike('LikeSolid');
    }

    useEffect(() => {
        if (likes && likes.length > 0) {
            const currentUserLikeDetails = likes.filter(e => e.member.toLowerCase() === member.email.toLowerCase() && e.category === category)
            if (currentUserLikeDetails && currentUserLikeDetails.length > 0) {
                if (currentUserLikeDetails[0].loggedInUser.indexOf(ctx.email) > -1) {
                    setIsLiked(true);
                }
                setLike(currentUserLikeDetails[0].loggedInUser.length);
            }
        }
    }, [likes])

    return (
        <div className={styles.userComponent}>
            {member.winner &&
                <div className={styles.winner}><Icon iconName="CrownSolid" className={styles.crown} /></div>
            }
            <div className={styles.profile}>
                {/* //Image */}
                <div className={`${styles.profilePic} ${member.winner ? styles.profileBorderWinner : like > 3 ? styles.profileBorderLikes : ''}`}>
                    <img className={styles.profilePicImg} src={member.profilePic} />
                </div>
                <div className={styles.profileName}>
                    {member.name}
                </div>
            </div>

            <div className={styles.action}>
                {/* //Actions */}
                <Icon iconName={isLiked ? "LikeSolid" : "Like"} onClick={updateLike} className={styles.likeIcon} />
                <div className={styles.likesCount}>{like}</div>
            </div>
        </div>

    )
}

export default UserComponent
