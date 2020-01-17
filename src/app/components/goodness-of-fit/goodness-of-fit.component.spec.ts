import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodnessOfFitComponent } from './goodness-of-fit.component';

describe('GoodnessOfFitComponent', () => {
  let component: GoodnessOfFitComponent;
  let fixture: ComponentFixture<GoodnessOfFitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodnessOfFitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodnessOfFitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
