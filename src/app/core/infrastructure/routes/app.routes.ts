import {Routes} from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'example',
    loadComponent: () => import('../../../example/example.component').then((c) => c.ExampleComponent),
    title: 'Example',
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
        loadComponent: () => import('../../../modules/home/presentation/home-page'),
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
