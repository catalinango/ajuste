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
  
  dots: Dot[] = 
  [
    { "x": 0, "y": 1.2},
    { "x": 1, "y": 0.5},
    { "x": 2, "y": 2},
    { "x": 3, "y": 1.8},
    { "x": 4, "y": 1.2},
    { "x": 5, "y": 3.6},
  ];
  showTable = false;
  noDots: boolean;
  n: number;
  //dots: Dot[];
  errMsg: string;
  @Output() emitEvent: EventEmitter<Dot[]> = new EventEmitter<Dot[]>();
  @ViewChild('dform', { static: false }) dFormDirective: NgForm;
  dotsForm: FormGroup;
  formErrors = {
    'x': '',
    'y': ''
  };
  validationMessages = {
    'x': {
      'required': 'Debe ingresar un valor para x',
    },
    'y': {
      'required': 'Debe ingresar un valor para y',
    }
  };
  constructor(
    private fb: FormBuilder,
    private dataService: DataService
    ) { }
    
    ngOnInit() {
      let ds = new Array<Dot>();
      /*  this.dataService.getDots()
      .subscribe(
        d => {
          ds = d;
        },
        err => {
          this.errMsg = err;
        });
        */
        ds = this.dots;
        if(ds === undefined) {
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
          x: [0, Validators.required],
          y: [0, Validators.required],
        });
        this.dotsForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
      }
      
      saveDots() {
        this.dots.push(this.dotsForm.value);
        this.showTable = true;
        this.dFormDirective.reset({ x: 0, y: 0 });
        this.dataService.setDots(this.dots);
        //this.dataService.getDots().subscribe(d => console.log("Dots in DataService: " + JSON.stringify(d)));
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
    }
    /*
    this.dishService.putDish(this.dishcopy)
    .subscribe(
      dish => {
        this.dish = dish;
        this.dishcopy = dish;
      },
      errMsg => {
        this.dish = null;
        this.dishcopy = null;
        this.errMsg = <any>errMsg;
      });
      this.commentFormDirective.resetForm({
        author: '',
        comment: '',
        rating: '5'
      });*/