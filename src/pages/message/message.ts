import { Observable } from 'rxjs/Observable';
import { ServicesProvider } from './../../providers/services/services';
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

  toProfile: IProfile;
  fromProfile: IProfile;
  messageList: Observable<IMessage[]>;
  fromUserId: string;
  constructor(private services: ServicesProvider, public navCtrl: NavController, public navParams: NavParams) {
    //this.messageList = MESSAGE_LIST;
    console.log(' 333', this.messageList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  ionViewWillEnter() {
    this.toProfile = this.navParams.get('profile');
    this.services.getAuthenticatedProfile().subscribe(profile => {
      this.fromProfile = profile;
    });

    this.messageList = this.services.getMessages(this.toProfile.$key);

  }

  sendMessage(text: string) {
    try {
      const message: IMessage = {
        message: text,
        toUserId: this.toProfile.$key,
        fromUserId: this.fromProfile.$key,
        toProfile: { name: this.toProfile.name, email: this.toProfile.email },
        fromProfile: { name: this.fromProfile.name, email: this.fromProfile.email },
        date: new Date()
      }
      console.log('sendmessage:: ', message);
      this.services.addToMessagesNode(message)
        .then(success => console.log('success::', success))
        .catch(e => console.log('errror', e));

    } catch (error) {
      console.log('sendmessage:: error ::', error);

    }
  }

}
