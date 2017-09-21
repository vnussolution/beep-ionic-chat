import { ServicesProvider } from './../../providers/services/services';
import { FirebaseListObservable } from 'angularfire2/database';
import { IChannel, IChannelMessage } from './../../models/interfaces';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChannelChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {

  channel: IChannel;
  channelMessages: FirebaseListObservable<IChannelMessage[]>
  constructor(private services: ServicesProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChannelChatPage');
  }


  ionViewWillEnter() {
    this.channel = this.navParams.get('channel');
    console.log('6666', this.channel);
    this.channelMessages = this.services.getChannelMessagesRef(this.channel.$key);
  }

  sendMessage(text: string) {
    let channelMessage: IChannelMessage = { message: text };

    this.services.addChannelMessage(this.channel.$key, channelMessage);
  }
}
