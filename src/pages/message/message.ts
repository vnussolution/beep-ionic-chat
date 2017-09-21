import { MESSAGE_LIST } from './../../mocks/mocks';
import { IProfile, IMessage } from './../../models/interfaces';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  profile: IProfile;
  messageList: IMessage[]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.messageList = MESSAGE_LIST;
    console.log(' 333', this.messageList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  ionViewWillEnter() {
    this.profile = this.navParams.get('profile');
    console.log('ionviewwillenter: ', this.profile);
  }

}
