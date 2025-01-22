import {FormControl} from '@angular/forms';

export interface LoginDTO {
  password: string;
}

export interface LogoutDTO {
  token: string;
}

export interface LoginResponseModel {
  enteredAt: string;
  updatedAt: string;
  accessToken: string;
  refreshToken: string;
  userId: number;
}

export interface LoginFormInterface {
  password: FormControl<string>;
}
