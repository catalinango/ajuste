import { Component, OnInit, OnChanges, Input, ElementRef, Renderer2 } from '@angular/core';
import * as D3 from 'd3';

@Component({
  selector: 'app-linear-plot',
  templateUrl: './linear-plot.component.html',
  styleUrls: ['./linear-plot.component.scss']
})

export class LinearPlotComponent implements OnInit, OnChanges {

  private htmlElement: HTMLElement;
  @Input() data: any;
  @Input() fx: any;

  constructor(
    elementRef: ElementRef,
    public _renderer: Renderer2
  ) {
    this.htmlElement = elementRef.nativeElement;  // reference to <app-linear-plot> element from the main template 
    console.log(this.htmlElement);
    console.log(D3);
  }

  create_plot() {
    let d3: any = D3;

    // set the dimensions and margins of the graph
    let margin = { top: 20, right: 30, bottom: 30, left: 40 },
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

    // format the data
    let linePoints = [];
    let dt = this.data
    dt.forEach(function (d) {
      d.x = +d.x;
      d.y = +d.y;
      d.yhat = +d.yhat;

      linePoints.push({
        "x": d.x,
        "y": d.yhat
      });
    });
    let yAux = dt.map(function (d) { return d.y });
    let yhatAux = dt.map(function (d) { return d.yhat });
    let yValues:[] = yAux.concat(yhatAux);

    /* console.log("yValues = " + yValues);
    console.log ("yMax: " +  d3.max(yValues) + "yMin: " + d3.min(yValues));
    console.log ("xMax: " +  d3.max(dt, function (d) { return d.x }) + "yMin: " + d3.min(dt, function (d) { return d.x }));
    */
   
    x.domain([d3.min(dt, function (d) { return d.x }), d3.max(dt, function (d) { return d.x })]);
    y.domain([d3.min(yValues), d3.max(yValues)]);

    // add the X Axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Eje X");

    // add the Y Axis
    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Eje Y");

    // this allows to find the closest X index of the mouse:
    let bisect = d3.bisector(function (d) { return d.x; }).left;

    // create the circle that travels along the curve of chart
    let focus = svg
      .append('g')
      .append('circle')
      .style("fill", "none")
      .attr("stroke", "black")
      .attr('r', 6.5)
      .style("opacity", 0)

    // create the text that travels along the curve of chart
    let focusText = svg
      .append('g')
      .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "right")
      .attr("alignment-baseline", "middle")

    // what happens when the mouse move -> show the annotations at the right positions.
    // create a rect on top of the svg area: this rectangle recovers mouse position
    svg.append('rect')
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', function () {
        focus.style("opacity", 1);
        focusText.style("opacity", 1);
      })
      .on('mousemove', (d, j, n) => {
        // recover coordinate we need
        let x0 = x.invert(d3.mouse(n[j])[0]);  //<-- to replace x.invert(d3.mouse(this))
        //let i = bisect(this.data, x0, 1);
        let selectedData = this.data[0];
        focus
           .attr("cx", x(selectedData.x))
           .attr("cy", y(selectedData.yhat));
        focusText
          .html("f(x): " + this.fx)
          .attr("x", x(selectedData.x))
          .attr("y", y(selectedData.yhat));
      })
      .on('mouseout', function () {
        focus.style("opacity", 0);
        focusText.style("opacity", 0);
      });

    // add the scatterplot
    svg.selectAll(".dot")
      .data(this.data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function (d) { return x(d.x); })
      .attr("cy", function (d) { return y(d.y); })
      .style("fill", "#2471A3");

    // add the line path. SVG Paths represent the outline of a shape that can be stroked,
    //  filled, used as a clipping path, or any combination of all three.
    // We can draw rectangles, circles, ellipses, polylines, polygons, straight lines, and curves through path
    svg.append("path")
      .datum(this.data)
      .attr("class", "line")
      .attr("d", line(this.data))
      .style("fill", "none")
      .style("stroke-width", "3")
      .style("stroke", "#58d68d");

    // adding grid lines
    let make_x_gridlines = function () {
      return d3.axisBottom(x)
        .ticks(8)
    }
    let make_y_gridlines = function () {
      return d3.axisLeft(y)
        .ticks(5)
    }

    svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .style("stroke-dasharray", ("3,3"))
      .call(make_x_gridlines()
        .tickSize(-height)
        .tickFormat("")
      )
    svg.append("g")
      .attr("class", "grid")
      .style("stroke-dasharray", ("3,3"))
      .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat("")
      )
  }

  ngOnInit() {
    this.data = JSON.parse(this.data);
   // console.log('Data in plotComponent :' + JSON.stringify(this.data));
    this.create_plot();
  }

  ngOnChanges(): void {
    if (!this.data) { return; }
  }

}
