import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, EMPTY, filter, first, Observable, switchMap} from 'rxjs';
import {SHOULD_INTERCEPT_REQUEST} from '@core/infrastructure/context-tokens/auth-intercept-req.token';
import {justThrowError} from '@core/domain/functions/just-throw-error';
import {AuthStore} from '@core/infrastructure/store/auth/auth.store';
import {BaseCoreError} from '@core/domain/class/base-core-error';
import {CoreCodeErrosEnum} from '@core/domain/enums/code-errors.enum';
import {SnackService} from '@core/infrastructure/services/snack.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const shouldIntercept = req.context.get(SHOULD_INTERCEPT_REQUEST);
  console.log({shouldIntercept});
  if (!shouldIntercept) return next(req);

  const authStore = inject(AuthStore);

  const refreshing$ = authStore.refreshing$;
  if (!authStore.isAuthenticated()) {
    return next(req);
  }
  const snackService: SnackService = inject(SnackService);
  if (authStore.refreshTokenIsExpired()) {
    authStore.revokeAccess();
    snackService.showError({
      message:'Su sesión ha expirado. Por favor inicie sesión '
    });
    return EMPTY;
  }
  if (authStore.accessTokenIsExpired()) return retryAfterRefreshToken(next, req, authStore);
  const tokens = authStore.tokens();
  if (tokens) {
    return refreshing$.pipe(
      filter((refreshing) => !refreshing),
      first(),
      switchMap(() => {
        return next(setupRequest(req, tokens?.accessToken ?? '')).pipe(
          catchError((err) => {
            // If the error is not an HttpErrorResponse, we can't handle it
            if (!isUnauthorizedHttpError(err)) return justThrowError(err);
            const apiError = extractError(err);
            if (shouldRenewAccess(apiError)) return retryAfterRefreshToken(next, req, authStore);
            if (shouldRevokeAccess(apiError)) {
              snackService.showError({
                message: 'apiError.message'
              });
              authStore.revokeAccess();
              return EMPTY;
            }
            return justThrowError(err);
          }),
        );
      }),
    );
  }
  return next(req);
};

function retryAfterRefreshToken(
  next: HttpHandlerFn,
  req: HttpRequest<unknown>,
  authStore: AuthStore,
): Observable<HttpEvent<unknown>> {
  return authStore.refreshToken().pipe(
    switchMap(() => {
      const newTokens = authStore.tokens()!;
      return next(setupRequest(req, newTokens.accessToken));
    }),
    catchError(() => {
      return EMPTY;
    }),
  );
}

function shouldRevokeAccess(apiError: BaseCoreError) {
  return apiError.code === CoreCodeErrosEnum.notAuthenticated;
}

function shouldRenewAccess(apiError: BaseCoreError) {
  return apiError.code === CoreCodeErrosEnum.sessionExpired;
}

function setupRequest(req: HttpRequest<unknown>, accessToken: string) {
  return req.clone({setHeaders: {Authorization: accessToken}});
}

function extractError(err: HttpErrorResponse): BaseCoreError {
  const {
    errors: [apiError],
  } = err.error;
  return apiError;
}

function isUnauthorizedHttpError(err: unknown): err is HttpErrorResponse {
  return err instanceof HttpErrorResponse && err.status === HttpStatusCode.Unauthorized;
}
