import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dot } from "../dot";
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-quotient',
  templateUrl: './quotient.component.html',
  styleUrls: ['./quotient.component.scss']
})
export class QuotientComponent implements OnInit {
  
  noDots: boolean;
  errMsg: string;
  dots: Dot[];
  n: number;
  ca: string;
  cb: string;
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
      let a = 0;
      let b = 0;
      
      dots.forEach(d => {
        d.x = Number(d.x);
        d.y = Number(d.y);
        if (d.x != 0){
          sx = sx + (1 / d.x);
          sx2 = sx2 + ((1 / d.x)**2);
        }
        sy = (d.y != 0) ? (sy + (1 / d.y)) : 0;
        syx = (d.x != 0 && d.y != 0)?  (syx + ((1 / d.x) * (1 / d.y))): 0; 
      });
      
      if (sx != 0) {
        let delta = this.n * sx2 - sx * sx;
        if (delta != 0){
          a = (sy * sx2 - sx * syx) / delta;
          a = 1 / a;
          b = (this.n * syx - sy * sx) / delta;
          b = b * a;
        }
        this.ca = a.toFixed(3);
        this.cb = b.toFixed(3);
        this.csx = sx.toFixed(3);
        this.csx2 = sx2.toFixed(3);
        this.csy = sy.toFixed(3);
        this.csyx = syx.toFixed(3);
        this.fx = this.ca + "x / (x + " + this.cb + ')'; 
      }
      
      let dt = {"scatterDots" : [], "lineDots": [], "fx": this.fx};
      dots.forEach(d => {
        dt.scatterDots.push({
          "x": d.x,
          "y": d.y
        });
        dt.lineDots.push({
          "x": d.x,
          "y": ((a * d.x) / (d.x + b)),
        });
      });
      console.log("A = " + this.ca + "; B = " + this.cb);
      this.data = JSON.stringify(dt);
    }
  }