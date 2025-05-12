import {Component, inject, signal} from '@angular/core';
import {MainHeaderComponent} from '@modules/main/presentation/main-header/main-header.component';
import {RouterOutlet} from '@angular/router';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {AuthStore} from '@core/infrastructure/store/auth/auth.store';
import {
  ContainerProfilePanelComponent
} from '@modules/main/containers/container-profile-panel/container-profile-panel.component';
import {UserLoggedState} from '@core/infrastructure/store/current-user/user-logged-state';

@Component({
  selector: 'pock-main-container',
  standalone: true,
  imports: [
    MainHeaderComponent,
    RouterOutlet,
    MatDrawerContainer,
    MatDrawer,
    ContainerProfilePanelComponent,
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {
  private readonly currentUser = inject(UserLoggedState);
  private readonly authStore = inject(AuthStore);
  protected readonly isAuthenticated = this.authStore.isAuthenticated;
  protected openPanel = signal(false);

  constructor() {
    if (this.isAuthenticated()) {
      this.currentUser.getData({id: this.authStore.currentState().userId});
    }
  }

  onTogglePanel(): void {
    this.openPanel.set(!this.openPanel());
  }

  onClosePanel(): void {
    this.openPanel.set(false);
  }

  onClickLogout(): void {
    this.authStore.revokeAccess();
  }
}
