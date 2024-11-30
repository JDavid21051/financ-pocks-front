import {Provider} from '@angular/core';
import {BASE_URL} from '@core/infrastructure/token/base-url.token';
import {BaseRequestService} from '@core/infrastructure/services/base-request.service';

export function CoreHttpProvide(options: { baseUrl: string; }): Provider[] {
  return [
    BaseRequestService,
    { provide: BASE_URL, useValue: options.baseUrl },
  ];
}
