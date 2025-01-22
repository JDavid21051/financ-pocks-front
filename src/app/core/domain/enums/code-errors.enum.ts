import {
  ApiException,
  DatabaseException,
  InternalServerException, ServerException, SessionExpiredException,
  UnAuthorizedException, UnknownException,
} from '@core/domain/class/core-exceptions';

export enum CoreCodeErrosEnum {
  api = 'api_error',
  internal = 'Internal_error',
  database = 'database_error',
  server = 'server_error',
  unknown = 'unknown_error',
  sessionExpired = 'session_expired',
  notAuthenticated = 'not_authenticated',
}

export const CoreExceptionMap = new Map([
  [CoreCodeErrosEnum.notAuthenticated, UnAuthorizedException],
  [CoreCodeErrosEnum.internal, InternalServerException],
  [CoreCodeErrosEnum.api, ApiException],
  [CoreCodeErrosEnum.database, DatabaseException],
  [CoreCodeErrosEnum.server, ServerException],
  [CoreCodeErrosEnum.unknown, UnknownException],
  [CoreCodeErrosEnum.sessionExpired, SessionExpiredException],
  [CoreCodeErrosEnum.notAuthenticated, UnAuthorizedException],

]);
