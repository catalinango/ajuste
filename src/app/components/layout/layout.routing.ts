import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LinearComponent } from '../linear/linear.component';
import { PolynomialComponent } from '../polynomial/polynomial.component';

export const LayoutRoutes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'lineal',  component: LinearComponent },
    { path: 'polinomico', component: PolynomialComponent }
]