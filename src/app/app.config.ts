import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withRouterConfig} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import {APP_ROUTES} from '@core/infrastructure/routes/app.routes';
import {provideTranslateService, TranslateLoader} from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import {provideAuth} from '@core/infrastructure/provide/auth.provide';
import {authInterceptor} from '@core/infrastructure/interceptors/auth.interceptor';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');


export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(
        APP_ROUTES,
        withRouterConfig({paramsInheritanceStrategy: 'always', onSameUrlNavigation: 'reload'}),
      ),
      provideZoneChangeDetection({eventCoalescing: true}),
      provideHttpClient(withInterceptors([authInterceptor])),
      provideAnimations(),
      provideTranslateService({
        loader: {
          provide: TranslateLoader,
          useFactory: (httpLoaderFactory),
          deps: [HttpClient],
        },
        defaultLanguage: 'es',
      }),
      {
        provide: LOCALE_ID,
        useValue: 'es-CO',
      },
      provideAuth({
        redirectUri: 'main/home',
        returnTo: 'auth/login',
        snackbarDuration: 10,
        baseUrl: `${environment.apiUrl}api`
      }),
    ],
  }
;
