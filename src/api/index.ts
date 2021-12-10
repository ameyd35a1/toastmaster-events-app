import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http'
import { getTitleDate, paddingLeft } from '../utility';
import { IComment, IEvent, IEventDropdownOption, IEventLikes, IEventLikesData, IEventMember, IEventWinner } from '../webparts/toastmasterEvents/Interfaces/IEvent';


export const getEventsDates = async (client: SPHttpClient, url: string): Promise<IEventDropdownOption[]> => {

    let requestUrl = url.concat("/_api/web/lists/getByTitle('ToastmasterEvents')/items?$select=DateConductedOn,ID&$orderby=DateConductedOn desc");
    return await client.get(requestUrl, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
            if (response.ok) {
                return response.json().then((responseJSON) => {
                    if (responseJSON != null && responseJSON.value != null) {
                        return responseJSON.value.map(e => { return <IEventDropdownOption>{ eventDate: new Date(e.DateConductedOn), eventId: e.ID } })
                    }
                })
            }
            return null;
        })
}


export const getEventData = async (client: SPHttpClient, url: string, itemId: number): Promise<IEvent> => {

    let requestUrl = url.concat("/_api/web/lists/getByTitle('ToastmasterEvents')/items?$filter=ID eq " + itemId + "&$select=DateConductedOn,Comments,SAA/Title,SAA/Email,SAA/UserTypeCalc,SAA/ProfilePicUrl,TOD/Title,TOD/Email,TOD/UserTypeCalc,TOD/ProfilePicUrl,TTM/Title,TTM/Email,TTM/UserTypeCalc,TTM/ProfilePicUrl,GE/Title,GE/Email,GE/UserTypeCalc,GE/ProfilePicUrl,GMR/Title,GMR/Email,GMR/UserTypeCalc,GMR/ProfilePicUrl,AHC/Title,AHC/Email,AHC/UserTypeCalc,AHC/ProfilePicUrl,TMR/Title,TMR/Email,TMR/UserTypeCalc,TMR/ProfilePicUrl,PPS/Title,PPS/Email,PPS/UserTypeCalc,PPS/ProfilePicUrl,PPE/Title,PPE/Email,PPE/UserTypeCalc,PPE/ProfilePicUrl,TTS/Title,TTS/Email,TTS/UserTypeCalc,TTS/ProfilePicUrl&$expand=SAA,TOD,TTM,GE,GMR,AHC,TMR,PPS,PPE,TTS");
    return await client.get(requestUrl, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
            if (response.ok) {
                return response.json().then((responseJSON) => {
                    if (responseJSON != null && responseJSON.value != null) {
                        let item = responseJSON.value[0];
                        let event: IEvent = {
                            dateCreatedOn: item.DateConductedOn,
                            comments: item.Comments,
                            id: itemId,
                            SAA: {
                                name: item.SAA.Title,
                                email: item.SAA.Email,
                                userType: item.SAA.UserTypeCalc,
                                profilePic: item.SAA.ProfilePicUrl
                            },
                            TOD: {
                                name: item.TOD.Title,
                                email: item.TOD.Email,
                                userType: item.TOD.UserTypeCalc,
                                profilePic: item.TOD.ProfilePicUrl
                            },
                            TTM: {
                                name: item.TTM.Title,
                                email: item.TTM.Email,
                                userType: item.TTM.UserTypeCalc,
                                profilePic: item.TTM.ProfilePicUrl
                            },
                            GE: {
                                name: item.GE.Title,
                                email: item.GE.Email,
                                userType: item.GE.UserTypeCalc,
                                profilePic: item.GE.ProfilePicUrl
                            },
                            GMR: {
                                name: item.GMR.Title,
                                email: item.GMR.Email,
                                userType: item.GMR.UserTypeCalc,
                                profilePic: item.GMR.ProfilePicUrl
                            },
                            AHC: {
                                name: item.AHC.Title,
                                email: item.AHC.Email,
                                userType: item.AHC.UserTypeCalc,
                                profilePic: item.AHC.ProfilePicUrl
                            },
                            TMR: {
                                name: item.TMR.Title,
                                email: item.TMR.Email,
                                userType: item.TMR.UserTypeCalc,
                                profilePic: item.TMR.ProfilePicUrl
                            },
                            PPS: item.PPS.map(e => { return <IEventMember>{ name: e.Title, email: e.Email, userType: e.UserTypeCalc, profilePic: e.ProfilePicUrl } }),
                            PPE: item.PPE.map(e => { return <IEventMember>{ name: e.Title, email: e.Email, userType: e.UserTypeCalc, profilePic: e.ProfilePicUrl } }),
                            TTS: item.TTS.map(e => { return <IEventMember>{ name: e.Title, email: e.Email, userType: e.UserTypeCalc, profilePic: e.ProfilePicUrl } })
                        }
                        console.log(responseJSON.value[0])
                        return event;

                    }
                    return null;
                });
            }
        });
}


