import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: string;
  tab2Root: string;
  tab3Root: string;
  tabIndex: number = 0;
  @ViewChild('tabs') tabs: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1Root = 'InboxPage';
    this.tab2Root = 'ChannelsPage';
    this.tab3Root = 'ProfilePage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  ionViewWillEnter() {
    this.tabIndex = +this.navParams.get('tab') || 0;
    console.log(' ionViewWillEnter: ', this.tabIndex);
    this.tabs.select(this.tabIndex);
  }


}
