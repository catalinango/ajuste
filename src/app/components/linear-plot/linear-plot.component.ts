import { Component, ViewChild, OnInit, Input, ElementRef } from '@angular/core';
import * as D3 from 'd3';
import { Dot } from '../dot';

@Component({
  selector: 'app-linear-plot',
  templateUrl: './linear-plot.component.html',
  styleUrls: ['./linear-plot.component.scss']
})

export class LinearPlotComponent implements OnInit {
  private htmlElement: HTMLElement;
  @Input() dots: Dot[];
  
  constructor(
    elementRef: ElementRef
  ) {

    this.htmlElement = elementRef.nativeElement;  // reference to <app-linear-plot> element from the main template
    console.log(this.htmlElement);
    console.log(D3);
    console.log('Dots in plotComponent :' + this.dots);
    this.create_plot();

  }
  create_plot(){
    let d3: any = D3;

    // set the dimensions and margins of the graph
    var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var line = d3.line()
      .x(function (d) { return x(d.x); })
      .y(function (d) { return y(d.yhat); });

    var svg = d3.select(this.htmlElement).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // set the data
    var data = this.create_data(10);

    // format the data
    data.forEach(function (d) {
      d.x = +d.x;
      d.y = +d.y;
      d.yhat = +d.yhat;
    });

    x.domain(d3.extent(data, function (d) { return d.x; }));
    y.domain(d3.extent(data, function (d) { return d.y; }));

    // Add the line path.
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line(data))
      .style("fill", "none")
      .style("stroke-width","3")
      .style("stroke", "#E4002B");

    // Add the X Axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("X-Value");

    // Add the Y Axis
    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Y-Value");


    // Add the scatterplot
    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function (d) {
        return x(d.x);
      })
      .attr("cy", function (d) {
        return y(d.y);
      });
  }

  ngOnInit() { }

  create_data(nsamples) {
    var x = [];
    var y = [];
    var n = nsamples;
    var x_mean = 0;
    var y_mean = 0;
    var term1 = 0;
    var term2 = 0;
    var noise_factor = 100;
    var noise = 0;

    // create x and y values
    for (var i = 0; i < n; i++) {
      noise = noise_factor * Math.random();
      noise *= Math.round(Math.random()) == 1 ? 1 : -1;
      y.push(i / 5 + noise);
      x.push(i + 1);
      x_mean += x[i]
      y_mean += y[i]
    }

    // calculate mean x and y
    x_mean /= n;
    y_mean /= n;

    // calculate coefficients
    var xr = 0;
    var yr = 0;
    for (i = 0; i < x.length; i++) {
      xr = x[i] - x_mean;
      yr = y[i] - y_mean;
      term1 += xr * yr;
      term2 += xr * xr;

    }
    var b1 = term1 / term2;
    var b0 = y_mean - (b1 * x_mean);
    // perform regression 

    let yhat = [];
    // fit line using coeffs
    for (i = 0; i < x.length; i++) {
      yhat.push(b0 + (x[i] * b1));
    }

    var data = [];
    for (i = 0; i < y.length; i++) {
      data.push({
        "yhat": yhat[i],
        "y": y[i],
        "x": x[i]
      })
    }
    return (data);
  }

  ngOnChanges(): void {
    if (!this.dots) { return; }

    this.create_plot();
  }
}
