import { NavController } from 'ionic-angular';
import { IMessage, IProfile } from './../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { ServicesProvider } from './../../providers/services/services';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'last-message-list',
    templateUrl: 'last-message-list.html'
})
export class LastMessageListComponent implements OnInit {

    list$: Observable<IMessage[]>
    constructor(private navCtrl: NavController, private services: ServicesProvider) {
    }

    ngOnInit() {
        this.list$ = this.services.getLastMessage();
    }

    openChat(message: IMessage) {
        let profile;
        this.services.getAuthenticatedUser().subscribe(user => {
            if (user.uid === message.fromUserId) {
                profile = { name: message.toProfile.name, email: message.toProfile.email, $key: message.toUserId };
            } else {
                profile = { name: message.fromProfile.name, email: message.fromProfile.email, $key: message.fromUserId };
            }

            this.navCtrl.push('MessagePage', { profile })
        });
    }

}