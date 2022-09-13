import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/chart.service';

import { Observable } from 'rxjs';

import { IChart } from '../../interface/data-chart.interface'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-optimization',
  templateUrl: './optimization.component.html',
  styleUrls: ['./optimization.component.css']
})
export class OptimizationComponent implements OnInit {

  data: Observable<Object> = new Observable;

  charts: IChart[] = [];
  chartObj: {} = {};
  chartsTag: string[] = [];
  chartsValue: {}[] = [];

  getChartData(obj: IChart[]) {
    for (let line of obj) {
      this.chartsTag.push(line.tag);
      this.chartsValue.push(line.value);
    }
  }

  constructor(private http: HttpService) { }

  ngOnInit() {

    this.data = this.http.getData();

    this.data.subscribe({
      next: (data: any) => {

        this.charts = data['opt'];
        this.getChartData(this.charts);

        console.log(this.chartsValue[0]);

        this.chartObj = new Chart('optChart', {
          type: 'line',
          data: {
            datasets: [
              {
                data: this.chartsValue[0],
                borderColor: '#ee6666',
              },
              {
                data: this.chartsValue[1],
                borderColor: '#73c0de',
              },
            ],
          },
          options: {
            parsing: {
              xAxisKey: 'd',
              yAxisKey: 'v'
            },
            responsive: true,
            scales: {
              x: {
                grid: {
                  color: 'transparent',
                }
              },
              y: {
                min: 0,
                grid: {
                  borderColor: 'transparent'
                }
              }
            },
            layout: {
              padding: 20
            },
            plugins: {
              legend: {
                display: false
              },
            }
          },
          plugins: [plugin]
        })

      }
    });

    const plugin = {
      id: 'custom_canvas_background_color',
      beforeDraw: (chart: any) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    };

  }

}
