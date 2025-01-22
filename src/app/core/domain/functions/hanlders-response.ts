import {catchError, EMPTY, Observable, of, pipe, tap, UnaryFunction} from 'rxjs';

export function handleResponse<TResponse, TError = Error>(
  onSuccess: (response: TResponse) => void,
  onError?: (error: TError) => void,
  onFinally?: () => void,
): UnaryFunction<Observable<TResponse>, Observable<TResponse>> {
  return pipe(
    tap({ next: onSuccess, complete: onFinally }),
    catchError((error: TError) => {
      onError?.(error);
      onFinally?.();
      return EMPTY;
    }),
  );
}

export function signalResponse<TResponse, TError = Error>(
  onSuccess: (response: TResponse) => void,
  onError?: (error: TError) => void,
  onFinally?: () => void,
): UnaryFunction<Observable<TResponse>, Observable<TResponse>> {
  return handleResponse(
    onSuccess,
    (error: TError) => {
      onError?.(error);
      onFinally?.();
      return of(null);
    },
    onFinally,
  );
}
