import {Component, OnDestroy, OnInit} from '@angular/core';
import {LeaderboardService} from './leaderboard.service';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs/index';
import {ApplicationUser} from '../models/application-user.model';
import { Message } from '@stomp/stompjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  private topicSubscription: Subscription;
  applicationUsers: ApplicationUser[];

  constructor(private service: LeaderboardService, private rxStompService: RxStompService) { }

  ngOnInit() {

    if (this.applicationUsers === undefined) {
      this.service.getAllUsers().then( resp => {
        this.applicationUsers = resp;
        console.log(resp);
      });
    }

    this.topicSubscription = this.rxStompService.watch('/score/experience').subscribe((message: Message) => {
      this.applicationUsers = JSON.parse(message.body);
      console.log(this.applicationUsers);
    });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

}
