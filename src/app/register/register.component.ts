import {Component, OnInit} from '@angular/core';
import {RegisterService} from './register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerService: RegisterService;
  pickedDayOfBirth;
  pickedDrivingLicenseIssueDate;

  constructor(private service: RegisterService) {
  }


  ngOnInit() {
    this.registerService = this.service;
    this.pickedDayOfBirth = {year: 1990, month: 1, day: 1};
    this.pickedDrivingLicenseIssueDate = {year: 2008, month: 1, day: 1};
  }

  setDates() {
    this.service.person.dayOfBirth = this.pickedDayOfBirth.year + '-' + (this.pickedDayOfBirth.month < 10 ? '0'
      + this.pickedDayOfBirth.month : this.pickedDayOfBirth.month) + '-' + (this.pickedDayOfBirth.day < 10 ? '0'
      + this.pickedDayOfBirth.day : this.pickedDayOfBirth.day);

    this.service.person.drivingLicenseIssueDate = this.pickedDrivingLicenseIssueDate.year + '-'
      + (this.pickedDrivingLicenseIssueDate.month < 10 ? '0'
        + this.pickedDrivingLicenseIssueDate.month : this.pickedDrivingLicenseIssueDate.month) +
      '-' + (this.pickedDrivingLicenseIssueDate.day < 10 ? '0'
        + this.pickedDrivingLicenseIssueDate.day : this.pickedDrivingLicenseIssueDate.day);
  }


  calculatePrice() {
    this.service.register.vehicle = this.service.vehicle;
    if (this.service.register.persons.length === 0) {
      this.setDates();
      this.service.register.persons.push(this.service.person);
    }

    this.service.calculatePriceCall();

  }


}

