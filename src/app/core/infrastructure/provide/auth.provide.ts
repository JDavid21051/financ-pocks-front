import {makeEnvironmentProviders} from '@angular/core';
import {AUTH_REDIRECT_URI} from '@core/infrastructure/token/auth-redirect.token';
import {AUTH_RETURN_TO} from '@core/infrastructure/token/auth-return-to.token';
import {AuthOptionsProviderType} from '@core/domain/types/auth-options-provider.type';
import {SNACKBAR_DURATION} from '@core/infrastructure/token/snackbar-duration.token';
import {AuthRepository} from '@core/infrastructure/repository/auth/auth.repository';
import {AuthStore} from '@core/infrastructure/store/auth/auth.store';
import {BaseRequestService} from '@core/infrastructure/services/base-request.service';
import {BASE_URL} from '@core/infrastructure/token/base-url.token';
import {TokenService} from '@core/infrastructure/services/token.service';
import {SecureStorageService} from '@core/infrastructure/services/secure-storage.service';

export function provideAuth(options: AuthOptionsProviderType) {
  return makeEnvironmentProviders([
    BaseRequestService,
    AuthRepository,
    TokenService,
    SecureStorageService,
    AuthStore,
    { provide: BASE_URL, useValue: options.baseUrl },
    { provide: AUTH_REDIRECT_URI, useValue: options.redirectUri },
    { provide: AUTH_RETURN_TO, useValue: options.returnTo ?? '/' },
    { provide: SNACKBAR_DURATION, useValue: options.snackbarDuration },
  ]);
}
