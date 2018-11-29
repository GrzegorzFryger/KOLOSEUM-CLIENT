import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {InsuranceApplicaion} from '../../models/insurance-applicaion.model';
import {ApplicationService} from '../application.service';
import {PremiumList} from '../../models/premium-list.model';

@Component({
  selector: 'app-second',
  templateUrl: './secondStep.component.html',
  styleUrls: ['./secondStep.component.css']
})
export class SecondStepComponent implements OnInit {

  constructor(private applicationService: ApplicationService) {
  }

  application: InsuranceApplicaion = new InsuranceApplicaion();
  totalPrice = 0;

  ngOnInit() {
  }

  getApplicaiotn() {
    this.applicationService.getCalculationById(5).subscribe(resp => {
      this.application = resp;
    });
  }

  getPrice(premiumList: PremiumList): number {
    let total = 0;
    if (this.application.installmentAmount === 1) {
      premiumList.one.forEach(s => total += s);
    }
    if (this.application.installmentAmount === 2) {
      premiumList.two.forEach(s => total += s);
    }
    if (this.application.installmentAmount === 4) {
      premiumList.four.forEach(s => total += s);
    }
    if (this.application.installmentAmount === 12) {
      premiumList.twelve.forEach(s => total += s);
    }

    return total;
  }

  setInstallmentAmount(amount: number) {
    this.application.installmentAmount = amount;
  }


}
