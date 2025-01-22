import {Component, inject, OnInit} from '@angular/core';
import {AccountStore} from '@core/infrastructure/store/accounts/account.store';
import {SpinnerComponent} from '@shared/design/atom/spinner/spinner.component';
import {AccountsListComponent} from '@modules/accounts/feature/accounts-list/accounts-list.component';

@Component({
  selector: 'pock-container-accounts-list',
  standalone: true,
  imports: [
    SpinnerComponent,
    AccountsListComponent,
  ],
  templateUrl: './container-accounts-list.component.html',
  styleUrl: './container-accounts-list.component.scss',
  providers: [AccountStore]
})
export class ContainerAccountsListComponent implements OnInit{
  private readonly accountStore = inject(AccountStore);
  readonly accountList = this.accountStore.list;
  readonly isLoading = this.accountStore.isLoading;

  ngOnInit(): void {
    this.accountStore.loadData();
  }
}
