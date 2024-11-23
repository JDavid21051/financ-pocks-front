import {ValidatorFn, Validators} from '@angular/forms';

export const EmailFormatValidator = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/;

export function emailValidator(): ValidatorFn[] {
  return [
    Validators.required,
    Validators.pattern(EmailFormatValidator),
  ];
}
