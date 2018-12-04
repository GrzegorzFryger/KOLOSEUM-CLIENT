import {InsuranceHistory} from './insuranceHistory.model';
import {Input} from '@angular/core';
import {Address} from './address.model';


export class Person {
  dayOfBirth: string ;
  drivingLicenseIssueDate: string;
  @Input() insuranceHistory: InsuranceHistory = new InsuranceHistory();
  firstName: string;
  lastName: string;
  pesel: string;
  address: Address;
}
