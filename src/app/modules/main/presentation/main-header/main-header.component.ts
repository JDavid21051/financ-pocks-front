import {Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {LanguageFormInterface, LanguageOptionType} from '@modules/main/lib/models/language-forms.models';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatAnchor, MatMiniFabButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {LinkLogoComponent} from '@shared/design/molecules/link-logo/link-logo.component';

@Component({
  selector: 'pock-main-header',
  standalone: true,
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    LinkLogoComponent,
    MatIconModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatMiniFabButton,
    MatTooltip,
    MatAnchor,
  ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
})
export class MainHeaderComponent {
  private readonly builder = inject(NonNullableFormBuilder);
  readonly form: FormGroup<LanguageFormInterface> = this.builder.group<LanguageFormInterface>({
    lang: this.builder.control('es'),
  });
  readonly langOptions: { value: LanguageOptionType, label: string, tooltip: string }[] = [
    {
      label: 'app.header.lang.toggle.es.label',
      value: 'es',
      tooltip: 'app.header.lang.toggle.es.tooltip',
    },
    {
      label: 'app.header.lang.toggle.en.label',
      value: 'en',
      tooltip: 'app.header.lang.toggle.es.tooltip',
    },
  ];

  readonly menuItems: { label: string, route: string }[] = [
    {
      label: 'inicio',
      route: 'home',
    },
    {
      label: 'Gastos',
      route: 'expenses',
    },
    {
      label: 'Entidades',
      route: 'entities',
    },
    {
      label: 'Servicios',
      route: 'services',
    },

    {
      label: 'Cuentas',
      route: 'accounts',
    },
    {
      label: 'Ahorros',
      route: 'savings',
    },
  ];


}
