import { ServicesProvider } from './../../providers/services/services';
import { MESSAGE_LIST, USER_LIST } from './../../mocks/mocks';
import { IMessage, IProfile } from './../../models/interfaces';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

  userList: IProfile[] = USER_LIST;
  filter: string;

  constructor(private services: ServicesProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
  }

  filterUser() {
    this.services.searchUser(this.filter).subscribe(list => {
      this.userList = list;
      console.log(' filtering.. ', this.filter, this.userList);
    });

  }


}
