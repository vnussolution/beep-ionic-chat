import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the SendMessageBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'send-message-box',
  templateUrl: 'send-message-box.html'
})
export class SendMessageBoxComponent {
  @Output() sendText: EventEmitter<string>;
  text: string;

  constructor() {
    console.log('Hello SendMessageBoxComponent Component');
    this.sendText = new EventEmitter<string>();
  }

  send() {
    this.sendText.emit(this.text);
    this.text = '';
  }


}
