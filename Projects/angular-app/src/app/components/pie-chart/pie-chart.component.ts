import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/chart.service';

import { Observable } from 'rxjs';

import { IChart } from '../../interface/data-chart.interface'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  data: Observable<Object> = new Observable;

  charts: IChart[] = [];
  chartObj: {} = {};
  chartsTag: string[] = [];
  chartsValueV: number[] = [];
  chartsValueD: string[] = [];

  getChartData(obj: IChart[]) {
    for (let item of obj) {
      this.chartsTag.push(item.tag);
      this.chartsValueV.push(item.value[0]['v']);
      this.chartsValueD.push(item.value[0]['d']);
    }
  }

  constructor(private http: HttpService) { }

  ngOnInit() {

    this.data = this.http.getData();

    this.data.subscribe({
      next: (data: any) => {
        this.charts = data['pie'];
        this.getChartData(this.charts);

        this.chartObj = new Chart('pieChart', {
          type: 'doughnut',
          data: {
            labels: this.chartsTag,
            datasets: [{
              label: '# of Votes',
              data: this.chartsValueV,
              backgroundColor: [
                '#ee6666',
                '#73c0de',
                '#5470c6',
                '#91cc75',
                '#fac858'
              ],
              borderColor: [
                '#fff'
              ],
              borderWidth: 1,
              borderRadius: 5
            }],
          },
          options: {
            responsive: true,
            layout: {
              padding: 20,
            },
            plugins: {
              legend: {
                labels: {
                  boxHeight: 7,
                  boxWidth: 12,
                  font: {
                    size: 8
                  },
                  padding: 8
                },
                position: 'top'
              }
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
