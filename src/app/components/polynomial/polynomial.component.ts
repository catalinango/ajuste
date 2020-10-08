import { Component, OnInit, OnDestroy} from '@angular/core';
import { Dot } from "../dot";
import { DataService } from 'src/app/services/data.service';
import { NonLinearData } from '../non-linear-data';

@Component({
  selector: 'app-polynomial',
  templateUrl: './polynomial.component.html',
  styleUrls: ['./polynomial.component.scss']
})
export class PolynomialComponent implements OnInit, OnDestroy {
  
  noDots: boolean;
  errMsg: string;
  dots: Dot[];
  data: NonLinearData;
  dt: string;
  
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
      
      if (ds === undefined || ds.length < 1) {
        this.noDots = true;
        console.log("ds undefined")
      }
      else {
        this.data = new NonLinearData();
        this.dataService.getPolynomialData(ds).subscribe(
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
        console.log("Dots in Polynomial: " + JSON.stringify(ds));
      }
    }
    
    ngOnDestroy(){
      
    }
  
  }