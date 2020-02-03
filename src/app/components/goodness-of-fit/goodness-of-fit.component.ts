import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dot } from '../dot';
import { DataService } from 'src/app/services/data.service';
import { LinearData } from '../linear-data';
import { NonLinearData } from '../non-linear-data';
import { GoodnessData } from '../goodness-data';

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
  linearData: LinearData;
  polynomialData: NonLinearData;
  exponentialData: LinearData;
  potentialData: LinearData;
  quotientData: LinearData;
  linearGD : GoodnessData;
  polynomialGD : GoodnessData;
  exponentialGD: GoodnessData;
  potentialGD: GoodnessData;
  quotientGD: GoodnessData;
  
  constructor(private dataService: DataService) { }
  
  ngOnInit() {
    
    let ds = new Array<Dot>();
    
    this.dataService.getDots().subscribe( d => { ds = d }, err => { this.errMsg = err; });
    
    if (ds === undefined) { this.noDots = true; }
    else {
      console.log("Dots in Linear: " + JSON.stringify(ds));
      this.dots = ds;
      this.n = Number(this.dots.length);
      
      this.dataService.getLinearData(this.dots)
      .subscribe(
        dt => { 
          this.linearData = dt;
          this.linearGD = this.goodnessOfFit(this.linearData, "linear");
        },
        err => { this.errMsg = err; });          
        // console.log("Linear Data " + JSON.stringify(this.linearData));
        
        this.dataService.getPolynomialData(this.dots)
        .subscribe(
          dt => { 
            this.polynomialData = dt;
            this.polynomialGD = this.goodnessOfFit(this.polynomialData, "polynomial");
          },
          err => { this.errMsg = err; });          
          // console.log("Polynomial Data " + JSON.stringify(this.polynomialData));
          
          this.dataService.getExponentialData(this.dots)
          .subscribe(
            dt => { 
              this.exponentialData = dt;
              this.exponentialGD = this.goodnessOfFit(this.exponentialData, "exponential");
            },
            err => { this.errMsg = err; });          
            // console.log("Exponential Data " + JSON.stringify(this.exponentialData));
            
            this.dataService.getPotentialData(this.dots)
            .subscribe(
              dt => { 
                this.potentialData = dt;
                this.potentialGD = this.goodnessOfFit(this.potentialData, "potential");
              },
              err => { this.errMsg = err; });          
              // console.log("Potential Data " + JSON.stringify(this.potentialData));
              
              this.dataService.getQuotientData(this.dots)
              .subscribe(
                dt => { 
                  this.quotientData = dt;
                  this.quotientGD = this.goodnessOfFit(this.quotientData, "quotient");
                },
                err => { this.errMsg = err; });          
                // console.log("Quotient Data " + JSON.stringify(this.quotientData));           
                
                console.log(JSON.stringify(this.exponentialData));
              }
              
             
            }
            
            ngOnDestroy(){ }
            
            goodnessOfFit(data:any, type: string): GoodnessData {
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
                y3 = (d.y - y1)**2;
                y4 = (y1 - yo)**2;
                y5 = (d.y - yo)**2;
                sy1 = sy1 + y1;
                sy3 = sy3 + y3;
                sy4 = sy4 + y4;
                sy5 = sy5 + y5;
                
                lgd.li.push({ 
                  "x" : d.x,
                  "y" : d.y,
                  "y1" : y1,
                  "y2" : d.y - y1, // (y - y')
                  "y3" : y3,
                  "y4" : y4
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
          