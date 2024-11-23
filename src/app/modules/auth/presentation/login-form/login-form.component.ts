import {Component, inject, output} from '@angular/core';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {PasswordModule} from 'primeng/password';
import {LoginDTOInterface, LoginFormInterface} from '@core/domain/interfaces/auth/login.interfaces';


@Component({
  selector: 'pock-login-form',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonDirective,
    Ripple,
    PasswordModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  readonly onSubmit = output<LoginDTOInterface>();
  private readonly builder = inject(NonNullableFormBuilder);
  readonly form = this.builder.group<LoginFormInterface>({
    username: this.builder.control('', { validators: [Validators.required]}),
    password: this.builder.control('', { validators: [Validators.required, Validators.minLength(8)]}),
  });

  onClickSubmit(): void {
    if (this.form.valid) {
      const data: LoginDTOInterface = this.form.getRawValue();
      this.onSubmit.emit(data);
    } else {
      this.form.markAllAsTouched();
    }
  }

}
