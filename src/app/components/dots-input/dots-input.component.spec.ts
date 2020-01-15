import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotsInputComponent } from './dots-input.component';

describe('DotsInputComponent', () => {
  let component: DotsInputComponent;
  let fixture: ComponentFixture<DotsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
