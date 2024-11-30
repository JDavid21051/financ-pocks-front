import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders} from '@angular/common/http';
import {BASE_URL} from '@core/infrastructure/token/base-url.token';
import {
  mapResponse,
  RequestResponse,
  serializer,
} from '@core/domain/interfaces/request-response.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BaseRequestService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL);

  get<ResponsePayload, QueryPayload extends object = Record<string, string>>(
    name: string,
    payload?: QueryPayload,
    options?: { headers?: HttpHeaders; context?: HttpContext },
  ) {
    const url = `${this.baseUrl}/${name}`;
    const params = serializer(payload);
    return this.http
      .get<RequestResponse<ResponsePayload>>(url, { params, ...options })
      .pipe(map((data) => mapResponse(data)));
  }

  post<ResponsePayload, CommandPayload = unknown>(
    name: string,
    payload?: CommandPayload,
    options?: { headers?: HttpHeaders; context?: HttpContext },
  ) {
    const url = `${this.baseUrl}/${name}`;
    return this.http
      .post<RequestResponse<ResponsePayload>>(url, payload, options)
      .pipe(map((data) => mapResponse(data)));
  }

  path<ResponsePayload, CommandPayload = unknown>(
    name: string,
    payload?: CommandPayload,
    options?: { headers?: HttpHeaders; context?: HttpContext },
  ) {
    const url = `${this.baseUrl}/${name}`;
    return this.http
      .patch<RequestResponse<ResponsePayload>>(url, payload, options)
      .pipe(map((data) => mapResponse(data)));
  }

  delete<ResponsePayload, QueryPayload extends object = Record<string, string>>(
    name: string,
    payload?: QueryPayload,
    options?: { headers?: HttpHeaders; context?: HttpContext },
  ) {
    const url = `${this.baseUrl}/${name}`;
    const params = serializer(payload);
    return this.http
      .delete<RequestResponse<ResponsePayload>>(url, { params, ...options })
      .pipe(map((data) => mapResponse(data)));
  }
}
