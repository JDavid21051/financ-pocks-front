import {inject, Injectable} from '@angular/core';
import {BaseRequestService} from '@core/infrastructure/services/base-request.service';
import {AppEndpointsData} from '@core/infrastructure/endpoints/app.endpoints';
import {Observable} from 'rxjs';
import {LoginDTO, LoginResponseModel} from '@core/domain/interfaces/auth/login.interfaces';
import {RefreshDTO} from '@core/domain/interfaces/auth/refresh.interface';
import {AuthDataStateInterface} from '@core/domain/interfaces/auth/auth-state.interface';
import {SHOULD_INTERCEPT_REQUEST} from '@core/infrastructure/context-tokens/auth-intercept-req.token';
import {HttpContext} from '@angular/common/http';
import {LogoutDTO} from '@core/domain/interfaces/auth/logout.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  readonly #http = inject(BaseRequestService);
  readonly #auth = AppEndpointsData.auth;
  private readonly shouldInterceptContext = new HttpContext().set(SHOULD_INTERCEPT_REQUEST, false);

  login(params: LoginDTO): Observable<LoginResponseModel> {
    return this.#http.post<LoginResponseModel, LoginDTO>(this.#auth.login, params, {context: this.shouldInterceptContext});
  };

  logout(params: LogoutDTO): Observable<LoginResponseModel> {
    return this.#http.post<LoginResponseModel>(this.#auth.logout, params, {context: this.shouldInterceptContext});
  };

  refreshToken(params: RefreshDTO): Observable<AuthDataStateInterface> {
    return this.#http.post<AuthDataStateInterface, RefreshDTO>(this.#auth.refresh, params, {context: this.shouldInterceptContext});
  };

}
