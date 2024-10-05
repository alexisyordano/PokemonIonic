import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'pokemon-details/:index',
    loadComponent: () =>
      import('./pokemon-details/pokemon-details.page').then(
        (m) => m.PokemonDetailsPage
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
