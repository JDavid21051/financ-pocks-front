import { Component } from '@angular/core';
import {MainHeaderComponent} from '@modules/main/containers/main-header/main-header.component';

@Component({
  selector: 'pock-main-container',
  standalone: true,
  imports: [
    MainHeaderComponent,
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {

}
