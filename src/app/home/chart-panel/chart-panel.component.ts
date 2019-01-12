import { Component, OnInit } from '@angular/core';
import {ChartDataModel} from '../../models/chart-data.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-chart-panel',
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.css']
})
export class ChartPanelComponent implements OnInit {

  constructor( private http: HttpClient) { }


  today: Date;
  days30: Date;

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };


  public barChartLabels = [];
  public barChartType = 'bar' ;
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Total policies value'},
    { data: [], label: 'Average', type: 'line', fill: 'false'}
    ];
  public colors = [];


  ngOnInit() {
    this.getDates();
    this.getChartData().subscribe(resp =>
      resp.forEach( x => {
        this.barChartLabels.push(x.label);
        this.barChartData[0].data.push(x.value);
        this.barChartData[1].data.push(x.value / x.count);
      }));
  }
  getDates() {
  const now =  new Date();
  const priorDate = new Date().setDate(now.getDate() - 30 );
  this.today  = now;
  this.days30 = new Date(priorDate);
  }

  getChartData(): Observable<ChartDataModel[]> {

    return this.http.post<ChartDataModel[]>('http://localhost:8080/api/application/chart',
      {start: this.days30.toISOString(), end: this.today});
  }






}
