import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import {ShipsPageComponent} from './pages/ships-page/ships-page.component';

export const routes: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'ships', component: ShipsPageComponent }
];
