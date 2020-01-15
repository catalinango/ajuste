import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Dot } from "../dot";
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dots-input',
  templateUrl: './dots-input.component.html',
  styleUrls: ['./dots-input.component.scss']
})
export class DotsInputComponent implements OnInit {

  showTable = false;
  dotsNum: number;
  dots: Dot[];
  @Output() emitEvent: EventEmitter<Dot[]> = new EventEmitter<Dot[]>();
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
  constructor(
    private fb: FormBuilder,
    private dataService: DataService
    ) { }

  ngOnInit() {
    this.dots = new Array<Dot>();
    this.dotsForm = this.fb.group({
      x: [0, Validators.required],
      y: [0, Validators.required],
    });
    this.saveDots()
  }

  generateTable() {
    this.dots.push(this.dotsForm.value);
    this.showTable = true;
    this.dFormDirective.reset({ x: 0, y: 0 });

  }
  deleteTable() {
    this.dots = new Array<Dot>();
    this.dFormDirective.reset({ x: 0, y: 0 });
    this.showTable = false;
  }
  saveDots() {
    this.dataService.setDots(this.dots);
    this.dataService.getDots().subscribe(d => console.log("Dots in DataService: " + JSON.stringify(d)));
  /*  let fResponse: any;
    if (!this.dots) { fResponse = false } else { fResponse = this.dots };
    this.dots = fResponse;
    this.emitEvent.emit(fResponse);
    return fResponse;*/


  }
}
