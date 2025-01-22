import {inject, Injectable} from '@angular/core';
import {BaseRequestService} from '@core/infrastructure/services/base-request.service';
import {AppEndpointsData} from '@core/infrastructure/endpoints/app.endpoints';
import {AccountModel} from '@modules/accounts/models/accounts.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountsRepository {
  readonly #http = inject(BaseRequestService);
  readonly #entity = AppEndpointsData.main.accounts;


  list(): Observable<AccountModel[]> {
    return this.#http.get<AccountModel[]>(this.#entity);
  }
}
