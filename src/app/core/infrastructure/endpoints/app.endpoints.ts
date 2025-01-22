export interface AppMainEndpoints {
  entities: string;
  accounts: string;
}

export interface AppAuthEndpoints {
  login: string;
  logout: string;
  refresh: string;
}

export interface AppEndpointsModel {
  main: AppMainEndpoints;
  auth: AppAuthEndpoints;
}
export const AppEndpointsData: AppEndpointsModel = {
  main: {
    entities: 'financial-entities',
    accounts: 'accounts',
  },
  auth: {
    login: 'auth/bG9naW4tYXBw',
    logout: 'auth/logout',
    refresh: 'auth/refresh-token'
  },
};
