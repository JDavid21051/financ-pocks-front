/*
 * Project:      financ-pocks-front
 * Developed by: Juan David Pelaez Cumbe
 * Date:         23/01/25
 * Module name:  user-logged.store
 * File name:    user-logged.store.ts
 * IDE:          WebStorm
 */


import {CurrentUserInterface} from '@core/domain/interfaces/auth/current-user.interface';

export interface UserLoggedStore {
  loading: boolean;
  data: CurrentUserInterface | null;
}

export const UserLoggedInitState: UserLoggedStore = {
  loading: false,
  data: null
};
