import {Observable, pipe, UnaryFunction} from 'rxjs';
import {map} from 'rxjs/operators';

export type MapToTypeResponse<T> = UnaryFunction<Observable<T>, Observable<void>>;
export const mapToUndefined = <T>(): MapToTypeResponse<T> =>  pipe(map<T, void>((): undefined => undefined));

