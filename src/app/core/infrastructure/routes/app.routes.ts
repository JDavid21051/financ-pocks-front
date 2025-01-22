import {Routes} from '@angular/router';
import {authenticationGuard} from '@core/infrastructure/guards/auth.guard';

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
        loadComponent: () => import('@modules/auth/container/auth-login'),
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
        loadComponent: () => import('@modules/home/presentation/home-page'),
        canActivate: [authenticationGuard],
      },
      {
        path: 'entities',
        loadComponent: () => import('@modules/entities/container/container-entities-list'),
      },
      {
        path: 'savings',
        loadComponent: () => import('@modules/savings/container/container-savings-list'),
      },
      {
        path: 'accounts',
        loadComponent: () => import('../../../modules/accounts/container/container-accounts-list'),
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
    pathMatch: 'full',
  },
];
