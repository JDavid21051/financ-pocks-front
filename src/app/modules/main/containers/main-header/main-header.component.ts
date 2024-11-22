import {Component, inject} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {TranslatePipe} from '@ngx-translate/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {LanguageFormInterface, LanguageOptionType} from '@modules/main/lib/models/language-forms.models';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TooltipModule} from 'primeng/tooltip';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {AvatarModule} from 'primeng/avatar';

@Component({
  selector: 'pock-main-header',
  standalone: true,
  imports: [
    ButtonDirective,
    Ripple,
    TranslatePipe,
    ReactiveFormsModule,
    SelectButtonModule,
    TooltipModule,
    NgOptimizedImage,
    RouterLink,
    AvatarModule,
  ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
  private readonly builder = inject(NonNullableFormBuilder);
  readonly form: FormGroup<LanguageFormInterface> = this.builder.group<LanguageFormInterface>({
    lang: this.builder.control('en'),
  });
  readonly logoUrl = 'images/logotype.png';
  readonly langOptions: { value: LanguageOptionType, label: string, tooltip: string }[] = [
    {
      label: 'app.header.lang.toggle.es.label',
      value: 'es',
      tooltip: 'app.header.lang.toggle.es.tooltip'
    },
    {
      label: 'app.header.lang.toggle.en.label',
      value: 'en',
      tooltip: 'app.header.lang.toggle.es.tooltip'
    }
  ];

  readonly menuItems: { label: string, route: string }[] = [
    {
      label: 'inicio',
      route: 'home',
    },
    {
      label: 'entidades',
      route: 'entities',
    },
    {
      label: 'servicios',
      route: 'services',
    },
    {
      label: 'gastos',
      route: 'expenses',
    },
  ];


}
