export interface IProfile {
    name: string;
    email: string;
    avatar: string;
    dob?: Date
    $key?: string;
}

export interface IMessage {
    date: Date;
    message: string;
    toUserId: string;
    toProfile: { name: string; email: string };
    fromUserId: string;
    fromProfile: { name: string; email: string };
}

export interface IAccount {
    email: string,
    password: string
}

export interface IEventResponse {
    result?: { email?: string, uid?: string };
    error?: { code?: string, message?: string };
}

export interface IChannel {
    name: string;
    $key?: string;
}

export interface IChannelMessage {
    message: string;
}