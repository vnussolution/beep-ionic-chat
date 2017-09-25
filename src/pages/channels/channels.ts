import { IChannel } from './../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { ServicesProvider } from './../../providers/services/services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ChannelsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html',
})
export class ChannelsPage {

  channels: Observable<IChannel[]>
  constructor(private services: ServicesProvider, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChannelsPage');
  }

  ionViewWillEnter() {
    this.getChannels();
  }
  addChannelDialog() {
    this.alertCtrl.create({
      title: 'Add Channel',
      inputs: [{
        name: 'channelName'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Add',
        handler: data => {
          this.services.addChannel(data.channelName);
        }
      }]
    }).present();
  }


  getChannels() {
    this.channels = this.services.getChannelNamesRef();
  }

  channelChatSection(channel: IChannel) {

    console.log('channelChatSection: ', channel);
    this.navCtrl.push('ChannelChatPage', { channel });
  }
}
