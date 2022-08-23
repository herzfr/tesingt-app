import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Chart } from 'chart.js';
import { Employee } from '../employee/employee.interface';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  single: any[] = [
    { name: 'India', value: 132 },
    { name: 'Nepal', value: 772 },
    { name: 'USA', value: 142 },
    { name: 'UK', value: 112 },
    { name: 'Brazil', value: 162 },
  ];

  pieData: any[] = [
    { name: 'India', value: 132 },
    { name: 'Nepal', value: 772 },
    { name: 'USA', value: 142 },
    { name: 'UK', value: 112 },
    { name: 'Brazil', value: 162 },
  ];

  view: any = [0, 0];
  views: any = [0, 0];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legend: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Total';
  yAxisLabel: string = 'Salary';
  legenTitle: string = 'Keterangan';
  timeline: boolean = true;

  colorScheme: any = {
    domain: [
      '#154d51',
      '#ffc107',
      '#1f8188',
      '#b28a11',
      '#40d1dc',
      '#6bdbe4',
      '#a0e5ea',
      '#bdd5d7',
      '#657f82',
    ],
  };

  legendPosition = LegendPosition.Below;
  show = false;
  dataAllEmploye: Employee[] = [];

  @ViewChild('cardFace') cardFace!: HTMLDivElement;
  @ViewChild('cardlinechart') cardlinechart!: HTMLDivElement;

  constructor(private _homeService: HomeService) {
    this.view = [innerWidth / 1.3, 400];
    this.views = [innerWidth / 1.3, 400];
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.getData();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getData() {
    this._homeService.getAllEmpl().subscribe((res) => {
      this.dataAllEmploye = res;
      this.generatePie();
    });
  }

  generatePie() {
    this.pieData = [];
    let frontend = [];
    let backend = [];
    let other = [];
    this.dataAllEmploye.forEach((e) => {
      this.pieData.push({
        name: e.firstName + ' ' + e.lastName,
        value: e.basicSalary,
      });

      if (e.group === 'FRONTEND') frontend.push(e.group);
      if (e.group === 'BACKEND') backend.push(e.group);
      if (e.group === 'OTHER') other.push(e.group);
    });
    let data = [
      { name: 'FRONTEND', value: frontend.length },
      { name: 'BACKEND', value: backend.length },
      { name: 'OTHER', value: other.length },
    ];
    this.single = data;
    this.show = true;
  }

  onResize(event: any) {
    this.view = [event.target.innerWidth / 1.35, 400];
    this.views = [event.target.innerWidth / 1.35, 400];
  }
}
