import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import * as d3 from "d3";
import { Dot } from '../../components/dot';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lineal',
  templateUrl: './lineal.component.html',
  styleUrls: ['./lineal.component.scss']
})
export class LinealComponent implements OnInit {

  showTable = false;
  showChart = false;
  showSppiner = false;
  dotsData: Observable<Dot[]>;
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

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.dots = new Array<Dot>();
    this.dotsForm = this.fb.group({
      x: [0, Validators.required],
      y: [0, Validators.required],
    });
  }
  ngAfterContentInit() {
    d3.select("#plot").style("color", "red");
  }

  generateTable() {
    this.dots.push(this.dotsForm.value);
    this.showTable = true;
  }

  deleteTable() {
    this.dots = new Array<Dot>();
    this.showTable = false;
    this.showChart = false;
  }

  workOut() {
    this.linearRegression(this.dots);
    this.showSppiner = false;
    this.showChart = true;
  }

  linearRegression(dots: Dot[]) {
    this.dotsData.subscribe(data => data = this.dots);
    this.showSppiner = true;
    this.dotsNum = dots.length;
    this.sx = 0;
    this.sx2 = 0;
    this.sy = 0
    this.sxy = 0;

    dots.forEach(d => {
      this.sx = this.sx + Number(d.x);
      this.sx2 = this.sx2 + (Number(d.x) * Number(d.x));
      this.sy = this.sy + Number(d.y);
      this.sxy = this.sxy + (Number(d.x) * Number(d.y));
      let aux = ((this.sx2 / this.sx) - (this.sx / this.dotsNum));
      if (this.dotsNum == 0 || this.sx == 0 || aux == 0) {
        this.a1 = 0;
        this.a2 = 0;
      } else {
        this.a2 = ((this.sxy / this.sx) - ((this.sy / this.dotsNum)) / aux);
        this.ca2 = this.a2.toFixed(2);
        this.a1 = (this.sy - (this.sx * this.a2)) / this.dotsNum;
        this.ca1 = this.a1.toFixed(2);
      }
    });
    console.log ("Dots in linealComponent: " + dots);
  }
}
