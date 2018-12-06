import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../application.service';
import {InsuranceApplicaion} from '../../models/insurance-applicaion.model';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-third-step',
  templateUrl: './thirdStep.component.html',
  styleUrls: ['./thirdStep.component.css']
})
export class ThirdStepComponent implements OnInit {

  application: InsuranceApplicaion = new InsuranceApplicaion();

  constructor(private applicationService: ApplicationService, private router: Router) {
  }

  ngOnInit() {
    this.application = this.applicationService.application;
    console.log(this.application);
  }

  pokazsie() {
    console.log(this.application);
  }

  dajKalkulacje() {
    this.applicationService.getCalculationById(30).toPromise().then(resp => {
      this.application = resp;
    });
  }

  setStardAndEndDate(startDate) {
    console.log(startDate);
    this.application.risks.forEach(risk => {
      risk.startDate = startDate;
      console.log(risk.startDate);

    });
  }

  acceptApplication() {
    this.applicationService.acceptApplication(this.application).then(resp => {
      console.log(resp);
      this.applicationService.application = resp;
      this.router.navigate(['application/last']);
    });
  }


}
