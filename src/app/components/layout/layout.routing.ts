import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DocsComponent } from '../docs/docs.component';
import { InfoComponent } from '../info/info.component';
import { DotsInputComponent } from '../dots-input/dots-input.component';
import { LinearComponent } from '../linear/linear.component';
import { PolynomialComponent } from '../polynomial/polynomial.component';
import { ExponentialComponent } from '../exponential/exponential.component';
import { PotentialComponent } from '../potential/potential.component';
import { GoodnessOfFitComponent } from '../goodness-of-fit/goodness-of-fit.component';

export const LayoutRoutes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'docs',  component: DocsComponent },
    { path: 'info',  component: InfoComponent },
    { path: 'puntos', component: DotsInputComponent},
    { path: 'lineal',  component: LinearComponent },
    { path: 'polinomico', component: PolynomialComponent },
    { path: 'exponencial', component: ExponentialComponent },
    { path: 'potencial', component: PotentialComponent },
    { path: 'bondad', component: GoodnessOfFitComponent }
]