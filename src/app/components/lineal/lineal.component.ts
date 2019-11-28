import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";

interface Dot { x: number; y: number; }

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
  @ViewChild('dform', {static: false}) dFormDirective: NgForm; 
  dotsForm: FormGroup;
  formErrors = {
    'dotsNumber': ''   
  };
  validationMessages = {
    'author': {
      'required': 'Debe ingresar la cantidad de puntos'
    }
  };

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

  generateTable(){
    this.dots.push(this.dotsForm.value);
    this.showTable = true;
  }

  deleteTable(){
    this.dots = new Array<Dot>();
    this.showTable = false;
    this.showChart = false;
  }

  workOut(){
    this.showSppiner = true;
    this.dotsNum = this.dots.length;
 
    this.showChart = true;
    this.showSppiner = false;
  }
}
