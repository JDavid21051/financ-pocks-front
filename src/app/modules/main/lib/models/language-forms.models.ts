import {FormControl} from '@angular/forms';

export type LanguageOptionType = 'en' | 'es';
export interface LanguageFormInterface {
  lang: FormControl<LanguageOptionType>;
}
