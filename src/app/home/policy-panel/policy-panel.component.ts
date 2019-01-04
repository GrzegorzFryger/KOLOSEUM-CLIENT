import {Component, OnInit, ViewChild} from '@angular/core';
import {InsuranceApplicaion} from '../../models/insurance-applicaion.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserRegisterService} from '../../user-register/user-register.service';
import {FormControl, Validators} from '@angular/forms';
import {MatTabChangeEvent, MatTableDataSource} from '@angular/material';
import {HomeService} from '../home.service';
import {convertInjectableProviderToFactory} from '@angular/core/src/di/util';
import {Observable} from 'rxjs';
import {Person} from '../../models/person.model';


export interface Parametr {
  name: string;
  value: string;
}

@Component({
  selector: 'app-policy-panel',
  templateUrl: './policy-panel.component.html',
  styleUrls: ['./policy-panel.component.css']
})
export class PolicyPanelComponent implements OnInit {

  displayedColumns: string[] = ['number', 'policyNumber', 'person', 'date', 'state', 'vehicle', 'totalPolicyValue', 'star'];
  dataFromSearch: InsuranceApplicaion[];
  listInsurance;

  today: Date;
  days7: Date;
  days30: Date;

  selectedCard: number;
  policyNumber;
  selectedValue: Parametr;
  fields: Parametr[] = [
    {name: 'Policy Number', value: null},
  ];



  constructor(private http: HttpClient, private homeService: HomeService) { }

  ngOnInit() {
    this.getUserApplication();
    this.getDates();
  }


  onLinkClick(event: MatTabChangeEvent) {

    this.selectedCard = event.index;

    if (event.index === 0 ) {
      this.listInsurance.filterPredicate = (data: InsuranceApplicaion, filter: Date) => data.registerDate === filter ;
      this.listInsurance.filter = this.today;
    } if (event.index === 1 ) {
      this.listInsurance.filterPredicate = (data: InsuranceApplicaion, filter: Date) => data.registerDate >= filter ;
      this.listInsurance.filter = this.days7;
    }if (event.index === 2 ) {
      this.listInsurance.filterPredicate = (data: InsuranceApplicaion, filter: Date) => data.registerDate >= filter ;
      this.listInsurance.filter = this.days30;
    }
  }

  cancelPolicy(index) {

      const temp = this.listInsurance.data.filter(x => x.id === index )[0];
      temp.state = 'CANCELED';

      this.http.put<InsuranceApplicaion>('http://localhost:8080/api/application/' + temp.id, temp).subscribe( resp =>
          this.listInsurance.data.filter(x => x.id === index )[0] = resp,
      error => console.log(error.status)
    );

  }

  submitSearch() {
    this.findPolicesByNumber(	this.policyNumber).subscribe(resp => this.dataFromSearch = resp
    );
  }

  applyNumber(event ) {
    this.policyNumber = event;
  }

  getUserApplication() {
    return this.http.get<InsuranceApplicaion[]>('http://localhost:8080/api/application/1'  + '/byUser').subscribe(resp =>
      this.listInsurance = new MatTableDataSource(resp)
    );
  }

  getDates() {
    this.homeService.getDates().then(resp => {
      this.today = resp.today;
      this.days7 = resp.days7;
      this.days30 = resp.days30;
    });
  }

  findPolicesByNumber( number: string): Observable<InsuranceApplicaion[]> {

    const param = new HttpParams().set('number', number);
    return this.http.get<InsuranceApplicaion[]>('http://localhost:8080/api/application/search', {params: param });
  }
}
