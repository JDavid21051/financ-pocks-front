import {Component, inject, OnInit} from '@angular/core';
import {EntitiesStore} from '@core/infrastructure/store/financial-entities/entities.store';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'pock-container-entities-list',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './container-entities-list.component.html',
  styleUrl: './container-entities-list.component.scss',
})
export class ContainerEntitiesListComponent implements OnInit {
  list: any[] = [];
  private readonly serviceList = inject(EntitiesStore);


  ngOnInit(): void {
    this.serviceList.list().subscribe({
      next: (list) => {
        console.log(list);
        this.list = list;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
