import { Component, OnInit, OnDestroy} from '@angular/core';
import { Dot } from "../dot";
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-polynomial',
  templateUrl: './polynomial.component.html',
  styleUrls: ['./polynomial.component.scss']
})
export class PolynomialComponent implements OnInit, OnDestroy {
  
  noDots: boolean;
  errMsg: string;
  dots: Dot[];
  n: number;
  ca1: string;
  ca2: string;
  ca3: string;
  cxi: string;
  csx: string;
  csx2: string;
  csx3: string;
  csx4: string;
  csy: string;
  csyx: string;
  csyx2: string;
  data: any;
  fx: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    let ds = new Array<Dot>();
    this.dataService.getDots()
    .subscribe(
      d => {
        ds = d;
      },
      err => {
        this.errMsg = err;
      });

    if (ds === undefined) {
      this.noDots = true;
      console.log("ds undefined")
    }
    else {
      console.log("Dots in Polynomial: " + JSON.stringify(ds));
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
    let sx3 = 0;
    let sx4 = 0;
    let sy = 0;
    let syx = 0;
    let syx2 = 0;
    let a1 = 0;
    let a2 = 0;
    let a3 = 0;

    dots.forEach(d => {
      d.x = Number(d.x);
      d.y = Number(d.y);
      sx = sx + d.x;
      sx2 = sx2 + (d.x ** 2);
      sx3 = sx3 + (d.x ** 3);
      sx4 = sx4 + (d.x ** 4);
      sy = sy + d.y;
      syx = syx + (d.y * d.x);
      syx2 = syx2 + (d.y * (d.x ** 2));
    });

    let delta = (this.n * (sx2 * sx4 - sx3 * sx3)) - (sx * (sx * sx4 - sx2 * sx3)) + (sx2 * (sx * sx3 - sx2 * sx2));
    if (delta != 0) {
      a1 = ((sy * (sx2 * sx4 - sx3 * sx3)) - (sx * (syx * sx4 - syx2 * sx3)) + (sx2 * (syx * sx3 - syx2 * sx2))) / delta;
      a2 = ((this.n * (syx * sx4 - syx2 * sx3)) - (sy * (sx * sx4 - sx2 * sx3)) + (sx2 * (sx * syx2 - sx2 * syx))) / delta;
      a3 = ((this.n * (sx2 * syx2 - sx3 * syx)) - (sx * (sx * syx2 - sx2 * syx)) + (sy * (sx * sx3 - sx2 * sx2))) / delta;
      this.ca1 = a1.toFixed(3);
      this.ca2 = a2.toFixed(3);
      this.ca3 = a3.toFixed(3);
      this.csx = sx.toFixed(3);
      this.csx2 = sx2.toFixed(3);
      this.csx3 = sx3.toFixed(3);
      this.csx4 = sx4.toFixed(3);
      this.csy = sy.toFixed(3);
      this.csyx = syx.toFixed(3);
      this.csyx2 = syx2.toFixed(3);
      this.fx = this.ca3 + "x^2 + " + this.ca2 + "x + " + this.ca1; 
    }
    
    let dt = [];
    dots.forEach(d => {
      dt.push({
        "yhat": ((a2 * d.x) + a1),
        "y": d.y,
        "x": d.x
      });
    });

    console.log("A1 = " + this.ca1 + "; A2 = " + this.ca2 + "; A3 = " + this.ca3);
    this.data = JSON.stringify(dt); 
  }
}