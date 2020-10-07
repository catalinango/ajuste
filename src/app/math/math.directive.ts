import { Directive, OnDestroy, OnInit, OnChanges, Input, ElementRef, SimpleChanges } from '@angular/core';
import { MathImplService } from './math-impl.service';
import { Subject } from 'rxjs';
import { take, takeUntil } from "rxjs/operators";
import { MathContent } from './math-content';

@Directive({
  selector: '[appMath]'
})
export class MathDirective implements OnInit, OnChanges, OnDestroy{
  private alive$ = new Subject<boolean>();

  @Input()
  private appMath: MathContent;
  private readonly _el: HTMLElement;

  constructor(
    private service: MathImplService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.service
      .ready()
      .pipe(
        take(1),
        takeUntil(this.alive$)
      ).subscribe(res => {
        this.service.render(this._el, this.appMath);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnDestroy(): void {
    this.alive$.next(false);
  }
}
