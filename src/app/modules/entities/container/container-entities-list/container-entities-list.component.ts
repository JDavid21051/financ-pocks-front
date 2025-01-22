import {Component, inject, OnInit} from '@angular/core';
import {EntityStore} from '@core/infrastructure/store/financial-entities/entities.store';
import {SpinnerComponent} from '@shared/design/atom/spinner/spinner.component';
import {EntitiesListComponent} from '@modules/entities/feature/entities-list/entities-list.component';

@Component({
  selector: 'pock-container-entities-list',
  standalone: true,
  imports: [SpinnerComponent, EntitiesListComponent],
  templateUrl: './container-entities-list.component.html',
  styleUrl: './container-entities-list.component.scss',
  providers: [EntityStore],
})
export class ContainerEntitiesListComponent implements OnInit {
  private readonly entityStore = inject(EntityStore);
  readonly entityList = this.entityStore.list;
  readonly isLoading = this.entityStore.isLoading;

  ngOnInit(): void {
    this.entityStore.loadData();
  }
}
