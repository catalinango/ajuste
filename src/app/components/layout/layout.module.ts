import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LayoutRoutes } from './layout.routing';

import { MathModule } from 'src/app/math/math.module';
import { AutofocusDirective } from '../../directives/autofocus.directive';

import { HomeComponent } from '../home/home.component';
import { PlotComponent } from '../plot/plot.component';
import { DotsInputComponent } from '../../components/dots-input/dots-input.component';
import { LinearComponent } from '../../components/linear/linear.component';
import { PolynomialComponent } from '../../components/polynomial/polynomial.component';
import { ExponentialComponent } from '../../components/exponential/exponential.component';
import { PotentialComponent } from '../../components/potential/potential.component';
import { QuotientComponent } from '../quotient/quotient.component';
import { GoodnessOfFitComponent } from '../../components/goodness-of-fit/goodness-of-fit.component';
import { ErrorComponent } from '../error/error.component';
import { LinearGofComponent } from '../linear-gof/linear-gof.component';
import { GofAllComponent } from '../gof-all/gof-all.component';

@NgModule({
  declarations: [ 
    AutofocusDirective, 
    HomeComponent, DotsInputComponent, 
    PlotComponent, LinearComponent, 
    PolynomialComponent, ExponentialComponent,
    PotentialComponent, QuotientComponent,
    GoodnessOfFitComponent, ErrorComponent,
    LinearGofComponent, GofAllComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    FormsModule, ReactiveFormsModule,
    MatProgressSpinnerModule,
    MathModule
  ],
  exports: [
    AutofocusDirective, 
    HomeComponent, DotsInputComponent, 
    PlotComponent, LinearComponent, 
    PolynomialComponent, ExponentialComponent,
    PotentialComponent, QuotientComponent,
    GoodnessOfFitComponent, ErrorComponent, 
    LinearGofComponent, GofAllComponent
  ]
})
export class LayoutModule { }
