import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {LinkLogoComponent} from '@shared/design/molecules/link-logo/link-logo.component';
import {LoginFormComponent} from '@modules/auth/presentation/login-form/login-form.component';
import {Router} from '@angular/router';

@Component({
  selector: 'pock-auth-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslatePipe,
    LinkLogoComponent,
    LoginFormComponent,
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  private readonly router = inject(Router);

  onClickForm(): void {
    this.router.navigate(['main/home']).then();
  }
}
