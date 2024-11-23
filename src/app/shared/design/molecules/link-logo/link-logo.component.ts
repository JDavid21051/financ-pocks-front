import {Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'pock-link-logo',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslatePipe,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <a [routerLink]="routerUrl()" [routerLinkActive]="activeUrl()" class="flex">
      <img priority [ngSrc]="logoUrl"
           [alt]="'app.header.logo.alt' | translate"
           [width]="width()"
           [height]="height()">
    </a>
  `,
  styleUrl: './link-logo.component.scss'
})
export class LinkLogoComponent {
  routerUrl = input<string>('/');
  activeUrl = input<string>('active');
  width = input<string>('58');
  height = input<string>('58');
  readonly logoUrl = 'images/logotype.png';
}
