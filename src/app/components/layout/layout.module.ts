import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { LayoutRoutes } from './layout.routing';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { LinealComponent } from '../lineal/lineal.component';

@NgModule({
  declarations: [
    HeaderComponent, SidebarComponent, 
    FooterComponent, HomeComponent,
    LinealComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
  ],
  exports: [
    HeaderComponent, SidebarComponent,
    FooterComponent, HomeComponent,
    LinealComponent
  ]
})
export class LayoutModule { }