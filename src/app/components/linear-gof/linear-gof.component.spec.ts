import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearGofComponent } from './linear-gof.component';

describe('LinearGofComponent', () => {
  let component: LinearGofComponent;
  let fixture: ComponentFixture<LinearGofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinearGofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearGofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
