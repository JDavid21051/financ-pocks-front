/*
 * Project:      financ-pocks-front
 * Developed by: Juan David Pelaez Cumbe
 * Date:         23/01/25
 * Module name:  current-user.interface
 * File name:    current-user.interface.ts
 * IDE:          WebStorm
 */


import {UserRoleEnum} from '@core/domain/enums/user-role.enum';

export interface CurrentUserDTO {
  id: number;
}

export interface CurrentUserInterface {
  userId: number;
  enteredAt: string;
  firstName: string;
  lastName: string;
  role: UserRoleEnum;
  avatar: string;
}
