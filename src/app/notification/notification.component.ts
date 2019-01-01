import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  public topicSubscription: Subscription;
  messages: Array<string>;
  count: number;

  constructor(private rxStompService: RxStompService) { }

  ngOnInit() {

    this.messages = new Array<string>();
    this.topicSubscription = this.rxStompService.watch('/score/1').subscribe((message: Message) => {
      this.messages.push(message.body);
      this.count = this.messages.length;
    });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }


}
