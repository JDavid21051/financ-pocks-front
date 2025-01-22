import {AfterViewInit, Component, input, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {FinancialEntity} from '@modules/entities/model/financial-entities.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'pock-entities-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DatePipe
  ],
  templateUrl: './entities-list.component.html',
  styleUrl: './entities-list.component.scss'
})
export class EntitiesListComponent implements AfterViewInit {
  readonly data = input.required<FinancialEntity[]>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  protected readonly displayedColumns: string[] = ['name', 'nit', 'location', 'entered_at'];
  readonly dataSource: MatTableDataSource<FinancialEntity> = new MatTableDataSource<FinancialEntity>();

  ngAfterViewInit(): void {
    this.dataSource.data = this.data();
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }

}
