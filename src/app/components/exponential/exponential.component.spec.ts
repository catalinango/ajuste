import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExponentialComponent } from './exponential.component';

describe('ExponentialComponent', () => {
  let component: ExponentialComponent;
  let fixture: ComponentFixture<ExponentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExponentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExponentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
