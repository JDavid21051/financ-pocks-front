import {AccountModel} from '@modules/accounts/models/accounts.model';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {switchMap, tap} from 'rxjs';
import {signalResponse} from '@core/domain/functions/hanlders-response';
import {AccountsRepository} from '@core/infrastructure/repository/accounts/accounts.repo';
import {SnackService} from '@core/infrastructure/services/snack.service';


export interface AccountStateModel {
  accounts: AccountModel[];
  loading: boolean;
}

export const initialState: AccountStateModel = {
  accounts: [],
  loading: false,
};

export const AccountStore = signalStore(
  withState(initialState),
  withComputed((state) => ({
    list: computed(() => state.accounts()),
    isLoading: computed(() => state.loading()),
  })),
  withMethods((
    store,
    repo: AccountsRepository = inject(AccountsRepository),
    snack: SnackService = inject(SnackService),
  ) => {
    const loadData = rxMethod<void>(($) => {
      return $.pipe(
        tap(() => patchState(store, {loading: true})),
        switchMap(() =>
          repo.list().pipe(
            signalResponse(
              (response) => {
                patchState(store, {loading: false, accounts: response});
              },
              (error) => {
                patchState(store, {loading: false, accounts: []});
                snack.showSuccess({
                  message: error.message,
                });
              },
            ),
          ),
        ),
      );
    });
    return {
      loadData,
    };
  }),
);
