import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { Dot } from "../dot";

@Component({
  selector: 'app-lineal',
  templateUrl: './lineal.component.html',
  styleUrls: ['./lineal.component.scss']
})
export class LinealComponent implements OnInit {

  showTable = false;
  showChart = false;
  showSppiner = false;

  dots: Dot[];
  dotsNum: number;
  @ViewChild('dform', { static: false }) dFormDirective: NgForm;
  dotsForm: FormGroup;
  formErrors = {
    'dotsNumber': ''
  };
  validationMessages = {
    'author': {
      'required': 'Debe ingresar la cantidad de puntos'
    }
  };

  a1: number;
  ca1: string;
  a2: number;
  ca2: string;
  xi: number;
  sx: number;
  sx2: number;
  sy: number;
  sxy: number;
  data: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dots = new Array<Dot>();
    this.dotsForm = this.fb.group({
      x: [0, Validators.required],
      y: [0, Validators.required],
    });
  }

  generateTable() {
    this.dots.push(this.dotsForm.value);
    this.showTable = true;
    this.dFormDirective.reset({x: 0, y: 0});
  
  }

  deleteTable() {
    this.dots = new Array<Dot>();
    this.dFormDirective.reset({x: 0, y: 0});
    this.showTable = false;
    this.showChart = false;
  }

  workOut() {
    this.linearRegression(this.dots);
    this.showSppiner = false;
  }

  linearRegression(dots: Dot[]) {
    this.showSppiner = true;
    this.dotsNum = Number(dots.length);
    this.sx = 0;
    this.sx2 = 0;
    this.sy = 0;
    this.sxy = 0;
 
    dots.forEach(d => {
      d.x = Number(d.x);
      d.y = Number(d.y);
      this.sx = this.sx + d.x;
      this.sx2 = this.sx2 + (d.x * d.x);
      this.sy = this.sy + d.y;
      this.sxy = this.sxy + (d.x * d.y);
    });

    if (this.dotsNum == 0 || this.sx == 0) {
      this.a1 = 0;
      this.a2 = 0;
    } else {
      let aux = (this.sx2 - ((this.sx * this.sx) / this.dotsNum));
      this.a2 = (this.sxy - ((this.sx * this.sy) / this.dotsNum)) / aux;
      this.a1 = (this.sy - (this.sx * this.a2)) / this.dotsNum;
      this.ca2 = this.a2.toFixed(3);
      this.ca1 = this.a1.toFixed(3);
    }
  
    
    let dt = [];
    dots.forEach(d => {
      dt.push({
        "yhat": ((this.a2 * d.x) + this.a1),
        "y": d.y,
        "x": d.x
      });
    //  console.log("f(x): (" + this.a2 + " * " + d.x + ") + " + this.a1);
    });

    console.log("A1 = " + this.a1 + "; A2 = " + this.a2);
    this.data = JSON.stringify(dt);
    console.log("Data in LinearComponent: " + JSON.stringify(dt));
    this.showChart = true;
  }
}
