export interface IEvent {
    dateCreatedOn: Date,
    SAA: IEventMember,
    TOD: IEventMember,
    TTM: IEventMember,
    GE: IEventMember,
    GMR: IEventMember,
    AHC: IEventMember,
    TMR: IEventMember,
    PPS: IEventMember[],
    PPE: IEventMember[],
    TTS: IEventMember[]
}

export interface IEventMember {
    name: string,
    email: string,
    userType: string,
    profilePic: string,
    winner?: boolean
}

export interface IEventDropdownOption {
    eventDate: Date,
    eventId: number
}

export interface IEventLikes {
    likeId?: number,
    category: string,
    member: string,
    loggedInUser: string[]    
}

export interface IEventLikesData {
    likes: IEventLikes[],
    eventDate: Date,
    updates?: number[],
}

export interface IEventWinner {
    eventDate: Date,
    category: string,
    member: string
}