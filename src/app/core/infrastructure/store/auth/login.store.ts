import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {SnackService} from '@core/infrastructure/services/snack.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {switchMap, tap} from 'rxjs';
import {signalResponse} from '@core/domain/functions/hanlders-response';
import {AuthRepository} from '@core/infrastructure/repository/auth/auth.repository';
import {LoginDTO} from '@core/domain/interfaces/auth/login.interfaces';
import {AuthStore} from '@core/infrastructure/store/auth/auth.store';

export interface LoginStateModel {
  loading: boolean;
}

export const initialLoginState: LoginStateModel = {
  loading: false,
};

export const LoginStore = signalStore(
  { providedIn: 'root' },
  withState(initialLoginState),
  withComputed((state) => ({
    isLoading: computed(() => state.loading()),
  })),
  withMethods((
    store,
    repo: AuthRepository = inject(AuthRepository),
    authStore: AuthStore = inject(AuthStore),
    snack: SnackService = inject(SnackService),
  ) => {
    const login = rxMethod<LoginDTO>(($) => {
      return $.pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((params: LoginDTO) =>
          repo.login(params).pipe(
            signalResponse(
              (response) => {
                console.log(response);
                authStore.grantAccess({
                  accessToken: response.accessToken,
                  accessTokenEndDate: response.enteredAt,
                  refreshToken: response.refreshToken,
                  refreshTokenEndDate: '',
                });
                patchState(store, { loading: false});
                snack.showSuccess({message: 'Inicio de sesión exitoso'});
              },
              (error) => {
                console.log(error);
                patchState(store, { loading: false});
                snack.showError({
                  message: error.message
                });
              },
            ),
          ),
        ),
      );
    });
    const resetAuth = () => {
      authStore.resetStore();
    };
    return {
      login,
      resetAuth
    };
  })
);
