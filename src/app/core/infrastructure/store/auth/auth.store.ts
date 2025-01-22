import {computed, inject, Inject, Injectable, Signal} from '@angular/core';
import {BehaviorSubject, EMPTY, filter, first, map, Observable, Subject, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {
  AuthDataStateInterface,
  AuthStateInterface,
} from '@core/domain/interfaces/auth/auth-state.interface';
import {TokenService} from '@core/infrastructure/services/token.service';
import {AuthRepository} from '@core/infrastructure/repository/auth/auth.repository';
import {AUTH_RETURN_TO} from '@core/infrastructure/token/auth-return-to.token';
import {initialAuthState} from '@core/infrastructure/store/auth/auth-state.const';
import {mapToUndefined} from '@core/domain/functions/map-to-empty';
import {signalResponse} from '@core/domain/functions/hanlders-response';
import {AUTH_REDIRECT_URI} from '@core/infrastructure/token/auth-redirect.token';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private state$ = new BehaviorSubject<AuthStateInterface>(initialAuthState);
  private grantAccess$ = new Subject<AuthDataStateInterface>();
  private revokeAccess$ = new Subject<void>();
  private renewAccess$ = new Subject<void>();

  private readonly authStorage = inject(TokenService);
  private readonly authRepository = inject(AuthRepository);
  private readonly router = inject(Router);
  private readonly redirectAfterLoginUri = inject(AUTH_REDIRECT_URI);

  constructor(
    @Inject(AUTH_RETURN_TO) private readonly redirectAfterLogoutUri: string
  ) {
    this.initEffects();
    this.initStore();
  }

  resetStore(): void {
    this.authStorage.remove();
    this.state$.next(initialAuthState);
  }

  protected get signalState():  Signal<AuthStateInterface> {
    return <Signal<AuthStateInterface>>toSignal(this.state$);
  }


  private initStore(): void {
    const state = this.authStorage.get();
    if (state) return this.state$.next(state);
    this.resetStore();
  }

  readonly accessTokenIsExpired = toSignal(
    this.state$.pipe(
      map((state) => {
        if (!state.isAuthenticated) return true;
        const accessTokenEndDate = new Date(state.accessTokenEndDate);
        const now = new Date();
        return accessTokenEndDate < now;
      }),
    ),
  );
  readonly refreshTokenIsExpired = computed(()=> {
    const state = this.state$.value;
    if (!state.isAuthenticated) return true;
    const refreshTokenEndDate = new Date(state.refreshTokenEndDate);
    const now = new Date();
    return refreshTokenEndDate < now;
  });

  readonly isAuthenticated = toSignal(this.state$.pipe(map((state) => state.isAuthenticated)));


  readonly tokens$ = this.state$.pipe(
    map((state) => {
      if (!state.isAuthenticated) return null;
      return {
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      };
    }),
  );

  readonly tokens = toSignal(
    this.state$.pipe(
      map((state) => {
        if (!state.isAuthenticated) return null;
        return {
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        };
      }),
    ),
  );


  readonly refreshing$ = this.state$.pipe(map((state) => (state.isAuthenticated ? state.refreshing : false)));

  grantAccess(payload: AuthDataStateInterface): void {
    this.grantAccess$.next(payload);
  }

  revokeAccess(): void {
    this.revokeAccess$.next();
  }

  renewAccess(): void {
    this.renewAccess$.next();
  }

  refreshToken(): Observable<void> {
    const state = this.state$.value;
    if (!state.isAuthenticated) return EMPTY;
    if (!state.refreshing) this.renewAccess();

    return this.refreshing$.pipe(
      filter((refreshing) => !refreshing),
      first(),
      mapToUndefined(),
    );
  }

  private resetAfterLogout(): void {
    this.state$.next(initialAuthState);
    this.authStorage.remove();
    this.router.navigateByUrl(this.redirectAfterLogoutUri).then();
  }

  private initEffects(): void {
    this.grantAccess$
      .pipe(
        tap((payload) => {
          const newState: AuthStateInterface = {
            accessToken: `JWT ${payload.accessToken}`,
            accessTokenEndDate: payload.accessTokenEndDate,
            refreshToken: `JWT ${payload.refreshToken}`,
            refreshTokenEndDate: payload.refreshTokenEndDate,
            isAuthenticated: true,
            refreshing: false,
          };
          this.authStorage.set(newState);
          this.state$.next(newState);
          this.router.navigateByUrl(this.redirectAfterLoginUri).then();
        }),
      )
      .subscribe();

    this.revokeAccess$
      .pipe(
        switchMap(() => {
          const state = this.state$.value;
          if (!state.isAuthenticated) {
            this.router.navigateByUrl(this.redirectAfterLogoutUri).then();
            return EMPTY;
          }
          return this.authRepository.logout({accessToken: state.accessToken}).pipe(
            signalResponse(
              () => this.resetAfterLogout(),
              () => {
                this.resetAfterLogout();
                return EMPTY;
              },
            ),
          );
        }),
      )
      .subscribe();

    this.renewAccess$
      .pipe(
        switchMap(() => {
          const state = this.state$.value;
          if (!state.isAuthenticated) return EMPTY;
          this.state$.next({...state, refreshing: true});
          return this.authRepository.refreshToken({refreshToken: state.refreshToken, accessToken: state.accessToken}).pipe(
            signalResponse(
              (response) => {
                this.grantAccess({
                  accessToken: response.accessToken,
                  accessTokenEndDate: response.accessTokenEndDate,
                  refreshTokenEndDate: response.refreshTokenEndDate,
                  refreshToken: response.refreshToken,
                });
              },
              () => {
                this.revokeAccess();
              },
            ),
          );
        }),
      )
      .subscribe();
  }
}
