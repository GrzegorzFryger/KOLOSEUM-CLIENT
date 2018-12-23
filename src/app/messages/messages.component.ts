import {Component, OnDestroy, OnInit} from '@angular/core';
import { RxStompService} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  public receivedMessages: Array<String>;
  private topicSubscription: Subscription;


  constructor(private rxStompService: RxStompService) {

    this.receivedMessages = new Array<String>();
  }

  ngOnInit() {
    this.topicSubscription = this.rxStompService.watch('/score/experience').subscribe((message: Message) => {
      this.receivedMessages.push(message.body);
      console.log(message.body);
    });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  onSendMessage() {
  }
}
