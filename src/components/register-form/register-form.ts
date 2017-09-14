import { IAccount } from './../../models/interfaces';
import { AngularFireAuth, } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the RegisterFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {

  text: string;
  account = {} as IAccount;

  constructor(private toastCtrl: ToastController, private afAuth: AngularFireAuth) {
    console.log('Hello RegisterFormComponent Component');
    this.text = 'Hello World';


  }

  async register() {

    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.account.email, this.account.password);
      this.toastCtrl.create({
        message: ' registered successful',
        duration: 2000
      }).present();
      console.log(result);

    } catch (error) {
      console.error(error);
      this.toastCtrl.create({
        message: ' Error!!' + error,
        duration: 2000
      }).present();
    }
  }

}
