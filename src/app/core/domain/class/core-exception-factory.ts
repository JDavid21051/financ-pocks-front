import {CoreCodeErrosEnum, CoreExceptionMap} from '@core/domain/enums/code-errors.enum';
import {InternalServerException} from '@core/domain/class/core-exceptions';
import {BaseErrorResponse, FailedResponse} from '@core/domain/interfaces/request-response.interface';

export class CoreExceptionFactory {
  static createError<T extends BaseErrorResponse = BaseErrorResponse>(response: FailedResponse<T>) {
    const [error] = response.errors;
    const ExceptionClass = CoreExceptionMap.get(error.code as CoreCodeErrosEnum);
    const CustomError = ExceptionClass ?? InternalServerException;
    return new CustomError(error.message);
  }
}
