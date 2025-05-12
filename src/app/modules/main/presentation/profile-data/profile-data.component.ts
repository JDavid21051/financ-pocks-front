import {Component, computed, input, output} from '@angular/core';
import {CurrentUserInterface} from '@core/domain/interfaces/auth/current-user.interface';
import {UserRoleEnum} from '@core/domain/enums/user-role.enum';
import {TranslatePipe} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';

const UserRoleMap: Record<UserRoleEnum, string> =  {
  [UserRoleEnum.SuperUser]: 'app.main.roles.superUser',
  [UserRoleEnum.SuperAdmin]: 'app.main.roles.SuperAdmin',
};

@Component({
  selector: 'pock-profile-data',
  standalone: true,
  imports: [
    TranslatePipe,
    DatePipe
  ],
  templateUrl: './profile-data.component.html',
  styleUrl: './profile-data.component.scss',
})
export class ProfileDataComponent {
  data = input.required<CurrentUserInterface>();
  readonly clickLogout = output();

  protected userRole = computed(() => {
    return UserRoleMap[this.data().role];
  });

}
