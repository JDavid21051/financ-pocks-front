import { throwError } from 'rxjs';

export function justThrowError<T>(error: T) {
  return throwError(() => error);
}
