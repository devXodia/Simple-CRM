import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ChartOptions } from 'chart.js';
import {
  Firestore,
  collection,
  addDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { inject } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'Sales';

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    color: '#FFF',
    borderColor: '#0f012d',
    layout: {
      padding: {
        top: 16,
      },
    },

    plugins: {
      title: {
        display: true,
        text: 'Sales locations',

        // align:'start'
      },
      legend: {
        display: true,
        align: 'center',
        labels: {
          usePointStyle: true,
          padding: 16,
        },
      },
    },

    maintainAspectRatio: false,
  };

  public pieChartLabels = [
    ['Download Sales'],
    ['In Store Sales'],
    'Mail Sales',
  ];
  public pieChartDatasets = [
    {
      data: [1400, 700, 400],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  private API_KEY = 'ck8ldphr01qmbnh45p2gck8ldphr01qmbnh45p30';
  private category = 'general';
  data;
  loaded = false;
  firestore: Firestore = inject(Firestore);
  unsubUserList;
  allUsers = [];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;



  async showNews() {
    const response = await fetch(
      `https://finnhub.io/api/v1/news?category=${this.category}&token=${this.API_KEY}`
    );
    const news = await response.json();
    this.data = news;
    this.loaded = true;
  }

  
  constructor() {}

  ngOnInit(): void {
    this.showNews();
    this.subUserList();
    this.unsubUserList = this.subUserList();
  }

  subUserList(){
    return onSnapshot(this.getUsersCollection(), (list) =>{
      this.allUsers = [];
      list.forEach(user => {
        const userData = user.data();
        userData['id'] = user.id;
        this.allUsers.push(userData);
        
      });
    })
  }

  getUsersCollection(){
    return collection(this.firestore, 'users');
  }
}


