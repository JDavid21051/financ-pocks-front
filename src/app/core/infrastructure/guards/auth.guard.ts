import {CanActivateFn, Router} from '@angular/router';
import {AuthStore} from '@core/infrastructure/store/auth/auth.store';
import {inject} from '@angular/core';

export const authenticationGuard: CanActivateFn = () => {
    const authStore: AuthStore = inject(AuthStore);
    const router: Router = inject(Router);

    if (!authStore.isAuthenticated()) {
      router.navigate(['auth/login']).then();
      return false;
    }
    return true;
};
