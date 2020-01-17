import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Dot } from '../components/dot';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dots: Dot[];
  dotsBSubject: BehaviorSubject<Dot[]>;

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
}
