import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import {Subscription} from 'rxjs';
import {UserRegisterService} from '../user-register/user-register.service';



@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  public topicSubscription: Subscription;
  messages: Array<string>;
  count: number;

  constructor(private rxStompService: RxStompService, private userService: UserRegisterService) { }

  ngOnInit() {

    this.messages = new Array<string>();
    this.topicSubscription = this.rxStompService.watch('/score/notification/' + this.userService.loginedUser.applicationUser.id)
      .subscribe((message: Message) => {
      this.messages.push(message.body);
      this.count = this.messages.length;
    });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }


}
