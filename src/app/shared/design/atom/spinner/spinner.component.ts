import {Component, input} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'pock-spinner',
  standalone: true,
  imports: [
    MatProgressSpinner,
  ],
  template: `
    @if (visible()) {
      <div class="spinner_overlay absolute top-0 left-0 w-full h-full flex justify-content-center align-items-center">
        <mat-spinner />
      </div>
    }

  `,
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  visible = input.required<boolean>();
}
