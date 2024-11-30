import {inject, Injectable} from '@angular/core';
import {BaseRequestService} from '@core/infrastructure/services/base-request.service';

@Injectable({
  providedIn: 'root',
})
export class EntitiesStore {
  private readonly http = inject(BaseRequestService);

  list() {
    return this.http.get<any[]>('financial-entities');
  }
}
