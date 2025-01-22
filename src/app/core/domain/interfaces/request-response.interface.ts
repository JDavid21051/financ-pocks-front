import {HttpContext, HttpHeaders} from '@angular/common/http';
import {CoreCodeErrosEnum} from '@core/domain/enums/code-errors.enum';
import {CoreExceptionFactory} from '@core/domain/class/core-exception-factory';

export interface BaseErrorResponse {
  readonly code: string;
  readonly message: string;
}

export interface BaseRequestResponse<T, E extends BaseErrorResponse = BaseErrorResponse> {
  success: boolean;
  code: string;
  message: string;
  data?: T;
  errors?: E[];
}

export interface SuccessResponse<T> extends BaseRequestResponse<T> {
  success: true;
  data: T;
  errors?: never;
}

export interface FailedResponse<E extends BaseErrorResponse = BaseErrorResponse> extends BaseRequestResponse<never> {
  success: false;
  data?: never;
  errors: E[];
}

export type RequestResponse<T, E extends BaseErrorResponse = BaseErrorResponse> = SuccessResponse<T> | FailedResponse<E>


export function errorResponseFactory(
  errors: BaseErrorResponse[],
  options: Partial<FailedResponse> = {}
): FailedResponse {
  return {
    success: false,
    code: CoreCodeErrosEnum.unknown,
    message: CoreCodeErrosEnum.unknown,
    errors,
    ...options
  };
}

export interface RequestOptions {
  headers?: HttpHeaders;
  context?: HttpContext;
}

export function mapResponse<T>(response: RequestResponse<T>): T {
  if (!response.success) throw CoreExceptionFactory.createError(response);
  if (typeof response.data === 'string') return JSON.parse(response.data);
  return response.data;
}

export function mapResponseError(response: unknown): unknown {
  console.log(response);
  if (response) throw (<Record<string, unknown>><unknown>response)['error'];
  return response;
}

export function serializer<T extends object>(
  params?: T | null | undefined
): Record<string, string> {
  if (!params) return {};

  return Object.keys(params).reduce<Record<string, string>>((acc, [key, value]) => {
    if (Array.isArray(value)) {
      return { ...acc, [key]: value.join(',') };
    }
    if (typeof value === 'object') {
      return { ...acc, [key]: JSON.stringify(value) };
    }
    return { ...acc, [key]: value };
  }, {});
}
