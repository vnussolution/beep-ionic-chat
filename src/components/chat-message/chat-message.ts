import { IMessage } from './../../models/interfaces';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the ChatMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-message',
  templateUrl: 'chat-message.html'
})
export class ChatMessageComponent {
  @Input() chatText: IMessage;
  @Input() chatIndex: number;
  text: string;


  constructor() {
    console.log('Hello ChatMessageComponent Component');
    this.text = 'Hello World';
  }

}
