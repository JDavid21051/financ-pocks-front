import {Routes} from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadComponent: () => import('@modules/main/containers/main-container'),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'prefix',
      },
      {
        path: 'home',
        loadComponent: () => import('@modules/main/presentation/home'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
