/*
 * Project:      financ-pocks-front
 * Developed by: Juan David Pelaez Cumbe
 * Date:         23/01/25
 * Module name:  user-logged-state.const
 * File name:    user-logged-state.const.ts
 * IDE:          WebStorm
 */


import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {UserLoggedInitState} from '@core/infrastructure/store/current-user/user-logged.store';
import {AuthRepository} from '@core/infrastructure/repository/auth/auth.repository';
import {SnackService} from '@core/infrastructure/services/snack.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {switchMap, tap} from 'rxjs';
import {signalResponse} from '@core/domain/functions/hanlders-response';
import {CurrentUserDTO} from '@core/domain/interfaces/auth/current-user.interface';

export const UserLoggedState = signalStore(
  {providedIn: 'root'},
  withState(UserLoggedInitState),
  withComputed((state) => ({
    isLoading: computed(() => state.loading()),
    userData: computed(() => state.data()),
  })),
  withMethods((
    currentStore,
    repository: AuthRepository = inject(AuthRepository),
    snack: SnackService = inject(SnackService),
  ) => {
    const getData = rxMethod<CurrentUserDTO>(($) => {
      return $.pipe(
        tap(() => patchState(currentStore, {loading: true})),
        switchMap((params: CurrentUserDTO) => repository.getUserData(params).pipe(
          signalResponse(
            (response) => {
              console.log(response);
              patchState(currentStore, {loading: false, data: response});
            },
            (error) => {
              console.log(error);
              patchState(currentStore, {loading: false});
              snack.showError({
                message: error.message,
              });
            },
          ),
        )),
      );
    });
    return {
      getData,
    };
  }),
);
