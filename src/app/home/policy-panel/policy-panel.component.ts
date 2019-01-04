import {Component, OnInit, ViewChild} from '@angular/core';
import {InsuranceApplicaion} from '../../models/insurance-applicaion.model';
import {HttpClient} from '@angular/common/http';
import {UserRegisterService} from '../../user-register/user-register.service';
import {FormControl} from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material';



@Component({
  selector: 'app-policy-panel',
  templateUrl: './policy-panel.component.html',
  styleUrls: ['./policy-panel.component.css']
})
export class PolicyPanelComponent implements OnInit {

  displayedColumns: string[] = ['number', 'policyNumber', 'person', 'date', 'state', 'vehicle', 'totalPolicyValue', 'star'];
  dataSource: InsuranceApplicaion[];
  lsitInsurance: InsuranceApplicaion[];



  selected = new FormControl(0);
  today: String;
  days7: Date;
  days30: Date;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.today = new Date().toISOString().slice(0, 10);
    this.getUserApplication();
  }


  onLinkClick(event: MatTabChangeEvent) {

    if (event.index === 0 ) {
      this.dataSource =  this.lsitInsurance
        .filter(x => x.registerDate.toString() === this.today);
    } else {
      this.dataSource = this.lsitInsurance;
    }

  }
  
  cancelPolicy(index) {

   const temp = this.dataSource[index];
   temp.state = 'CANCELED';

    this.http.put<InsuranceApplicaion>('http://localhost:8080/api/application/' + temp.id, temp).subscribe( resp =>
      this.dataSource[index] = resp,
      error => console.log(error.status)
    );

  }

  getUserApplication() {
    return this.http.get<InsuranceApplicaion[]>('http://localhost:8080/api/application/1'  + '/byUser').subscribe(resp =>
      this.lsitInsurance = resp
    );
  }
}
