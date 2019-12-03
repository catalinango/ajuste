import { Injectable } from '@angular/core';
import { Observer, ReplaySubject, Observable } from 'rxjs';
import { MathContent } from './math-content';

declare global {
  interface Window {
    hubReady: Observer<boolean>;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MathImplService {
  private readonly notifier: ReplaySubject<boolean>;
  
  constructor() { 
    this.notifier = new ReplaySubject<boolean>();
    window.hubReady = this.notifier;
  }
  
  ready(): Observable<boolean> {
    return this.notifier;
  }

  render(element: HTMLElement, math?: MathContent): void {
    if (math) {
      if (math.latex) {
        element.innerText = math.latex;
      } else {
        element.innerHTML = math.mathml;
      }
    }

    MathJax.Hub.Queue(['Typeset', MathJax.Hub, element]);
  }
}
