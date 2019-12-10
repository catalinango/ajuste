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
import { LinearPlotDirective } from 'src/app/directives/linear-plot.directive';

@NgModule({
  declarations: [
    HeaderComponent, SidebarComponent, 
    FooterComponent, HomeComponent,
    LinealComponent, LinearPlotComponent,
    LinearPlotDirective
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
    LinealComponent
  ]
})
export class LayoutModule { }
