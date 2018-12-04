import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../application.service';
import {InsuranceApplicaion} from '../../models/insurance-applicaion.model';

@Component({
  selector: 'app-third-step',
  templateUrl: './thirdStep.component.html',
  styleUrls: ['./thirdStep.component.css']
})
export class ThirdStepComponent implements OnInit {

  application: InsuranceApplicaion = new InsuranceApplicaion();

  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.application = this.applicationService.application;
    console.log(this.application);
  }



}
