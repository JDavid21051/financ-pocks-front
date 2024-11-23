import {FormControl} from '@angular/forms';

export interface LoginDTOInterface {
  username: string;
  password: string;
}

export interface LoginFormInterface {
  username: FormControl<string>;
  password: FormControl<string>;
}
