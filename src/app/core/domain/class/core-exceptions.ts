import {BaseCoreError} from '@core/domain/class/base-core-error';
import {CoreCodeErrosEnum} from '@core/domain/enums/code-errors.enum';

export class ApiException extends BaseCoreError {
  override code = CoreCodeErrosEnum.api;
}
export class DatabaseException extends BaseCoreError {
  override code = CoreCodeErrosEnum.database;
}
export class ServerException extends BaseCoreError {
  override code = CoreCodeErrosEnum.server;
}
export class UnknownException extends BaseCoreError {
  override code = CoreCodeErrosEnum.unknown;
}
export class SessionExpiredException extends BaseCoreError {
  override code = CoreCodeErrosEnum.sessionExpired;
}
export class UnAuthorizedException extends BaseCoreError {
  override code = CoreCodeErrosEnum.notAuthenticated;
}
export class InternalServerException extends BaseCoreError {
  override code = CoreCodeErrosEnum.internal;
}
