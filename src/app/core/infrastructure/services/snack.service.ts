import {inject, Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {SNACKBAR_DURATION} from '@core/infrastructure/token/snackbar-duration.token';

const MILLISECONDS = 1000;

export interface SnackData extends MatSnackBarConfig {
  message: string;
  action?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  readonly #snackBar = inject(MatSnackBar);
  readonly #duration = inject(SNACKBAR_DURATION);

  private show(msm: string, action?: string, config?: MatSnackBarConfig): void {
    this.#snackBar.open(
      msm,
      action,
      {
        ...config,
        duration: (this.#duration * MILLISECONDS),
      });
  }

  showSuccess(param: SnackData): void {
    this.show(param.message, (param.action ?? 'Cancel'), {...param, panelClass: 'snack_success'});
  }

  showError(param: SnackData): void {
    this.show(param.message, (param.action ?? 'Cancel'), {...param, panelClass: 'snack_error'});
  }

}
