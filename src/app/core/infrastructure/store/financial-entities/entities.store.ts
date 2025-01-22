import {computed, inject} from '@angular/core';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {switchMap, tap} from 'rxjs';
import {signalResponse} from '@core/domain/functions/hanlders-response';
import {EntitiesRepository} from '@core/infrastructure/repository/financial-entities/entities.repo';
import {SnackService} from '@core/infrastructure/services/snack.service';
import {FinancialEntity} from '@modules/entities/model/financial-entities.model';

export interface EntitiesStateModel {
  financialEntities: FinancialEntity[];
  loading: boolean;
}

export const initialState: EntitiesStateModel = {
  financialEntities: [],
  loading: false,
};

export const EntityStore = signalStore(
  withState(initialState),
  withComputed((state) => ({
      list: computed(() => state.financialEntities()),
      listCount: computed(() => state.financialEntities().length),
      isLoading: computed(() => state.loading()),
    }),
  ),
  withMethods((
    store,
    repo: EntitiesRepository = inject(EntitiesRepository),
    snack: SnackService = inject(SnackService),

  ) => {
    const loadData = rxMethod<void>(($) => {
      return $.pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() =>
          repo.list().pipe(
            signalResponse(
              (response) => {
                patchState(store, { loading: false, financialEntities: response });
              },
              (error) => {
                patchState(store, { loading: false, financialEntities: [] });
                snack.showSuccess({
                  message: error.message
                });
              },
            ),
          ),
        ),
      );
    });
    return {
      loadData
    };
  })
);
