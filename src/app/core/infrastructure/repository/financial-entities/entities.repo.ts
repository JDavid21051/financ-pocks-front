import {inject, Injectable} from '@angular/core';
import {BaseRequestService} from '@core/infrastructure/services/base-request.service';
import {AppEndpointsData} from '@core/infrastructure/endpoints/app.endpoints';
import {Observable} from 'rxjs';
import {FinancialEntity} from '@modules/entities/model/financial-entities.model';

@Injectable({
  providedIn: 'root',
})
export class EntitiesRepository {
  readonly #http = inject(BaseRequestService);
  readonly #entity = AppEndpointsData.main.entities;

  list(): Observable<FinancialEntity[]> {
    return this.#http.get<FinancialEntity[]>(this.#entity);
  };
}
