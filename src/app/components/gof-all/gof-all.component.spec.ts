import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GofAllComponent } from './gof-all.component';

describe('GofAllComponent', () => {
  let component: GofAllComponent;
  let fixture: ComponentFixture<GofAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GofAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GofAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
