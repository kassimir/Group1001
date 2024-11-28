import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ShipsPageComponent } from './pages/ships-page/ships-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ships', component: ShipsPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
