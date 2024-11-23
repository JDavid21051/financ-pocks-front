import {Routes} from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'prefix',
      },
      {
        path: 'login',
        loadComponent: () => import('../../../modules/auth/container/auth-login'),
        title: 'Iniciar sesión',
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
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
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'prefix',
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
