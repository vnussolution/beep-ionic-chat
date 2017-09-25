import { LastMessageListComponent } from './last-message-list/last-message-list';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form';
import { RegisterFormComponent } from './register-form/register-form';
import { ChatMessageComponent } from './chat-message/chat-message';
import { SendMessageBoxComponent } from './send-message-box/send-message-box';
import { OnlineUsersComponent } from './online-users/online-users';
@NgModule({
    declarations: [LoginFormComponent,
        RegisterFormComponent,
        ChatMessageComponent,
        SendMessageBoxComponent,
        LastMessageListComponent,
        OnlineUsersComponent],
    imports: [IonicModule],
    exports: [LoginFormComponent,
        RegisterFormComponent,
        ChatMessageComponent,
        SendMessageBoxComponent,
        LastMessageListComponent,
        OnlineUsersComponent]
})
export class ComponentsModule { }
