import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Dot } from '../dot';
import { GoodnessData } from '../goodness-data';
import { LinearData } from '../linear-data';

@Component({
  selector: 'app-linear-gof',
  templateUrl: './linear-gof.component.html',
  styleUrls: ['./linear-gof.component.scss']
})
export class LinearGofComponent implements OnInit {

  noDots: boolean;
  errMsg: string;
  dots: Dot[];
  data: LinearData;
  dt: string;
  n: number;
  linearData: LinearData;
  linearGD: GoodnessData;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    let ds = new Array<Dot>();
    this.dataService.getDots()
      .subscribe(
        d => { ds = d },
        err => { this.errMsg = err; });

    if (ds === undefined || ds.length < 1) { this.noDots = true; }
    else {

      this.data = new LinearData();
      this.dataService.getLinearData(ds).subscribe(
        d => {
          this.data = d;
          this.linearData = d;
          this.linearGD = this.goodnessOfFit(this.linearData, "linear");
          console.log(JSON.stringify(d));
        },
        err => {
          this.errMsg = err;
        }
      );

      this.dots = ds;
      this.n = Number(this.dots.length);

      this.dt = JSON.stringify(this.data);
      console.log("Dots in Linear: " + JSON.stringify(ds));


    }
  }
  goodnessOfFit(data: any, type: string): GoodnessData {
    let lgd = new GoodnessData();
    let y1 = 0; // y' = f(x)
    let y3 = 0; // (y - y')^2
    let y4 = 0; // (y' - overline y)^2
    let y5 = 0; // (y - overline y)^2
    let sy = 0; // Sum y
    let sy1 = 0; // Sum y' = f(x)
    let sy3 = 0; // Sum(y - y')^2
    let sy4 = 0; // Sum(y' - overline y)^2
    let sy5 = 0; // Sum(y - overline y)^2
    let yo = data.values.sy0 / data.values.n; // overline y

    for (let i = 0; i < data.scatterDots.length; i++) {
      const d = data.scatterDots[i];
      sy = sy + d.y;
      y1 = data.lineDots[i].y;
      y3 = (d.y - y1) ** 2;
      y4 = (y1 - yo) ** 2;
      y5 = (d.y - yo) ** 2;
      sy1 = sy1 + y1;
      sy3 = sy3 + y3;
      sy4 = sy4 + y4;
      sy5 = sy5 + y5;

      lgd.li.push({
        "x": d.x,
        "y": d.y,
        "y1": y1,
        "y2": d.y - y1, // (y - y')
        "y3": y3,
        "y4": y4
      });

    }

    lgd.sy = sy;
    lgd.sy1 = sy1;
    lgd.sy3 = sy3;
    lgd.sy4 = sy4;
    lgd.sy5 = sy5;
    lgd.rn = sy4 / data.values.n; // Sum(y' - overline y)^2 / n
    lgd.rd = sy5 / data.values.n; // Sum(y' - overline y)^2 / n + Sum(y - y')^2
    lgd.r2 = lgd.rn / lgd.rd;

    console.log("GoodnessData " + type + ": " + JSON.stringify(lgd));

    return lgd;
  }
}


