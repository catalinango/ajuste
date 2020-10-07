import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Dot } from '../components/dot';
import { LinearData } from "../components/linear-data";
import { NonLinearData } from "../components/non-linear-data";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  dots: Dot[];
  linearData: LinearData;
  nonLinearData: NonLinearData;
  dotsBSubject: BehaviorSubject<Dot[]>;
  ldataBSubject: BehaviorSubject<LinearData>;
  nldataBSubject: BehaviorSubject<NonLinearData>;
  
  constructor() {
    this.dotsBSubject = new BehaviorSubject<Dot[]>(this.dots);
  }
  
  public getDots(): Observable<Dot[]> {
    return this.dotsBSubject.asObservable();
    // return throwError(new Error('Probando algun mensaje de ERROR'));
  }
  
  public setDots(ds: Dot[]) {
    this.dotsBSubject = new BehaviorSubject<Dot[]>(ds);
  }
  
  public getLinearData(ds: Dot[]): Observable<LinearData> {
    
    this.linearData = new LinearData();
    this.linearData.scatterDots = new Array();
    this.linearData.lineDots = new Array();
    
    let n = Number(ds.length);
    let sx = 0;
    let sx2 = 0;
    let sy0 = 0;
    let sy = 0;
    let syx = 0;
    let a1 = 0;
    let a2 = 0;
    
    ds.forEach(d => {
      d.x = Number(d.x);
      d.y = Number(d.y);
      sy0 = sy0 + d.y;
      sx = sx + d.x;
      sx2 =sx2 + (d.x * d.x);
      sy = sy + d.y;
      syx =syx + (d.x * d.y);
    });
    
    if (n != 0 || sx != 0) {
      let aux = (sx2 - ((sx * sx) / n));
      a2 = (syx - ((sx * sy) / n)) / aux;
      a1 = (sy - (sx * a2)) / n;
      this.linearData.values =  {
        "n": n,
        "a1": Number(a1.toFixed(3)),
        "a2": Number(a2.toFixed(3)),
        "sx": Number(sx.toFixed(3)),
        "sx2":Number(sx2.toFixed(3)),
        "sy0":Number(sy0.toFixed(3)),
        "sy": Number(sy.toFixed(3)),
        "syx":Number(syx.toFixed(3))
      }
    }
    
    ds.forEach(d => {
      this.linearData.scatterDots.push({
        "x": d.x,
        "y": d.y
      });
      this.linearData.lineDots.push({
        "x": d.x,
        "y": ((a2 * d.x) + a1),
      });
    });    
    
    this.ldataBSubject = new BehaviorSubject<LinearData>(this.linearData);
    
    return this.ldataBSubject.asObservable();
  }
  
  public getPolynomialData(ds: Dot[]): Observable<NonLinearData> {
    this.nonLinearData = new NonLinearData();
    this.nonLinearData.scatterDots = new Array();
    this.nonLinearData.lineDots = new Array(); 
    let n = Number(ds.length);
    let sx = 0;
    let sx2 = 0;
    let sx3 = 0;
    let sx4 = 0;
    let sy0 = 0;
    let sy = 0;
    let syx = 0;
    let syx2 = 0;
    let a1 = 0;
    let a2 = 0;
    let a3 = 0; 

    ds.forEach(d => {
      d.x = Number(d.x);
      d.y = Number(d.y);
      sx = sx + d.x;
      sx2 = sx2 + (d.x ** 2);
      sx3 = sx3 + (d.x ** 3);
      sx4 = sx4 + (d.x ** 4);
      sy0 = sy0 + d.y;
      sy = sy + d.y;
      syx = syx + (d.y * d.x);
      syx2 = syx2 + (d.y * (d.x ** 2));
    });
    
    let delta = (n * (sx2 * sx4 - sx3 * sx3)) - (sx * (sx * sx4 - sx2 * sx3)) + (sx2 * (sx * sx3 - sx2 * sx2));
    if (delta != 0) {
      a1 = ((sy * (sx2 * sx4 - sx3 * sx3)) - (sx * (syx * sx4 - syx2 * sx3)) + (sx2 * (syx * sx3 - syx2 * sx2))) / delta;
      a2 = ((n * (syx * sx4 - syx2 * sx3)) - (sy * (sx * sx4 - sx2 * sx3)) + (sx2 * (sx * syx2 - sx2 * syx))) / delta;
      a3 = ((n * (sx2 * syx2 - sx3 * syx)) - (sx * (sx * syx2 - sx2 * syx)) + (sy * (sx * sx3 - sx2 * sx2))) / delta;
      
      this.nonLinearData.values =  {
        "n": n,
        "a1": Number(a1.toFixed(3)),
        "a2": Number(a2.toFixed(3)),
        "a3": Number(a2.toFixed(3)),
        "sx": Number(sx.toFixed(3)),
        "sx2":Number(sx2.toFixed(3)),
        "sx3": Number(sx3.toFixed(3)),
        "sx4": Number(sx4.toFixed(3)),
        "sy0":Number(sy0.toFixed(3)),
        "sy": Number(sy.toFixed(3)),
        "syx":Number(syx.toFixed(3)),
        "syx2":Number(syx2.toFixed(3))
      }

      ds.forEach(d => {
        this.nonLinearData.scatterDots.push({
          "x": d.x,
          "y": d.y
        });
        this.nonLinearData.lineDots.push({
          "x": d.x,
          "y": a3 * (d.x**2) + a2 * d.x + a1,
        });
      });
    }
   
    this.nldataBSubject = new BehaviorSubject<NonLinearData>(this.nonLinearData);

    return this.nldataBSubject.asObservable();
  }

  public getExponentialData(ds: Dot[]): Observable<LinearData> {
    this.linearData = new LinearData();
    this.linearData.scatterDots = new Array();
    this.linearData.lineDots = new Array();

    let n = Number(ds.length);
    let sx = 0;
    let sx2 = 0;
    let sy0 = 0;
    let sy = 0;
    let syx = 0;
    let a1 = 0;
    let a2 = 0;
    let auxA1 = 0;
    let auxA2 = 0;
    
    ds.forEach(d => {
      d.x = Number(d.x);
      d.y = Number(d.y);
      sy0 = sy0 + d.y;
      sx = sx + d.x;
      sx2 = sx2 + (d.x * d.x);
      sy = (d.y == 0) ? sy + 1 : sy + Math.log(d.y);
      syx = (d.y == 0 || d.x == 0) ? syx + 1 : syx + Math.log(d.y * d.x);
      //console.log("sy :" + sy + "; syx: " + syx);
    });
    
    if (sx != 0) {
      auxA2 = -n * sx2 / sx + sx;
    }
    
    if (auxA2 != 0) {
      a2 = (sy - n * syx / sx) / auxA2;
      auxA1 = (syx / sx) - (sx2 / sx * a2);
      a1 = Math.E ** auxA1;

      this.linearData.values =  {
        "n": n,
        "a1": Number(a1.toFixed(3)),
        "a2": Number(a2.toFixed(3)),
        "sx": Number(sx.toFixed(3)),
        "sx2":Number(sx2.toFixed(3)),
        "sy0":Number(sy0.toFixed(3)),
        "sy": Number(sy.toFixed(3)),
        "syx":Number(syx.toFixed(3))
      }
    }
    
     ds.forEach(d => {
      this.linearData.scatterDots.push({
        "x": d.x,
        "y": d.y
      });
      this.linearData.lineDots.push({
        "x": d.x,
        "y": a1 * Math.E ** (a2 * d.x),
      });
    });

    this.ldataBSubject = new BehaviorSubject<LinearData>(this.linearData);
    
    return this.ldataBSubject.asObservable();
  }

  public getPotentialData(ds: Dot[]): Observable<LinearData> {

    this.linearData = new LinearData();
    this.linearData.scatterDots = new Array();
    this.linearData.lineDots = new Array();
    
    let n = Number(ds.length);
    let sx = 0;
    let sx2 = 0;
    let sy0 = 0;
    let sy = 0;
    let syx = 0;
    let auxA1 = 0;
    let auxA2 = 0;
    let a1 = 0;
    let a2 = 0;
    ds.forEach(d => {
      d.x = Number(d.x);
      d.y = Number(d.y);
      sy0 = sy0 + d.y;
      sx = (d.x == 0) ? sx + 1 : sx + Math.log(d.x);
      sx2 = (d.x == 0) ? sx2 + 1 : sx2 + Math.log(d.x**2);
      sy = (d.y == 0) ? sy + 1 : sy + Math.log(d.y);
      syx = (d.y == 0 || d.x == 0) ? syx + 1 : syx +  (Math.log(d.y) * Math.log(d.x));
    });
    
    
    if (n != 0) {
      auxA2 = sx2 - sx ** 2 / n;
      if (auxA2 != 0){ 
        a2 = (syx - sx * sy / n) / auxA2;
        auxA1 = sy / n - sx * a2 / n;
        a1 = Math.E ** auxA1;
        this.linearData.values =  {
          "n": n,
          "a1": Number(a1.toFixed(3)),
          "a2": Number(a2.toFixed(3)),
          "sx": Number(sx.toFixed(3)),
          "sx2":Number(sx2.toFixed(3)),
          "sy0":Number(sy0.toFixed(3)),
          "sy": Number(sy.toFixed(3)),
          "syx":Number(syx.toFixed(3))
        }
      }  
    } 

    ds.forEach(d => {
      this.linearData.scatterDots.push({
        "x": d.x,
        "y": d.y
      });
      this.linearData.lineDots.push({
        "x": d.x,
        "y": a1 * (d.x ** a2),
      });
    });    
    
    this.ldataBSubject = new BehaviorSubject<LinearData>(this.linearData);
    
    return this.ldataBSubject.asObservable();
  }

  public getQuotientData(ds: Dot[]): Observable<LinearData> {
    this.linearData = new LinearData();
    this.linearData.scatterDots = new Array();
    this.linearData.lineDots = new Array();
    
    let n = Number(ds.length);
    let sx = 0;
    let sx2 = 0;
    let sy0 = 0;
    let sy = 0;
    let syx = 0;
    let a = 0;
    let b = 0;
   
    ds.forEach(d => {
      d.x = Number(d.x);
      d.y = Number(d.y);
      sy0 = sy0 + d.y;
      if (d.x != 0){
        sx = sx + (1 / d.x);
        sx2 = sx2 + ((1 / d.x)**2);
      }
      sy = (d.y != 0) ? (sy + (1 / d.y)) : 0;
      syx = (d.x != 0 && d.y != 0)?  (syx + ((1 / d.x) * (1 / d.y))): 0; 
    });
    
    if (sx != 0) {
      let delta = n * sx2 - sx * sx;
      if (delta != 0){
        a = (sy * sx2 - sx * syx) / delta;
        a = 1 / a;
        b = (n * syx - sy * sx) / delta;
        b = b * a;

        this.linearData.values =  {
          "n": n,
          "a1": Number(a.toFixed(3)),
          "a2": Number(b.toFixed(3)),
          "sx": Number(sx.toFixed(3)),
          "sx2":Number(sx2.toFixed(3)),
          "sy0":Number(sy0.toFixed(3)),
          "sy": Number(sy.toFixed(3)),
          "syx":Number(syx.toFixed(3))
        }
      } 
    }

    ds.forEach(d => {
      this.linearData.scatterDots.push({
        "x": d.x,
        "y": d.y
      });
      this.linearData.lineDots.push({
        "x": d.x,
          "y": ((a * d.x) / (d.x + b)),
      });
    });  

    this.ldataBSubject = new BehaviorSubject<LinearData>(this.linearData);
    
    return this.ldataBSubject.asObservable();
  
  }

}
