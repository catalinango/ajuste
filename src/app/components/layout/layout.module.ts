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
import { LinealComponent } from '../lineal/lineal.component';
import { LinearPlotComponent } from '../linear-plot/linear-plot.component';
import { AutofocusDirective } from '../../directives/autofocus.directive';
import { LinearComponent } from '../../components/linear/linear.component';
import { PolynomialComponent } from '../../components/polynomial/polynomial.component';

@NgModule({
  declarations: [
    HeaderComponent, SidebarComponent, 
    FooterComponent, HomeComponent,
    LinealComponent, LinearPlotComponent,
    LinearComponent, PolynomialComponent, 
    AutofocusDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    FormsModule, ReactiveFormsModule,
    MatProgressSpinnerModule,
    MathModule
  ],
  exports: [
    HeaderComponent, SidebarComponent,
    FooterComponent, HomeComponent,
    LinealComponent, LinearPlotComponent,
    LinearComponent
  ]
})
export class LayoutModule { }
