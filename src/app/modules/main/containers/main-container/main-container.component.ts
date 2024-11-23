import { Component } from '@angular/core';
import {MainHeaderComponent} from '@modules/main/presentation/main-header/main-header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'pock-main-container',
  standalone: true,
  imports: [
    MainHeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {

}
