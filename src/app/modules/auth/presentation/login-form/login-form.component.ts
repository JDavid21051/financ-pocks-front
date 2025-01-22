import {Component, computed, inject, output, signal} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {LoginDTO, LoginFormInterface} from '@core/domain/interfaces/auth/login.interfaces';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {passwordValidator} from '@core/infrastructure/validators/password-validator';


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
  readonly onSubmit = output<LoginDTO>();
  private readonly builder = inject(NonNullableFormBuilder);
  readonly form = this.builder.group<LoginFormInterface>({
    password: this.builder.control('', { validators: passwordValidator()}),
  });
  readonly passwordVisible = signal(false);
  readonly passwordIcon = computed(() => this.passwordVisible() ? 'visibility_off' :'visibility');
  readonly passwordFieldType = computed(() => this.passwordVisible() ? 'text' :'password');

  onClickSubmit(): void {
    if (this.form.valid) {
      const data: LoginDTO = this.form.getRawValue();
      this.onSubmit.emit(data);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onClickTogglePasswordVisibility(): void {
    this.passwordVisible.set(!this.passwordVisible());
  }

}