export const getCategoryTitles = async (client: SPHttpClient, url: string): Promise<Map<string, string>> => {
    let requestUrl = url.concat("/_api/web/lists/getByTitle('ToastmasterEventCategories')/items?$select=Title,Category");
    return await client.get(requestUrl, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
            if (response.ok) {
                return response.json().then((responseJSON) => {
                    if (responseJSON != null && responseJSON.value != null) {
                        let category = new Map<string, string>();
                        responseJSON.value.forEach(e => category.set(e.Title, e.Category));
                        return category;
                    }
                })
            }
            return null;
        })
}

export const getEventWinner = async (client: SPHttpClient, url: string, eventDate: Date): Promise<IEventWinner[]> => {
    let requestUrl = url.concat("/_api/web/lists/getByTitle('ToastmasterWinner')/items?$filter=EventDate eq '" + (eventDate.getFullYear() + "-" + (eventDate.getMonth() + 1) + "-" + eventDate.getDate()) + "'&$select=Member/Email,Category/Title&$expand=Member,Category");
    return await client.get(requestUrl, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
            if (response.ok) {
                return response.json().then((responseJSON) => {
                    if (responseJSON != null && responseJSON.value != null) {
                        const winners: IEventWinner[] = responseJSON.value.map(e => { return <IEventWinner>{ member: e.Member.Email, category: e.Category.Title, eventDate: eventDate } });
                        return winners;
                    }
                })
            }
            return null;
        })
}


export const getEventLikes = async (client: SPHttpClient, url: string, eventDate: Date): Promise<IEventLikesData> => {
    let requestUrl = url.concat("/_api/web/lists/getByTitle('ToastmasterLikes')/items?$filter=Title eq 'Event_" + getTitleDate(eventDate) + "'&$select=Title,Category,Member,LoggedInUser,Id");
    return await client.get(requestUrl, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
            if (response.ok) {
                return response.json().then((responseJSON) => {
                    if (responseJSON != null && responseJSON.value != null) {
                        const likes: IEventLikes[] = responseJSON.value.map(e => { return <IEventLikes>{ member: e.Member, category: e.Category, loggedInUser: e.LoggedInUser.split(';'), likeId: e.Id } });
                        const likesData: IEventLikesData = { likes: likes, eventDate: eventDate, updates: [] }
                        return likesData;
                    }
                })
            }
            return null;
        })
}

export const postLikes = async (client: SPHttpClient, url: string, action: string, itemId: number, data: IEventLikes, eventDate: Date): Promise<string> => {
    let requestUrl = '';
    let optionHeaders: HeadersInit = null;
    const body: string = JSON.stringify({
        'Title': 'Event_' + getTitleDate(eventDate),
        'Category': data.category,
        'Member': data.member,
        'LoggedInUser': data.loggedInUser.join(';')
    });
    optionHeaders = {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=nometadata',
        'odata-version': ''
    }

    if (itemId === -1) {
        requestUrl = url.concat("/_api/web/lists/getByTitle('ToastmasterLikes')/items");
    } else {
        requestUrl = url.concat("/_api/web/lists/getByTitle('ToastmasterLikes')/items(" + itemId + ")");

        optionHeaders['IF-MATCH'] = '*'
        if (action === 'update') {
            optionHeaders['X-HTTP-Method'] = 'MERGE'
        } else if (action === 'delete') {
            optionHeaders['X-HTTP-Method'] = 'DELETE'
        }
    }


    return await client.post(requestUrl, SPHttpClient.configurations.v1, {
        headers: optionHeaders,
        body: body
    })
        .then((response: SPHttpClientResponse) => {
            if (response.ok) {
                return response.json().then((responseJSON) => {
                    if (responseJSON != null) {
                        if (action === 'update') {
                            return responseJSON.Id
                        } else {
                            return ''
                        }
                    }
                })
            }
        })
}

export const postComments = async (client: SPHttpClient, url: string, itemId: number, comment: IComment[]): Promise<string> => {
    const body: string = JSON.stringify({
        'Comments': JSON.stringify(comment)
    });

    let optionHeaders: HeadersInit = {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=nometadata',
        'odata-version': '',
        'IF-MATCH': '*',
        'X-HTTP-Method': 'MERGE'
    }

    const requestUrl = url.concat("/_api/web/lists/getByTitle('ToastmasterEvents')/items(" + itemId + ")");

    return await client.post(requestUrl, SPHttpClient.configurations.v1, {
        headers: optionHeaders,
        body: body
    })
        .then((response: SPHttpClientResponse) => {
            if (response.ok) {
                return response.json().then((responseJSON) => {
                    if (responseJSON != null) {
                        return responseJSON.Id
                    }
                })
            }
        })

}