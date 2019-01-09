import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-panel',
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.css']
})
export class ChartPanelComponent implements OnInit {

  constructor() { }

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  public colors = [

    'rgba(153, 102, 255, 1)'
  ];

  ngOnInit() {
  }




}
