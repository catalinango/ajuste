import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotientComponent } from './quotient.component';

describe('QuotientComponent', () => {
  let component: QuotientComponent;
  let fixture: ComponentFixture<QuotientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
