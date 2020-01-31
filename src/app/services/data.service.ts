import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Dot } from '../components/dot';
import { Data } from "../components/data";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  dots: Dot[];
  data: Data;
  dotsBSubject: BehaviorSubject<Dot[]>;
  dataBSubject: BehaviorSubject<Data>;
  n = 0;
  sx = 0;
  sx2 = 0;
  sy = 0;
  syx = 0;
  a1 = 0;
  a2 = 0;

  ca2: string;
  ca1: string;
  csx: string;
  csx2: string;
  csy: string;
  csyx: string;
  fx: string;

  constructor() {
    this.dotsBSubject = new BehaviorSubject<Dot[]>(this.dots);
  }

  public getDots(): Observable<Dot[]> {
   return this.dotsBSubject.asObservable();
   // return throwError(new Error('Probando algun mensaje de ERROR'));
  }

  public setDots(d: Dot[]) {
    this.dotsBSubject = new BehaviorSubject<Dot[]>(d);
  }

  public getLinearData(d: Dot[]): Observable<Data> {
    this.n = Number(d.length);
    this.data = new Data();
    this.data.scatterDots = new Array();
    this.data.lineDots = new Array();

    d.forEach(d => {
      d.x = Number(d.x);
      d.y = Number(d.y);
      this.sx = this.sx + d.x;
      this.sx2 = this.sx2 + (d.x * d.x);
      this.sy = this.sy + d.y;
      this.syx = this.syx + (d.x * d.y);
    });
    
    if (this.n != 0 || this.sx != 0) {
      let aux = (this.sx2 - ((this.sx * this.sx) / this.n));
      this.a2 = (this.syx - ((this.sx * this.sy) / this.n)) / aux;
      this.a1 = (this.sy - (this.sx * this.a2)) / this.n;
      this.ca2 = this.a2.toFixed(3);
      this.ca1 = this.a1.toFixed(3);
      this.csx = this.sx.toFixed(3);
      this.csx2 = this.sx2.toFixed(3);
      this.csy = this.sy.toFixed(3);
      this.csyx = this.syx.toFixed(3);
      this.fx = this.ca2 + "x + " + this.ca1; 
    }
    
    d.forEach(d => {
      this.data.scatterDots.push({
        "x": d.x,
        "y": d.y
      });
      this.data.lineDots.push({
        "x": d.x,
        "y": ((this.a2 * d.x) + this.a1),
      });
    });

    this.data.fx = this.fx;
    this.data.values =  {
      "n": this.n,
      "ca1": this.ca1,
      "ca2": this.ca2,
      "csx": this.csx,
      "csx2":this.csx2,
      "csy": this.csy,
      "csyx":this.csyx
    }

    this.dataBSubject = new BehaviorSubject<Data>(this.data);

    return this.dataBSubject.asObservable();
  }
}
