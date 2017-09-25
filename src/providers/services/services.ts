import { Observable } from 'rxjs/Observable';
import { IChannel, IChannelMessage, IMessage } from './../../models/interfaces';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
//import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/forkJoin';

import { database } from 'firebase';


import { User } from 'firebase/app'
import { IProfile } from '../../models/interfaces';


@Injectable()
export class ServicesProvider {

  profileObject: FirebaseObjectObservable<IProfile>;
  profileList: FirebaseListObservable<IProfile>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    console.log('Hello SericesProvider Provider');
  }


  ////////////// Auth Services ///////////
  async createUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async signInUser(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async updateUser(user: User, profile: IProfile) {
    this.profileObject = this.db.object(`profiles/${user.uid}`);
    console.log('updateUser: ', profile);
    return await this.profileObject.set(profile);
  }

  getAuthenticatedUser() {
    return this.afAuth.authState.take(1);
  }

  getProfile(user: User) {
    this.profileObject = this.db.object(`profiles/${user.uid}`, { preserveSnapshot: true });
    return this.profileObject.take(1);
  }

  searchUser(name: string) {
    return this.db.list(`online-users`, {
      query: { orderByChild: 'name' }
    });

    // return query; //.take(1).map(list => list.filter(item => item.name.indexOf(name) !== -1));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getAuthenticatedProfile() {
    return this.getAuthenticatedUser()
      .map(user => user.uid)
      .mergeMap(authId => this.db.object(`profiles/${authId}`))
      .take(1);
  }

  ////////// Channel and Message Services //////////
  addChannel(name: string) {
    this.db.list(`channel-names`).push({ name });
  }

  async addChannelMessage(key: string, message: IChannelMessage) {
    await this.db.list(`channel-messages/${key}`).push(message);
  }

  getChannelNamesRef(): FirebaseListObservable<IChannel[]> {
    return this.db.list('channel-names');
  }

  getChannelMessagesRef(key: string): FirebaseListObservable<IChannelMessage[]> {
    return this.db.list('channel-messages/' + key);
  }

  setUserOnline(profile: IProfile) {
    const ref = database().ref(`online-users/${profile.$key}`);
    console.log('1111', profile);
    try {
      ref.update(profile);
      ref.onDisconnect().remove();
      console.log('222222');
    } catch (error) {
      console.log('userOnline: ', error);
    }
  }

  getUsersOnline(): FirebaseListObservable<IProfile[]> {
    return this.db.list('online-users');
  }

  async addToMessagesNode(message: IMessage) {
    return await this.db.list('messages').push(message);
  }

  getMessages(toUserId: string) {
    return this.getAuthenticatedUser()
      .map(user => user.uid)
      .mergeMap(uid => this.db.list(`user-messages/${uid}/${toUserId}`))
      .mergeMap(messages => {
        return Observable.forkJoin(
          messages.map(message => this.db.object(`messages/${message.$key}`).first()),
          (...returnedMessageObjects: IMessage[]) => {
            console.log('getMessages:: ', returnedMessageObjects);
            return returnedMessageObjects;
          }
        )
      })
  }

  getLastMessage(): Observable<IMessage[]> {
    return this.getAuthenticatedUser()
      .map(user => user.uid)
      .mergeMap(userId => this.db.list(`last-message/${userId}`))
      .mergeMap(messages => {
        return Observable.forkJoin(
          messages.map(message => {
            console.log('last-mesage:: ', message);

            return this.db.object(`messages/${message.key}`).first()
          }),
          (...values: IMessage[]) => {
            console.log('last-message : values: ', values);
            return values;
          }
        );
      });
  }
}


