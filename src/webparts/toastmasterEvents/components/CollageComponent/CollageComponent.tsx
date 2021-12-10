import { FontWeights, getTheme, IStackProps, mergeStyleSets, Modal } from 'office-ui-fabric-react'
import React, { FC, useEffect, useState } from 'react'
import { IEvent } from '../../Interfaces/IEvent'
import { IButtonStyles, IconButton, IIconProps } from '@fluentui/react'
import {ReactPhotoCollage} from 'react-photo-collage'
import config from '../../../../config'

interface ICollageComponentProps {
    content: IEvent,
    handler: any
}
const CollageComponent: FC<ICollageComponentProps> = ({ content, handler }) => {
    //const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const [isPopup, setisPopup] = useState(true);
    const [setting, setSetting] = useState(null);
    const defaultProfilePicUrl = config.defaultProfilePicUrl;
    //const titleId = useId('title');

    useEffect(() => {
        let profilePics: Set<string> = new Set();
        profilePics.add(content.SAA.profilePic ? content.SAA.profilePic : defaultProfilePicUrl );
        profilePics.add(content.TOD.profilePic ? content.TOD.profilePic : defaultProfilePicUrl );
        profilePics.add(content.TTM.profilePic ? content.TTM.profilePic : defaultProfilePicUrl );
        profilePics.add(content.GE.profilePic ? content.GE.profilePic : defaultProfilePicUrl );
        profilePics.add(content.GMR.profilePic ? content.GMR.profilePic : defaultProfilePicUrl );
        profilePics.add(content.AHC.profilePic ? content.AHC.profilePic : defaultProfilePicUrl );
        profilePics.add(content.TMR.profilePic ? content.TMR.profilePic : defaultProfilePicUrl );
        content.PPE.forEach(e => profilePics.add(e.profilePic ? e.profilePic : defaultProfilePicUrl ));
        content.PPS.forEach(e => profilePics.add(e.profilePic ? e.profilePic : defaultProfilePicUrl ));
        content.TTS.forEach(e => profilePics.add(e.profilePic ? e.profilePic : defaultProfilePicUrl ));

        const profilePicsArr = Array.from(profilePics.values());

        const _setting = {
            width: "1200px",
            height: ["200px", "200px"],
            layout: [Math.ceil(profilePicsArr.length / 2), Math.ceil(profilePicsArr.length / 2)],
            photos: profilePicsArr.map(e => { return { 'source': e } }),
            showNumOfRemainingPhotos: true
        }
        setSetting(_setting);

    }, [content]);

    const exitHandler = () => {
        //hideModal();
        setisPopup(current => !current);
        handler();
    }

    const cancelIcon: IIconProps = { iconName: 'Cancel' };

    const theme = getTheme();
    const contentStyles = mergeStyleSets({
        container: {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'stretch',
        },
        header: [
            // eslint-disable-next-line deprecation/deprecation
            theme.fonts.xLarge,
            {
                flex: '1 1 auto',
                borderTop: '4px solid ${theme.palette.themePrimary}',
                color: theme.palette.neutralPrimary,
                display: 'flex',
                alignItems: 'center',
                fontWeight: FontWeights.semibold,
                padding: '12px 12px 14px 24px',
            },
        ],
        body: {
            flex: '4 4 auto',
            padding: '0 24px 24px 24px',
            overflowY: 'hidden',
            selectors: {
                p: { margin: '14px 0' },
                'p:first-child': { marginTop: 0 },
                'p:last-child': { marginBottom: 0 },
            },
        },
    });
    const stackProps: Partial<IStackProps> = {
        horizontal: true,
        tokens: { childrenGap: 40 },
        styles: { root: { marginBottom: 20 } },
    };
    const iconButtonStyles: Partial<IButtonStyles> = {
        root: {
            color: theme.palette.neutralPrimary,
            marginLeft: 'auto',
            marginTop: '4px',
            marginRight: '2px',
        },
        rootHovered: {
            color: theme.palette.neutralDark,
        },
    };

    return (
        <div>
            <Modal
                isOpen={isPopup}
                onDismiss={exitHandler}
                isBlocking={true}
                containerClassName={contentStyles.container}
            >
                <div className={contentStyles.header}>
                    <span>Toastmaster Event held on <strong><i>{new Date(content.dateCreatedOn.toString()).toDateString()}</i></strong></span>
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={exitHandler}
                    />
                </div>
                <div className={contentStyles.body}>
                    <p>                        
                        {setting && <ReactPhotoCollage {...setting} />}
                    </p>
                </div>
            </Modal>
        </div>
    )
}

export default CollageComponent
