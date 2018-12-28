import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApplicationService} from '../application.service';
import {InsuranceApplicaion} from '../../models/insurance-applicaion.model';
import {Router} from '@angular/router';

import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, take} from 'rxjs/operators';
import {Observable, of, Subscription} from 'rxjs';
import {ClientsService} from '../clients.service';
import {Person} from '../../models/person.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateFormatter} from 'ngx-bootstrap';

@Component({
  selector: 'app-third-step',
  templateUrl: './thirdStep.component.html',
  styleUrls: ['./thirdStep.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ThirdStepComponent implements OnInit {

  application: InsuranceApplicaion;
  public model: any;
  searching = false;
  customerForm: FormGroup;
  submitted = false;
  searchFailed = false;
  clickedItem: Person;

  dateNow: string;
  dateEnd: string;

  formatResults = (value: Person) => value.firstName + ' ' + value.lastName + ' ' + value.phoneNumber || '';

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 3 ? [] :
        this.clients.findClientsByPhoneNumber(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of(['']);
          }))),
      tap(() => this.searching = false)
    )


  constructor(private formBuilder: FormBuilder, private applicationService: ApplicationService, private router: Router,
              private clients: ClientsService) {

    this.application = new InsuranceApplicaion();
  }

  ngOnInit() {

    this.setCurrentDate();
    this.application = this.applicationService.application;

    this.customerForm = this.formBuilder.group(
      {
        customerName: ['', [Validators.required]],
        customerLastName: ['', [Validators.required]],
        customerPesel: ['', [Validators.required]],
        customerPhoneNumber: ['', [Validators.required]],
        adressPostalCode: ['', [Validators.required]],
        adressCity: ['', [Validators.required]],
        adressStreet: ['', [Validators.required]],
        adressHouse: ['', [Validators.required]],
        adressApartment: [''],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        LicencePlateNumber: ['', [Validators.required]],
        vin: ['', [Validators.required]]
      }
    );

    this.customerForm.get('startDate').setValue(this.dateNow);
    this.customerForm.get('endDate').setValue(this.dateEnd);

  }

  private setCurrentDate() {
    const date = new Date();
    this.dateNow = date.toISOString().slice(0, 10);
    date.setFullYear(date.getFullYear() + 1);
    this.dateEnd = date.toISOString().slice(0, 10);
  }

  selectedPerson(selected) {
    this.clickedItem = selected.item;
    this.customerForm.get('customerName').setValue(this.clickedItem.firstName);
    this.customerForm.get('customerLastName').setValue(this.clickedItem.lastName);
    this.customerForm.get('customerPesel').setValue(this.clickedItem.pesel);
    this.customerForm.get('customerPhoneNumber').setValue(this.clickedItem.phoneNumber);
    this.customerForm.get('adressPostalCode').setValue(this.clickedItem.address.postalCode);
    this.customerForm.get('adressCity').setValue(this.clickedItem.address.city);
    this.customerForm.get('adressStreet').setValue(this.clickedItem.address.street);
    this.customerForm.get('adressHouse').setValue(this.clickedItem.address.house);
    this.customerForm.get('adressApartment').setValue(this.clickedItem.address.apartment);
  }

  get f() {
    return this.customerForm.controls;
  }

  submitCustomerFrom() {
    this.submitted = true;

    if (this.customerForm.invalid) {
      return;
    }

    this.application.persons[0].firstName = this.customerForm.get('customerName').value;
    this.application.persons[0].lastName =  this.customerForm.get('customerLastName').value;
    this.application.persons[0].phoneNumber = this.customerForm.get('customerPhoneNumber').value;
    this.application.persons[0].pesel = this.customerForm.get('customerPesel').value;
    this.application.persons[0].address.postalCode = this.customerForm.get('adressPostalCode').value;
    this.application.persons[0].address.city = this.customerForm.get('adressCity').value;
    this.application.persons[0].address.street =   this.customerForm.get('adressStreet').value;
    this.application.persons[0].address.house = this.customerForm.get('adressHouse').value;
    this.application.persons[0].address.apartment = this.customerForm.get('adressApartment').value;
    this.application.vehicle.licencePlateNumber = this.customerForm.get('LicencePlateNumber').value;
    this.application.vehicle.vin = this.customerForm.get('vin').value;

    //toDo
    // this.setStardAndEndDate(this.customerForm.get('startDate').value, this.customerForm.get('endDate').value);

    console.log(this.application.risks)
     this.acceptApplication();
    this.customerForm.reset();
    this.submitted = false;

  }

  //todo
  setStardAndEndDate(startDate, endDate) {
    this.application.risks.forEach(risk => {
      risk.startDate = startDate;
      console.log(risk.startDate);
      risk.endDate = endDate;
      console.log(risk.endDate);
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
