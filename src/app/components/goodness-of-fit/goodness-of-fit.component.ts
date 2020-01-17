import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dot } from '../dot';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-goodness-of-fit',
  templateUrl: './goodness-of-fit.component.html',
  styleUrls: ['./goodness-of-fit.component.scss']
})
export class GoodnessOfFitComponent implements OnInit, OnDestroy {
  
  noDots: boolean;
  errMsg: string;
  dots: Dot[];
  n: number;
  
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
    }
  }
  
  ngOnDestroy(){
    
  }
}
