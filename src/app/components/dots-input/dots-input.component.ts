import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Dot } from "../dot";
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-dots-input',
  templateUrl: './dots-input.component.html',
  styleUrls: ['./dots-input.component.scss']
})
export class DotsInputComponent implements OnInit {

  dotsSet: Dot[] =
    [
      { "x": 2, "y": 3 },
      { "x": 4, "y": 2 },
      { "x": 5, "y": 10 },
      { "x": 8, "y": 11 },
      { "x": 11, "y": 9 }
    ];
  showTable = false;
  noDots: boolean;
  n: number;
  dots: Dot[];
  errMsg: string;
  @Output() emitEvent: EventEmitter<Dot[]> = new EventEmitter<Dot[]>();
  @ViewChild('dform') dFormDirective: NgForm;
  dotsForm: FormGroup;
  formErrors = {
    'x': '',
    'y': ''
  };
  validationMessages = {
    'x': {
      'required': 'Debe ingresar un valor para x',
      'pattern': 'Ingrese un valor numérico'
    },
    'y': {
      'required': 'Debe ingresar un valor para y',
      'pattern': 'Ingrese un valor numérico'
    }
  };
  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit() {
    let ds = new Array<Dot>();
    this.dataService.getDots()
      .subscribe(
        d => {
          ds = d;
        },
        err => {
          this.errMsg = err;
        });

    ds = this.dots;
    if (ds === undefined) {
      this.dots = new Array<Dot>()
      this.createForm();
    } else {
      this.dots = ds;
      this.showTable = true;
      this.createForm();
    }
    this.dataService.setDots(this.dots);
  }

  createForm() {
    this.dotsForm = this.fb.group({
      x: [0, [Validators.required, Validators.pattern(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?$/)]],
      y: [0, [Validators.required, Validators.pattern(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?$/)]],
    });
    this.dotsForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  saveDot() {
    let d = { x: this.dotsForm.controls.x.value, y: this.dotsForm.controls.y.value }
    d.x = Number(d.x.toString().replace(/,/g, '.'));
    d.y = Number(d.y.toString().replace(/,/g, '.'));
    this.dots.push(d);
    this.showTable = true;
    this.dFormDirective.reset({ x: 0, y: 0 });
    this.dataService.setDots(this.dots);
    this.dataService.getDots().subscribe(d => console.log("Dots in DataService: " + JSON.stringify(d)));
  }

  deleteDots() {
    this.dots = new Array<Dot>();
    this.dFormDirective.reset({ x: 0, y: 0 });
    this.showTable = false;
    this.dataService.setDots(this.dots);
  }

  onValueChanged(data?: any) {
    if (!this.dotsForm) {
      return;
    }
    const form = this.dotsForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && control.invalid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  loadDotsSet() {
    console.log("click");
    this.dots = new Array<Dot>();
    this.dots = this.dotsSet;
    this.showTable = true;
    this.dFormDirective.reset({ x: 0, y: 0 });
    this.dataService.setDots(this.dots);
    this.dataService.getDots().subscribe(d => console.log("Dots in DataService: " + JSON.stringify(d)));
  }

  dotEdit(index: number) {
    console.log("i = " + index);
    this.dFormDirective.reset({ x: this.dots[index].x, y: this.dots[index].y });
    if (index > -1) {
      this.dots.splice(index, 1);
    }
    this.dataService.setDots(this.dots);
    this.dataService.getDots().subscribe(d => console.log("Dots in DataService: " + JSON.stringify(d)));
  }
}