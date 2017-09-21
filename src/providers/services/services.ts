import { IChannel, IChannelMessage } from './../../models/interfaces';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
//import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { User } from 'firebase/app'
import { IProfile } from '../../models/interfaces';


@Injectable()
export class ServicesProvider {

  profileObject: FirebaseObjectObservable<IProfile>;
  profileList: FirebaseListObservable<IProfile>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    console.log('Hello SericesProvider Provider');
  }

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

    const query = this.db.list(`/profiles`, {
      query: { orderByChild: 'name' }
    });

    return query.take(1).map(list => list.filter(item => item.name.indexOf(name) !== -1));

  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getAuthenticatedProfile() {
    return this.getAuthenticatedUser()
      .map(user => user.uid)
      .mergeMap(authId => this.db.object(`profiles/${authId}`, { preserveSnapshot: true }))
      .take(1);
  }

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
}


