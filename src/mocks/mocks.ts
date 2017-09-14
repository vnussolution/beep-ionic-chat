import { IUser, IMessage } from './../models/interfaces';

const userList: IUser[] = [
    { name: 'frankie', email: 'frank@frank.com', avatar: 'http://lorempixel.com/400/200/people/1' },
    { name: 'truc', email: 'frank1@frank.com', avatar: 'http://lorempixel.com/400/200/people/2' },
    { name: 'bi', email: 'frank2@frank.com', avatar: 'http://lorempixel.com/400/200/people/3' },
    { name: 'mina', email: 'frank3@frank.com', avatar: 'http://lorempixel.com/400/200/people/4' },
    { name: 'grace', email: 'frank4@frank.com', avatar: 'http://lorempixel.com/400/200/people/5' }
];

const messageList: IMessage[] = [];

userList.forEach(user => {
    messageList.push({ user: user, date: new Date(), message: ' message from user ' + user.name })
})

export const MESSAGE_LIST = messageList;
export const USER_LIST = userList;
