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

  ca1: string;
  ca2: string;
  cxi: string;
  csx: string;
  csx2: string;
  csy: string;
  csxy: string;
  data: any;
  fx: string;

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
    let sx = 0;
    let sx2 = 0;
    let sy = 0;
    let sxy = 0;
    let a1 = 0;
    let a2 = 0;

    dots.forEach(d => {
      d.x = Number(d.x);
      d.y = Number(d.y);
      sx = sx + d.x;
      sx2 = sx2 + (d.x * d.x);
      sy = sy + d.y;
      sxy = sxy + (d.x * d.y);
    });

    if (this.dotsNum == 0 || sx == 0) {
      a1 = 0;
      a2 = 0;
    } else {
      let aux = (sx2 - ((sx * sx) / this.dotsNum));
      a2 = (sxy - ((sx * sy) / this.dotsNum)) / aux;
      a1 = (sy - (sx * a2)) / this.dotsNum;
      this.ca2 = a2.toFixed(3);
      this.ca1 = a1.toFixed(3);
      this.csx = sx.toFixed(3);
      this.csx2 = sx.toFixed(3);
      this.csy = sy.toFixed(3);
      this.csxy = sxy.toFixed(3);
      this.fx = this.ca2 + "x + " + this.ca1; 
    }
    
    let dt = [];
    dots.forEach(d => {
      dt.push({
        "yhat": ((a2 * d.x) + a1),
        "y": d.y,
        "x": d.x
      });
    });

    console.log("A1 = " + this.ca1 + "; A2 = " + this.ca2);
    this.data = JSON.stringify(dt);
    console.log("Data in LinearComponent: " + JSON.stringify(dt));
    this.showChart = true;
  }
}
