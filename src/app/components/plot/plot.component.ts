import { Component, OnInit, OnDestroy, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})

export class PlotComponent implements OnInit, OnDestroy { 
  @Input() data: any;
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  chart: Chart;
  
  constructor() { }
  
  ngOnInit() {
    this.data = JSON.parse(this.data);
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.create_plot();
    console.log("Data in plotComponent : " + JSON.stringify(this.data)); 
  }
  
  
  ngOnDestroy() { }
  
  create_plot(){
    this.chart = new Chart(this.ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Datos Analizados',
          borderColor: '#f56954',
          backgroundColor: '#f56954',
          data: this.data.scatterDots
        },
        {
          label: 'f(x)',
          data: this.data.lineDots,
          borderColor: '#3c8dbc',
          backgroundColor:'#3c8dbc',
          fill: 'false',
          type: 'line'
        }]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
    });
  }
}
