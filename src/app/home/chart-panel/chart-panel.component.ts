import { Component, OnInit } from '@angular/core';
import {ChartDataModel} from '../../models/chart-data.model';
import {HomeService} from '../home.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-chart-panel',
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.css']
})
export class ChartPanelComponent implements OnInit {

  constructor( private homeService: HomeService, private http: HttpClient) { }


  today: Date;
  days7: Date;
  days30: Date;

  public nowDate: Date;

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [{
    data: [], label: 'Total sales'}];

  public values = [];

  public colors = [

  ];



  ngOnInit() {
    this.getDates();
    this.getChartData().subscribe(resp =>
      resp.forEach( x => {
        this.barChartLabels.push(x.label);
        this.barChartData[0].data.push(x.value); }));



  }

  getDates() {
    this.homeService.getDates().then(resp => {
      this.today = resp.today;
      this.days7 = resp.days7;
      this.days30 = resp.days30;
    });
  }



  getChartData(): Observable<ChartDataModel[]> {

    return this.http.post<ChartDataModel[]>('http://localhost:8080/api/application/chart', {start: '2018-12-13', end: '2019-12-13'});
  }






}
