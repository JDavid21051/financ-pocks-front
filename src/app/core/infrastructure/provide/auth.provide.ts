import {makeEnvironmentProviders} from '@angular/core';
import {AUTH_REDIRECT_URI} from '@core/infrastructure/token/auth-redirect.token';
import {AUTH_RETURN_TO} from '@core/infrastructure/token/auth-return-to.token';
import {AuthOptionsProviderType} from '@core/domain/types/auth-options-provider.type';

export function provideAuth(options: AuthOptionsProviderType) {
  return makeEnvironmentProviders([
    { provide: AUTH_REDIRECT_URI, useValue: options.redirectUri },
    { provide: AUTH_RETURN_TO, useValue: options.returnTo ?? '/' },
  ]);
}
