import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { IProfile } from './../../models/interfaces';
import { FirebaseListObservable } from 'angularfire2/database';
import { ServicesProvider } from './../../providers/services/services';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Generated class for the OnlineUsersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'online-users',
  templateUrl: 'online-users.html'
})
export class OnlineUsersComponent implements OnInit {

  @Input() list: IProfile[];//: Observable<IProfile[]>;
  text: string;
  userId: string;
  onlineUsers: IProfile[];
  constructor(private navCtrl: NavController, private services: ServicesProvider) {
    console.log('Hello OnlineUsersComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    this.setUserOnline();
    this.getOnlineUsers();
  }

  setUserOnline() {
    this.services.getAuthenticatedProfile().subscribe(profile => {
      console.log('3333', profile);
      this.services.setUserOnline(profile);
    });
  }

  getOnlineUsers() {

    // this.list.subscribe(onlineUsers => this.onlineUsers = onlineUsers); 
    //this.services.getUsersOnline();

    if (!this.list) return;
    this.services.getAuthenticatedUser().subscribe(user => {

      this.userId = user.uid
      const newList = new Set(this.list.map(x => x));
      console.log('111111122', this.list, newList);
      this.onlineUsers = Array.from(newList).filter(item => item.$key !== this.userId);
    });
  }

  openChat(user: IProfile) {
    this.navCtrl.push('MessagePage', { profile: user });
  }

}


