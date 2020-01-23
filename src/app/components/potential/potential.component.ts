import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dot } from "../dot";
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-potential',
  templateUrl: './potential.component.html',
  styleUrls: ['./potential.component.scss']
})
export class PotentialComponent implements OnInit, OnDestroy {;
  
  noDots: boolean;
  errMsg: string; 
  dots: Dot[];
  n: number;
  ca1: string;
  ca2: string;
  lnca1: string;
  cxi: string;
  csx: string;
  csx2: string;
  csy: string;
  csyx: string;
  data: any;
  fx: string;
  plotType: string = "logarithmic";
  
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
      let auxA1 = 0;
      let auxA2 = 0;
      let a1 = 0;
      let a2 = 0;
      
      dots.forEach(d => {
        d.x = Number(d.x);
        d.y = Number(d.y);
        sx = (d.x == 0) ? sx + 1 : sx + Math.log(d.x);
        sx2 = (d.x == 0) ? sx2 + 1 : sx2 + Math.log(d.x**2);
        sy = (d.y == 0) ? sy + 1 : sy + Math.log(d.y);
        syx = (d.y == 0 || d.x == 0) ? syx + 1 : syx +  (Math.log(d.y) * Math.log(d.x));
      });
      
      
      if (this.n != 0) {
        auxA2 = sx2 - sx ** 2 / this.n;
        if (auxA2 != 0){ 
          a2 = (syx - sx * sy / this.n) / auxA2;
          auxA1 = sy / this.n - sx * a2 / this.n;
          a1 = Math.E ** auxA1;
          this.lnca1 = auxA1.toFixed(3);
          this.ca1 = a1.toFixed(3);
          this.ca2 = a2.toFixed(3);
          this.csx = sx.toFixed(3);
          this.csx2 = sx2.toFixed(3);
          this.csy = sy.toFixed(3);
          this.csyx = syx.toFixed(3);
          this.fx = this.ca1 + "x^" + this.ca2; 
        }
      }
      let dt = {"scatterDots" : [], "lineDots": [], "fx": this.fx};
      dots.forEach(d => {
        dt.scatterDots.push({
          "x": d.x,
          "y": d.y
        });
        dt.lineDots.push({
          "x": d.x,
          "y": a1 * (d.x ** a2),
        });
      });
      
      console.log("A1 = " + this.ca1 + "; A2 = " + this.ca2);
      this.data = JSON.stringify(dt);
    }
  }