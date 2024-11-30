import {HttpContext, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

export enum ResponseCode {
  api = 'api_error',
  database = 'database_error',
  server = 'server_error',
  unknown = 'unknown_error',
  success = 'success',
}

export interface BaseErrorResponse extends HttpErrorResponse {
  code: ResponseCode | string;
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


export function successResponseFactory<T>(
  data: T,
  options: Partial<SuccessResponse<T>> = {}
): SuccessResponse<T> {
  return {
    success: true,
    code: ResponseCode.success,
    message: ResponseCode.success,
    data: data,
    ...options
  };
}

export function errorResponseFactory(
  errors: BaseErrorResponse[],
  options: Partial<FailedResponse> = {}
): FailedResponse {
  return {
    success: false,
    code: ResponseCode.unknown,
    message: ResponseCode.unknown,
    errors,
    ...options
  };
}

export interface RequestOptions {
  headers?: HttpHeaders;
  context?: HttpContext;
}

export function mapResponse<T>(response: RequestResponse<T>): T {
  if (!response.success) {
    const [error] = response.errors;
    throw error;
  }
  if (typeof response.data === 'string') return JSON.parse(response.data);
  return response.data;
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
