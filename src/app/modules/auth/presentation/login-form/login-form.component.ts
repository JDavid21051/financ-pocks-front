import {Component, computed, inject, output, signal} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {LoginDTOInterface, LoginFormInterface} from '@core/domain/interfaces/auth/login.interfaces';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {passwordValidator} from '@core/infrastructure/validators/password-validator';
import {emailValidator} from '@core/infrastructure/validators/email-validator';


@Component({
  selector: 'pock-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButton,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  readonly onSubmit = output<LoginDTOInterface>();
  private readonly builder = inject(NonNullableFormBuilder);
  readonly form = this.builder.group<LoginFormInterface>({
    username: this.builder.control('', { validators: emailValidator()}),
    password: this.builder.control('', { validators: passwordValidator()}),
  });
  passwordVisible = signal(false);
  passwordIcon = computed(() => this.passwordVisible() ? 'visibility_off' :'visibility');
  passwordFieldType = computed(() => this.passwordVisible() ? 'text' :'password');

  onClickSubmit(): void {
    if (this.form.valid) {
      const data: LoginDTOInterface = this.form.getRawValue();
      this.onSubmit.emit(data);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onClickTogglePasswordVisibility(): void {
    this.passwordVisible.set(!this.passwordVisible());
  }

}
