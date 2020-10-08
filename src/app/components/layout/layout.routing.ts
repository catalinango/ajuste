import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DotsInputComponent } from '../dots-input/dots-input.component';
import { LinearComponent } from '../linear/linear.component';
import { PolynomialComponent } from '../polynomial/polynomial.component';
import { ExponentialComponent } from '../exponential/exponential.component';
import { PotentialComponent } from '../potential/potential.component';
import { QuotientComponent } from '../quotient/quotient.component';
import { GoodnessOfFitComponent } from '../goodness-of-fit/goodness-of-fit.component';
import { LinearGofComponent } from '../linear-gof/linear-gof.component';

export const LayoutRoutes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'puntos', component: DotsInputComponent},
    { path: 'lineal',  component: LinearComponent },
    { path: 'polinomico', component: PolynomialComponent },
    { path: 'exponencial', component: ExponentialComponent },
    { path: 'potencial', component: PotentialComponent },
    { path: 'cociente', component: QuotientComponent },
    { path: 'bondad', component: GoodnessOfFitComponent },
    { path: 'bondad-lineal', component: LinearGofComponent}
]