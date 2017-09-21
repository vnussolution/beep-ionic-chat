import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
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
  loading: Loading;

  constructor(private loadingCtrl: LoadingController, private services: ServicesProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.loading = this.loadingCtrl.create({
      content: 'Loading profile..'
    });
  }

  ngOnInit() {
    this.loading.present();
    console.log(' init1234 : ', this.profile);

    this.services.getAuthenticatedProfile().subscribe(profile => {
      this.profile = profile.val();
      this.loading.dismiss();
    })

    // this.authenticatedUser$ = this.services.getAuthenticatedUser().subscribe((user: User) => {
    //   this.authenticatedUser = user;
    //   console.log(' ProfilePage: ngOnInit: ', user);
    //   this.services.getProfile(user).subscribe(p => {
    //     this.profile = p.val();
    //     console.log(' p : ', p);
    //     console.log(' init2 : ', this.profile, this.profile.name, this.profile.email);
    //     this.loading.dismiss();
    //   });
    // })
  }

  ngOnDestroy() {
    // this.authenticatedUser$.unsubscribe();
  }

  save() {
    console.log('save', this.profile);

    if (this.profile.email)
      this.services.getAuthenticatedUser().subscribe((user: User) => {
        this.services.updateUser(user, this.profile)
          .then((result) => {
            console.log(' save good', result);
          })
          .catch((error) => {
            console.log('error: ', error);
          })
      });

  }

  logout() {
    this.services.logout();
    this.navCtrl.setRoot('LoginPage');
  }

}
