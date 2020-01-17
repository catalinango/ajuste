import { Component, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
import * as D3 from 'd3';
import { Dot } from '../dot';

@Component({
  selector: 'app-linear-plot',
  templateUrl: './linear-plot.component.html',
  styleUrls: ['./linear-plot.component.scss']
})

export class LinearPlotComponent implements OnInit, OnDestroy {
  private htmlElement: HTMLElement;
  @Input('data') data: any;

  constructor(
    private elementRef: ElementRef,
  ) {
    // subscribe to linear-plot component messages
    this.htmlElement = this.elementRef.nativeElement;  // reference to <app-linear-plot> element from the main template
    console.log("htmlElelemnt: " + this.htmlElement);
    console.log("D3: " + D3);
    console.log("Data in plotComponent : " + JSON.stringify(this.data));
  }

  create_plot() {
    let d3: any = D3;

    // set the dimensions and margins of the graph
    let margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // set the ranges
    let x = d3.scaleLinear().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    // define the line
    let line = d3.line()
      .x(function (d) { return x(d.x); })
      .y(function (d) { return y(d.yhat); });

    let svg = d3.select(this.htmlElement).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // set the data
    //let data = this.create_data(10);
    let data = this.data;

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
      .style("stroke-width", "3")
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

  ngOnInit() {
    this.create_plot();
  }

  ngOnDestroy() {
  }

  ngOnChanges() {
    if (!this.data) { return; }
    this.create_plot();
  }

  create_data_old(nsamples) {
    let x = [];
    let y = [];
    let n = nsamples;
    let x_mean = 0;
    let y_mean = 0;
    let term1 = 0;
    let term2 = 0;
    let noise_factor = 100;
    let noise = 0;

    /*  this.dots.forEach(d => {
        x.push(d.x),
        y.push(d.y)
      });*/

    // create x and y values
    for (let i = 0; i < n; i++) {
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
    let xr = 0;
    let yr = 0;
    for (let i = 0; i < x.length; i++) {
      xr = x[i] - x_mean;
      yr = y[i] - y_mean;
      term1 += xr * yr;
      term2 += xr * xr;

    }
    let b1 = term1 / term2;
    let b0 = y_mean - (b1 * x_mean);
    // perform regression 

    let yhat = [];
    // fit line using coeffs
    for (let i = 0; i < x.length; i++) {
      yhat.push(b0 + (x[i] * b1));
    }

    let data = [];
    for (let i = 0; i < y.length; i++) {
      data.push({
        "yhat": yhat[i],
        "y": y[i],
        "x": x[i]
      })
    }
    return (data);
  }
}
