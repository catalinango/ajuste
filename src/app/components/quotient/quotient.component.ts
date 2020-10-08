import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dot } from "../dot";
import { DataService } from 'src/app/services/data.service';
import { LinearData } from '../linear-data';


@Component({
  selector: 'app-quotient',
  templateUrl: './quotient.component.html',
  styleUrls: ['./quotient.component.scss']
})
export class QuotientComponent implements OnInit {
  
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
      
      if (ds === undefined || ds.length < 1) {
        this.noDots = true;
      }
      else {
        this.data = new LinearData();
        this.dataService.getQuotientData(ds).subscribe(
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
        console.log("Dots in Quotient: " + JSON.stringify(ds));
      }
    }
    
    ngOnDestroy(){ }
  }