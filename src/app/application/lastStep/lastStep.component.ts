import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../application.service';
import {InsuranceApplicaion} from '../../models/insurance-applicaion.model';

@Component({
  selector: 'app-last',
  templateUrl: './lastStep.component.html',
  styleUrls: ['./lastStep.component.css']
})
export class LastStepComponent implements OnInit {

  insuranceApplication: InsuranceApplicaion = new InsuranceApplicaion();

  constructor(private applicationService: ApplicationService) { }

  ngOnInit() {
    this.insuranceApplication = this.applicationService.application;
  }

}
