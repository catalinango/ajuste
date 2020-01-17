import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dot } from "../dot";
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-exponential',
  templateUrl: './exponential.component.html',
  styleUrls: ['./exponential.component.scss']
})
export class ExponentialComponent implements OnInit, OnDestroy {

  noDots: boolean;
  errMsg: string;
  dots: Dot[];
  n: number;
  ca1: string;
  lnca1: string;
  ca2: string;
  cxi: string;
  csx: string;
  csx2: string;
  csy: string;
  csyx: string;
  data: any;
  fx: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    let ds = new Array<Dot>();
    this.dataService.getDots()
    .subscribe(
      d => {
        ds = d
      },
      err => {
        this.errMsg = err;
      });

    if (ds === undefined) {
      this.noDots = true;
    }
    else {
      console.log("Dots in Linear: " + JSON.stringify(ds));
      this.dots = ds;
      this.n = Number(this.dots.length);
      this.calculateFx(ds);
    }
  }

  ngOnDestroy(){
    
  }
    
  calculateFx(dots: Dot[]) {

    let sx = 0;
    let sx2 = 0;
    let sy = 0;
    let syx = 0;
    let a1 = 0;
    let a2 = 0;
    let auxA1 = 0;
    let auxA2 = 0;

    dots.forEach(d => {
      d.x = Number(d.x);
      d.y = Number(d.y);
      sx = sx + d.x;
      sx2 = sx2 + (d.x * d.x);
      sy = sy + Math.log(d.y);
      syx = syx + Math.log(d.y * d.x);
     // console.log("sy :" + sy + "; syx: " + syx);
    });

    if (sx != 0) {
      auxA2 = -this.n * sx2 / sx + sx;
    }

    if (auxA2 != 0) {
      a2 = (sy - this.n * syx / sx) / auxA2;
      auxA1 = (syx / sx) - (sx2 / sx * a2);
      a1 = Math.E ** auxA1;
      this.lnca1 = auxA1.toFixed(3);
      this.ca1 = a1.toFixed(3);
      this.ca2 = a2.toFixed(3);
      this.csx = sx.toFixed(3);
      this.csx2 = sx2.toFixed(3);
      this.csy = sy.toFixed(3);
      this.csyx = syx.toFixed(3);
      this.fx = this.ca1 + "^ln" + this.ca2 + "x" ; 
    }
    
    let dt = [];
    dots.forEach(d => {
      dt.push({
        "yhat": a1 * (Math.E ** (a2 * d.x)),
        "y": d.y,
        "x": d.x
      });
    });

    console.log("A1 = " + this.ca1 + "; A2 = " + this.ca2);
    this.data = JSON.stringify(dt);
  }
}