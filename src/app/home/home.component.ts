import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {InsuranceApplicaion} from '../models/insurance-applicaion.model';
import {PremiumList} from '../models/premium-list.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userApplications: Array<InsuranceApplicaion>;
  isApplicationFromToday: boolean;
  today;
  days7;
  days30;
  showPolicyDetailsWindows = false;
  selectedApplication: InsuranceApplicaion;

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

  showPolicyDetails(applicatonNumber: number) {
    this.showPolicyDetailsWindows = !this.showPolicyDetailsWindows;
    this.userApplications.forEach(userApp => {
      if (userApp.number === applicatonNumber) {
        this.selectedApplication = userApp;
      }
    });
  }

  getPrice(premiumList: PremiumList): number {
    let total = 0;
    if (this.selectedApplication.installmentAmount === 1) {
      premiumList.one.forEach(s => total += s);

    }
    if (this.selectedApplication.installmentAmount === 2) {
      premiumList.two.forEach(s => total += s);
    }
    if (this.selectedApplication.installmentAmount === 4) {
      premiumList.four.forEach(s => total += s);
    }
    if (this.selectedApplication.installmentAmount === 12) {
      premiumList.twelve.forEach(s => total += s);
    }

    return total;
  }



}
