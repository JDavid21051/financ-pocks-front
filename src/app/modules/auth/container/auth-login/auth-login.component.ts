import {Component, inject} from '@angular/core';
import {LinkLogoComponent} from '@shared/design/molecules/link-logo/link-logo.component';
import {LoginFormComponent} from '@modules/auth/presentation/login-form/login-form.component';
import {LoginStore} from '@core/infrastructure/store/auth/login.store';
import {LoginDTO} from '@core/domain/interfaces/auth/login.interfaces';
import {SpinnerComponent} from '@shared/design/atom/spinner/spinner.component';

@Component({
  selector: 'pock-auth-login',
  standalone: true,
  imports: [
    LinkLogoComponent,
    LoginFormComponent,
    SpinnerComponent,
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  private readonly loginStore = inject(LoginStore);
  protected readonly isLoading = this.loginStore.isLoading;

  constructor() {
    this.loginStore.resetAuth();
  }

  onClickForm(data: LoginDTO): void {
    this.loginStore.login(data);
  }
}
