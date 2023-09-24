import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  title = 'Sales';

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    
    responsive: true,
    color: '#FFF',
    borderColor: '#0f012d',
    layout: {
      padding: {
        top: 16
      }, 
  },
  
    
  plugins: {
    title: {
      display: true,
      text: 'Sales locations'
     
      // align:'start'
    },
    legend: {
      display: true,
      align: 'center',
      labels: {
        usePointStyle: true,
        padding: 16,
            }
    }
  },
    
    maintainAspectRatio: false,
  
};

  public pieChartLabels = [ [ 'Download Sales' ], [ 'In Store Sales' ], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [ 1400, 700, 400 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  
  constructor() {
  }

}
