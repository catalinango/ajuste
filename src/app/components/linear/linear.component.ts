import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dot } from "../dot";
import { DataService } from 'src/app/services/data.service';
import { LinearData } from "../linear-data";

@Component({
  selector: 'app-linear',
  templateUrl: './linear.component.html',
  styleUrls: ['./linear.component.scss']
})
export class LinearComponent implements OnInit, OnDestroy {

  noDots: boolean;
  errMsg: string;
  dots: Dot[];
  data: LinearData;
  dt: string;

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
      this.data = new LinearData();
      this.dataService.getLinearData(ds).subscribe(
        d => {
          this.data = d;
          console.log( JSON.stringify(d));
        },
        err => {
          this.errMsg = err;
        }
      );

      this.dots = ds;
      this.dt = JSON.stringify(this.data);
      console.log("Dots in Linear: " + JSON.stringify(ds));
    }
  }

  ngOnDestroy() { }
}
