import {Component, inject} from '@angular/core';
import {MatSnackBarModule, MatSnackBarRef} from '@angular/material/snack-bar';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'pock-alert-snack',
  standalone: true,
  imports: [MatSnackBarModule, MatButton],
  template: `
    <span class="pock_snack" matSnackBarLabel>
      {{snackData.message}}
    </span>
    <span matSnackBarActions>
      <button
        mat-button
        matSnackBarAction
        (click)="onClickButton()">
      {{snackData.cancel}}
      </button>
    </span>
  `,
  styleUrl: './alert-snack.component.scss',
})
export class AlertSnackComponent {
  readonly #snackBar = inject(MatSnackBarRef);

  get snackData() {
    return this.#snackBar.instance.data;
  }

  onClickButton(): void {
    this.#snackBar.dismissWithAction();
  }

}
