import { ServicesProvider } from './../../providers/services/services';
import { MESSAGE_LIST, USER_LIST } from './../../mocks/mocks';
import { IMessage, IProfile } from './../../models/interfaces';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';

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
export class InboxPage implements OnInit {

  userList //: IProfile[] = USER_LIST;
  filter: string;
  loading: Loading;
  constructor(private loadingCtrl: LoadingController, private services: ServicesProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.loading = this.loadingCtrl.create({ content: 'loading...' });

  }

  ngOnInit() {
    this.loading.present();
    this.services.searchUser('').subscribe(list => {
      this.userList = list;
      this.loading.dismiss();
    });
    console.log('count 1');
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

  goToMessage(profile: IProfile) {
    this.navCtrl.push('MessagePage', { profile });
  }


}
