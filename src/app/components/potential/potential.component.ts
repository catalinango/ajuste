import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dot } from "../dot";
import { DataService } from 'src/app/services/data.service';
import { LinearData } from '../linear-data';

@Component({
  selector: 'app-potential',
  templateUrl: './potential.component.html',
  styleUrls: ['./potential.component.scss']
})
export class PotentialComponent implements OnInit, OnDestroy {;
  
  noDots: boolean;
  errMsg: string;
  dots: Dot[];
  data: LinearData;
  dt: string;
  lna1: number;
  
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
      
      if (ds === undefined || ds.length < 1) {
        this.noDots = true;
      }
      else {
        this.data = new LinearData();
        this.dataService.getPotentialData(ds).subscribe(
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
        this.lna1 = Math.log(this.data.values.a1);
        console.log("Dots in Potential: " + JSON.stringify(ds));
      }
    }
    
    ngOnDestroy(){ }
  }