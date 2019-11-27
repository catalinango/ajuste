import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinealComponent } from './lineal.component';

describe('LinealComponent', () => {
  let component: LinealComponent;
  let fixture: ComponentFixture<LinealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
