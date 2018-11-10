import {InsuranceHistory} from './insuranceHistory.model';
import {Input} from '@angular/core';

export class Person {
  dayOfBirth: string ;
  drivingLicenseIssueDate: string;
  @Input() insuranceHistory: InsuranceHistory = new InsuranceHistory();
}
