import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withRouterConfig} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {APP_ROUTES} from '@core/infa/routes/app.routes';
import {provideTranslateService, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(
        APP_ROUTES,
        withRouterConfig({paramsInheritanceStrategy: 'always', onSameUrlNavigation: 'reload'}),
      ),
      provideAnimations(),
      provideZoneChangeDetection({eventCoalescing: true}),
      provideRouter(routes),
      provideHttpClient(),
      provideTranslateService({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'en',
      }),
    ],
  }
;
