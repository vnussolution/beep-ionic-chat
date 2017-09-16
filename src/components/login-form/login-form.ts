import { IAccount, IEventResponse, IProfile } from './../../models/interfaces';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the LoginFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent implements OnInit {

  text: string;
  account = {} as IAccount;
  showEmailError: boolean = false;
  @ViewChild('email') email123;
  @ViewChild('password') pass;
  @Output() eventEmitter: EventEmitter<IEventResponse>;

  constructor(private services: ServicesProvider, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private navCtrl: NavController) {
    console.log('Hello LoginFormComponent Component');
    this.text = 'Hello World';
    this.eventEmitter = new EventEmitter<IEventResponse>();
  }

  ngOnInit() {
    console.log('oninit ; ');
    this.account.email = 'frank@frank.com';
    this.account.password = 'frankie';
  }

  ionViewWillEnter() {
    console.log('ionviewwillenter ; ');
    this.account.email = 'frank@frank.com';
    this.account.password = 'frankie';
  }

  async login() {
    let loading = this.loadingCtrl.create({
      content: 'Logging in...'
    });
    loading.present();
    await this.services.signInUser(this.account.email, this.account.password)
      .then((result) => {
        loading.dismiss();
        this.eventEmitter.emit(result);

        let profile: IProfile = { name: '', email: result.email, avatar: '' };
        this.services.updateUser(result, profile)
          .then((result) => {
            console.log(' update inside login form', result);
          })
          .catch((error) => {
            console.log('error22: ', error);
          })
      })
      .catch((e) => {
        loading.dismiss();
        this.toastCtrl.create({
          message: e,
          duration: 2000
        }).present();
      });
  }


  gotoPage(page: string) {
    this.navCtrl.push(page);
  }
  blur() {
    console.log('bluring...', this.email123);
    if (this.email123.invalid && this.email123.dirty) {
      this.showEmailError = true;
    } else
      this.showEmailError = false;
  }

  focus() {
    console.log('focusing...');
  }
  change() {
    console.log('changing...');
  }

}
