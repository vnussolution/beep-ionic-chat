import { IAccount } from './../../models/interfaces';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';

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
export class LoginFormComponent {

  text: string;
  account = {} as IAccount;

  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController, private navCtrl: NavController) {
    console.log('Hello LoginFormComponent Component');
    this.text = 'Hello World';
  }


  async login() {

    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.account.email, this.account.password);
      this.toastCtrl.create({
        message: ' login successful',
        duration: 2000
      }).present();
      console.log(result);

    } catch (error) {
      console.error(error);
      this.toastCtrl.create({
        message: ' Error!' + error,
        duration: 2000
      }).present();
    }
  }

  gotoPage(page: string) {
    this.navCtrl.push(page);
  }


}
