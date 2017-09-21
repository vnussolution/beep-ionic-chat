import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form';
import { RegisterFormComponent } from './register-form/register-form';
import { ChatMessageComponent } from './chat-message/chat-message';
import { SendMessageBoxComponent } from './send-message-box/send-message-box';
@NgModule({
	declarations: [LoginFormComponent,
    RegisterFormComponent,
    ChatMessageComponent,
    SendMessageBoxComponent],
	imports: [IonicModule],
	exports: [LoginFormComponent,
    RegisterFormComponent,
    ChatMessageComponent,
    SendMessageBoxComponent]
})
export class ComponentsModule { }
