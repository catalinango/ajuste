import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LinealComponent } from '../lineal/lineal.component';

export const LayoutRoutes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'lineal',  component: LinealComponent }
]