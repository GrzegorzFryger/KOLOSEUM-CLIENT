import {Component, OnDestroy, OnInit} from '@angular/core';
import { RxStompService} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import {Subscription} from 'rxjs';
import {Expierence} from '../models/expierence.model';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  public receivedMessages: Array<Expierence>;
  private topicSubscription: Subscription;


  constructor(private rxStompService: RxStompService) {

    this.receivedMessages = new Array<Expierence>();
  }

  ngOnInit() {
    this.topicSubscription = this.rxStompService.watch('/score/experience').subscribe((message: Message) => {
      this.receivedMessages.push(
      JSON.parse(message.body)
    );
      console.log(JSON.parse(message.body));
    });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  onSendMessage() {
  }
}
