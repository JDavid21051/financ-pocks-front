import {Component, computed, inject, input, output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {ProfileDataComponent} from '@modules/main/presentation/profile-data/profile-data.component';
import {UserLoggedState} from '@core/infrastructure/store/current-user/user-logged-state';
import {CurrentUserInterface} from '@core/domain/interfaces/auth/current-user.interface';
import {TranslatePipe} from '@ngx-translate/core';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'pock-container-profile-panel',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    ProfileDataComponent,
    MatButton,
    TranslatePipe,
    MatTooltip,
  ],
  templateUrl: './container-profile-panel.component.html',
  styleUrl: './container-profile-panel.component.scss',
})
export class ContainerProfilePanelComponent {
  isOpen = input<boolean>(false);
  readonly closePanel = output();
  readonly clickLogout = output();
  private readonly currentUser = inject(UserLoggedState);
  protected readonly dataUser = this.currentUser.data;
  readonly getDataUser = computed(() => <CurrentUserInterface>this.dataUser());

}
