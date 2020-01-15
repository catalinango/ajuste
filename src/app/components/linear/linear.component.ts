import { Component, OnInit } from '@angular/core';
import { Dot } from "../dot";
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-linear',
  templateUrl: './linear.component.html',
  styleUrls: ['./linear.component.scss']
})
export class LinearComponent implements OnInit {
  showChart = false;
  showSppiner = false;
 
  dotsNum: number;
  ca1: string;
  ca2: string;
  cxi: string;
  csx: string;
  csx2: string;
  csy: string;
  csxy: string;
  data: any;
  fx: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    let ds = new Array<Dot>();
    this.dataService.getDots().subscribe(d => ds = d);
    console.log("Dots in Linear: " + JSON.stringify(ds));
    this.linearRegression(ds);
  }

  linearRegression(dots: Dot[]) {

    this.dotsNum = Number(dots.length);
    let sx = 0;
    let sx2 = 0;
    let sy = 0;
    let sxy = 0;
    let a1 = 0;
    let a2 = 0;

    dots.forEach(d => {
      d.x = Number(d.x);
      d.y = Number(d.y);
      sx = sx + d.x;
      sx2 = sx2 + (d.x * d.x);
      sy = sy + d.y;
      sxy = sxy + (d.x * d.y);
    });

    if (this.dotsNum != 0 || sx != 0) {
      let aux = (sx2 - ((sx * sx) / this.dotsNum));
      a2 = (sxy - ((sx * sy) / this.dotsNum)) / aux;
      a1 = (sy - (sx * a2)) / this.dotsNum;
      this.ca2 = a2.toFixed(3);
      this.ca1 = a1.toFixed(3);
      this.csx = sx.toFixed(3);
      this.csx2 = sx2.toFixed(3);
      this.csy = sy.toFixed(3);
      this.csxy = sxy.toFixed(3);
      this.fx = this.ca2 + "x + " + this.ca1; 
    }
    
    let dt = [];
    dots.forEach(d => {
      dt.push({
        "yhat": ((a2 * d.x) + a1),
        "y": d.y,
        "x": d.x
      });
    });

    console.log("A1 = " + this.ca1 + "; A2 = " + this.ca2);
    this.data = JSON.stringify(dt);
    console.log("Data in LinearComponent: " + JSON.stringify(dt));
    this.showChart = true;
  }
}
