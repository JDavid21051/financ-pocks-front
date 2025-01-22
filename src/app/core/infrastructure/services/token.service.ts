import {inject, Injectable} from '@angular/core';
import {SecureStorageService} from '@core/infrastructure/services/secure-storage.service';
import {AuthStateInterface} from '@core/domain/interfaces/auth/auth-state.interface';
import {isNullish} from '@core/domain/functions/is-nullish';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private static readonly KEY = 'auth';
  private readonly storage = inject(SecureStorageService);

  private encode(state: AuthStateInterface): string {
    return btoa(JSON.stringify(state));
  }

  private decode(state: string): AuthStateInterface {
    return JSON.parse(atob(state));
  }

  set(state: AuthStateInterface): void {
    this.storage.setItem(TokenService.KEY, this.encode(state));
  }

  get(): AuthStateInterface | null {
    const item = this.storage.getItem(TokenService.KEY);
    if (isNullish(item)) return null;
    return this.decode(item);
  }

  remove(): void {
    this.storage.removeItem(TokenService.KEY);
  }

}
