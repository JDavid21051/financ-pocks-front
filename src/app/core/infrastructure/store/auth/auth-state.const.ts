import {AuthStateInterface} from '@core/domain/interfaces/auth/auth-state.interface';

export const initialAuthState: AuthStateInterface = {
  accessToken: '',
  accessTokenEndDate: '',
  refreshToken: '',
  refreshing: false,
  refreshTokenEndDate: '',
  isAuthenticated: false,
};
