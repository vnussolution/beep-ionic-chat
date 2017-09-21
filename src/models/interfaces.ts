export interface IProfile {
    name: string;
    email: string;
    avatar: string;
    dob?: Date
}

export interface IMessage {
    user: IProfile;
    date: Date;
    message: string;
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