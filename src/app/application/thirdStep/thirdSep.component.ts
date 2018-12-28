import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApplicationService} from '../application.service';
import {InsuranceApplicaion} from '../../models/insurance-applicaion.model';
import {Router} from '@angular/router';

import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, take} from 'rxjs/operators';
import {Observable, of, Subscription} from 'rxjs';
import {ClientsService} from '../clients.service';
import {Person} from '../../models/person.model';

@Component({
  selector: 'app-third-step',
  templateUrl: './thirdStep.component.html',
  styleUrls: ['./thirdStep.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ThirdStepComponent implements OnInit {

  application: InsuranceApplicaion = new InsuranceApplicaion();
  public model: any;
  searching = false;
  searchFailed = false;
  clickedItem: Person;

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


  constructor(private applicationService: ApplicationService, private router: Router, private clients: ClientsService) {


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


  selectedPerson(selected) {
    this.clickedItem = selected.item;
    console.log(this.clickedItem);
  }
}
