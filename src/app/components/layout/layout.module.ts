import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LayoutRoutes } from './layout.routing';

import { MathModule } from 'src/app/math/math.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { LinearPlotComponent } from '../linear-plot/linear-plot.component';
import { AutofocusDirective } from '../../directives/autofocus.directive';
import { DotsInputComponent } from '../../components/dots-input/dots-input.component';
import { LinearComponent } from '../../components/linear/linear.component';
import { PolynomialComponent } from '../../components/polynomial/polynomial.component';
import { ExponentialComponent } from '../../components/exponential/exponential.component';
import { PotentialComponent } from '../../components/potential/potential.component';
import { GoodnessOfFitComponent } from '../../components/goodness-of-fit/goodness-of-fit.component';

@NgModule({
  declarations: [ 
    AutofocusDirective, HeaderComponent, 
    SidebarComponent, FooterComponent,
    HomeComponent, DotsInputComponent, 
    LinearPlotComponent, LinearComponent, 
    PolynomialComponent, ExponentialComponent,
    PotentialComponent, GoodnessOfFitComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    FormsModule, ReactiveFormsModule,
    MatProgressSpinnerModule,
    MathModule
  ],
  exports: [
    AutofocusDirective, HeaderComponent, 
    SidebarComponent, FooterComponent,
    HomeComponent, DotsInputComponent, 
    LinearPlotComponent, LinearComponent, 
    PolynomialComponent, ExponentialComponent,
    PotentialComponent, GoodnessOfFitComponent
  ]
})
export class LayoutModule { }
