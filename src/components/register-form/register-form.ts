import { IAccount, IEventResponse } from './../../models/interfaces';
import { AngularFireAuth, } from 'angularfire2/auth';
import { Component, EventEmitter, Output } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

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

  @Output() registerEvent: EventEmitter<IEventResponse>;
  text: string;
  account = {} as IAccount;

  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController, private services: ServicesProvider) {
    console.log('Hello RegisterFormComponent Component');
    this.text = 'Hello World';
    this.registerEvent = new EventEmitter<IEventResponse>();

  }

  async register() {
    let loading = this.loadingCtrl.create({ content: 'Registering...' });

    loading.present();

    this.services.createUser(this.account.email, this.account.password)
      .then((result) => {
        loading.dismiss();
        this.registerEvent.emit(result)
      })
      .catch((e) => {
        loading.dismiss();
        this.toastCtrl.create({
          message: e,
          duration: 2000
        }).present();
      });
  }
}
