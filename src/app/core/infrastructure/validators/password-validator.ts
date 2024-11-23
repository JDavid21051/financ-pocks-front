import {ValidatorFn, Validators} from '@angular/forms';
import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from '@shared/utils/int-utils';

export function passwordValidator(): ValidatorFn[] {
  return [
    Validators.required,
    Validators.minLength(PASSWORD_MIN_LENGTH),
    Validators.maxLength(PASSWORD_MAX_LENGTH),
  ];
}
