import React, { FC, useContext, useEffect, useState } from 'react'
import styles from './UserComponent.module.scss'
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IEventMember } from '../../Interfaces/IEvent';
import { DataContext } from '../../../../common/DataContext';
import { useWebPartContext } from '../../../../hooks/useWebpartContext';
import { postLikes } from '../../../../api';
import config from '../../../../config';
import { Popup } from 'semantic-ui-react';
import { ITooltipHostStyles, TooltipHost } from 'office-ui-fabric-react';

interface IUserComponentProps {
    member: IEventMember,
    category: string
}

const UserComponent: FC<IUserComponentProps> = ({ member, category }) => {

    const defaultProfilePicUrl = config.DEFAULT_PROFILEPIC_URL;
    const [likeNames, setLikeNames] = useState<string[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { likes, setLikes } = useContext(DataContext);

    const internalProfilePicUrl = config.INTERNAL_PROFILEPIC_URL;

    // const tooltipId = useId('tooltip');

    const ctx = useWebPartContext(context => ({
        client: context.spHttpClient,
        webUrl: context.pageContext.web.absoluteUrl,
        email: context.pageContext.user.email
    }));

    const calloutProps = { gapSpace: 0 };

    const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };

    const updateLike = async () => {
        //setLike('LikeSolid');
        if (!isLiked) {
            if (likes.likes && likes.likes.length > 0) {
                const currentUserLikeDetails = likes.likes.filter(e => e.member.toLowerCase() === member.email.toLowerCase() && e.category === category)
                if (currentUserLikeDetails && currentUserLikeDetails.length > 0) {
                    currentUserLikeDetails[0].loggedInUser.push(ctx.email);
                    likes.updates.push(currentUserLikeDetails[0].likeId);
                    postLikes(ctx.client, ctx.webUrl, 'update', currentUserLikeDetails[0].likeId, currentUserLikeDetails[0], likes.eventDate);
                } else {
                    const likeId = await postLikes(ctx.client, ctx.webUrl, 'update', -1, { member: member.email, category: category, loggedInUser: [ctx.email], likeId: -1 }, likes.eventDate);
                    likes.likes.push({ member: member.email, category: category, loggedInUser: [ctx.email], likeId: likeId });
                    likes.updates.push(likeId)
                }
            }
        } else {
            const currentUserLikeDetails = likes.likes.filter(e => e.member.toLowerCase() === member.email.toLowerCase() && e.category === category)
            if (currentUserLikeDetails && currentUserLikeDetails.length === 1 && currentUserLikeDetails[0].loggedInUser.length === 1) {
                //currentUserLikeDetails[0].loggedInUser = currentUserLikeDetails[0].loggedInUser.filter(e => e != ctx.email);
                postLikes(ctx.client, ctx.webUrl, 'delete', currentUserLikeDetails[0].likeId, currentUserLikeDetails[0], likes.eventDate);
                likes.updates.push(currentUserLikeDetails[0].likeId);
            } else {
                currentUserLikeDetails[0].loggedInUser = currentUserLikeDetails[0].loggedInUser.filter(e => e != ctx.email);
                postLikes(ctx.client, ctx.webUrl, 'update', currentUserLikeDetails[0].likeId, currentUserLikeDetails[0], likes.eventDate);
                likes.updates.push(currentUserLikeDetails[0].likeId);
            }
        }
        //console.log(likes);
        setLikes({ likes: likes.likes, updates: likes.updates, eventDate: likes.eventDate });
    }

    useEffect(() => {
        if (likes.likes && likes.likes.length > 0) {
            const currentUserLikeDetails = likes.likes.filter(e => e.member.toLowerCase() === member.email.toLowerCase() && e.category === category)
            if (currentUserLikeDetails && currentUserLikeDetails.length > 0) {
                if (currentUserLikeDetails[0].loggedInUser.indexOf(ctx.email) > -1) {
                    setIsLiked(true);
                } else {
                    setIsLiked(false);
                }
                setLikeNames(currentUserLikeDetails[0].loggedInUser);
            }
        }
    }, [likes, likes.updates])

    return (
        <div className={styles.userComponent}>
            {member.winner &&
                <div className={styles.winner}><Icon iconName="CrownSolid" className={styles.crown} /></div>
            }
            <div className={styles.profile}>
                {/* //Image */}
                <div className={`${styles.profilePic} ${member.winner ? styles.profileBorderWinner : likeNames.length > config.SUPER_LIKE_COUNT ? styles.profileBorderLikes : ''}`}>
                    <img className={styles.profilePicImg} src={member.profilePic && member.profilePic.toLowerCase() !=='na' ? member.profilePic : (member.userType === 'Internal' ? internalProfilePicUrl + member.email : defaultProfilePicUrl)} />
                </div>
                <div className={styles.profileName}>
                    {member.name}
                </div>
            </div>

            <div className={styles.action}>
                {/* //Actions */}
                <TooltipHost content={likeNames.join("\n")} calloutProps={calloutProps} styles={hostStyles}>
                    <Icon iconName={isLiked ? "LikeSolid" : "Like"} onClick={updateLike} className={styles.likeIcon} />
                    {likeNames.length > 0 && <div className={styles.likesCount}>{likeNames.length}</div>}
                    {/* {likeNames.length > 0 &&
                    <Popup content={likeNames.join("\n")} header={"Likes"} trigger={
                        <a href='#'><div className={styles.likesCount}>{likeNames.length}</div></a>
                    } />
                } */}
                </TooltipHost>
            </div>
        </div>

    )
}

export default UserComponent
