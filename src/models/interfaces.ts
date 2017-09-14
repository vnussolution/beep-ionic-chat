export interface IUser {
    name: string;
    email: string;
    avatar: string;
}

export interface IMessage {
    user: IUser;
    date: Date;
    message: string;
}

export interface IAccount {
    email: string,
    password: string
}