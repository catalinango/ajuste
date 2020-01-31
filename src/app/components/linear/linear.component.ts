import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dot } from "../dot";
import { DataService } from 'src/app/services/data.service';
import { Data } from "../data";

@Component({
  selector: 'app-linear',
  templateUrl: './linear.component.html',
  styleUrls: ['./linear.component.scss']
})
export class LinearComponent implements OnInit, OnDestroy {

  noDots: boolean;
  errMsg: string;
  dots: Dot[];
  data: Data;
  dt: string;
  fx: string;
  plotType: string = "linear";

  constructor(
    private dataService: DataService
  ) { }

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
      this.data = new Data();
      this.dataService.getLinearData(ds).subscribe(
        d => {
          this.data = d;
          console.log( JSON.stringify(d));
        },
        err => {
          this.errMsg = err;
        }
      );
      this.dt = JSON.stringify(this.data);
      console.log("Dots in Linear: " + JSON.stringify(ds));
      this.dots = ds;
    }
  }

  ngOnDestroy() { }
}
