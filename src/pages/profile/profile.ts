import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IProfile } from '../../models/interfaces';
import { ServicesProvider } from '../../providers/services/services';

import { User } from 'firebase/app';

import { Subscription } from 'rxjs/subscription'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit, OnDestroy {

  profile = {} as IProfile;
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  constructor(private services: ServicesProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    console.log(' init1 : ', this.profile);
    this.authenticatedUser$ = this.services.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
      console.log(' ProfilePage: ngOnInit: ', user);
      this.services.getProfile(user).subscribe(p => {
        this.profile = p.val();
        console.log(' init2 : ', this.profile, this.profile.name, this.profile.email);
      });
    })
  }

  ngOnDestroy() {
    this.authenticatedUser$.unsubscribe();
  }

  async save() {
    console.log('save');
    if (this.authenticatedUser)

      await this.services.updateUser(this.authenticatedUser, this.profile)
        .then((result) => {
          console.log(' save good', result);
        })
        .catch((error) => {
          console.log('error: ', error);
        })
  }

}
