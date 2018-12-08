import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {InsuranceApplicaion} from '../models/insurance-applicaion.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userApplications: Array<InsuranceApplicaion>;
  isApplicationFromToday: boolean;
  today: Date = new Date();
  days7: Date;
  days30: Date;

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.getUserApplication();
    this.getDates();
  }

  async getUserApplication() {
    await this.homeService.getUserApplication().then(resp => {
      this.userApplications = resp;
    });

    this.isApplicationFromToday = this.isAnyApplicationFromToday();
  }

  getDates() {
    this.homeService.getDates().then(resp => {
      this.today = resp.today;
      this.days7 = resp.days7;
      this.days30 = resp.days30;
    });
  }

  isAnyApplicationFromToday(): boolean {
    let isAny = false;
      this.userApplications.forEach(application => {
        if (application.registerDate.toString() === this.today.toString()) {
          isAny = true;
        }
      });
    return isAny;
  }



}
