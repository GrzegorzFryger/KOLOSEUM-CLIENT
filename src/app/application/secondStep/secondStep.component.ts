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
    this.applicationsService = this.applicationService;
  }

  application: InsuranceApplicaion = new InsuranceApplicaion();
  totalPrice = 0;
  instaltments = [{name: 'Jednorazowa', value: 1}, {name: 'Dwie raty', value: 2}, {name: 'Cztery raty', value: 4}, {
    name: 'Dwanaście rat',
    value: 12
  }];
  applicationsService;


  ngOnInit() {
    this.application.riskVariants.forEach(risk => {
      if (risk.name === 'OC') {risk.addedToCart = true; }
    });
    this.recalculateBaseOnInstaltment();
  }

  getApplicaiotn() {
    this.applicationService.getCalculationById(5).subscribe(resp => {
      this.application = resp;

      this.ngOnInit();
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

  addRiskToCart(riskName: string) {
    this.application.riskVariants.forEach(risk => {
      if (risk.name === riskName && risk.addedToCart !== true) {
        this.totalPrice = this.totalPrice + this.getPrice(risk.premiumList);
        risk.addedToCart = true;
      }
    });
  }

  removeFromCart(riskName: string) {
    this.application.riskVariants.forEach(risk => {
      if (risk.name === riskName && risk.addedToCart !== false) {
        this.totalPrice = this.totalPrice - this.getPrice(risk.premiumList);
        risk.addedToCart = false;
      }
    });
  }

  recalculateBaseOnInstaltment() {
    this.totalPrice = 0;
    this.application.riskVariants.forEach(risk => {
      if (risk.addedToCart) {
        this.totalPrice = this.totalPrice + this.getPrice(risk.premiumList);
      }
    });
  }

}
