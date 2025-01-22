export interface AuthDataStateInterface {
  accessToken: string;
  accessTokenEndDate: string;
  refreshToken: string;
  refreshTokenEndDate: string;
}

interface BaseAuthStateInterface {
  isAuthenticated: boolean;
  refreshing: boolean;
}

export interface AuthenticatedUserState extends AuthDataStateInterface, BaseAuthStateInterface {
  isAuthenticated: true;
}

export interface UnauthenticatedUserState extends AuthDataStateInterface, BaseAuthStateInterface {
  isAuthenticated: false;
}

export type AuthStateInterface = AuthenticatedUserState | UnauthenticatedUserState;

