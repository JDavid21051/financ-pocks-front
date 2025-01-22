import {AfterViewInit, Component, input, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {
  MatTableDataSource, MatTableModule,
} from '@angular/material/table';
import {AccountModel} from '@modules/accounts/models/accounts.model';

@Component({
  selector: 'pock-accounts-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './accounts-list.component.html',
})
export class AccountsListComponent  implements AfterViewInit {
  readonly data = input.required<AccountModel[]>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  protected readonly displayedColumns: string[] = ['name', 'description', 'entered_at'];
  readonly dataSource: MatTableDataSource<AccountModel> = new MatTableDataSource<AccountModel>();

  ngAfterViewInit(): void {
    this.dataSource.data = this.data();
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }
}
