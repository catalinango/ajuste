import { Injectable } from '@angular/core';
import { Dot } from '../components/dot';

@Injectable({
  providedIn: 'root'
})

export class RegressionService {
  
  private dots: Dot[];

  constructor() { }

  getDots(): Dot[] {
    return this.dots;
  }

  setDots(d: Dot[]) {
    this.dots = d;
  }
}
