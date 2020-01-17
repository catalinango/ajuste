import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LayoutRoutes } from './layout.routing';

import { MathModule } from 'src/app/math/math.module';
import { AutofocusDirective } from '../../directives/autofocus.directive';

import { HomeComponent } from '../home/home.component';
import { InfoComponent } from '../../components/info/info.component';
import { DocsComponent } from '../../components/docs/docs.component';
import { LinearPlotComponent } from '../linear-plot/linear-plot.component';
import { DotsInputComponent } from '../../components/dots-input/dots-input.component';
import { LinearComponent } from '../../components/linear/linear.component';
import { PolynomialComponent } from '../../components/polynomial/polynomial.component';
import { ExponentialComponent } from '../../components/exponential/exponential.component';
import { PotentialComponent } from '../../components/potential/potential.component';
import { GoodnessOfFitComponent } from '../../components/goodness-of-fit/goodness-of-fit.component';
import { ErrorComponent } from '../error/error.component';

@NgModule({
  declarations: [ 
    AutofocusDirective, DocsComponent, 
    HomeComponent, DotsInputComponent, 
    LinearPlotComponent, LinearComponent, 
    PolynomialComponent, ExponentialComponent,
    PotentialComponent, GoodnessOfFitComponent,
    InfoComponent, ErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    FormsModule, ReactiveFormsModule,
    MatProgressSpinnerModule,
    MathModule
  ],
  exports: [
    AutofocusDirective, DocsComponent, 
    HomeComponent, DotsInputComponent, 
    LinearPlotComponent, LinearComponent, 
    PolynomialComponent, ExponentialComponent,
    PotentialComponent, GoodnessOfFitComponent,
    InfoComponent, ErrorComponent
  ]
})
export class LayoutModule { }
