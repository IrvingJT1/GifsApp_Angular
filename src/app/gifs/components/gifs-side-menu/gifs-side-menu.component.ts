import { Component } from '@angular/core';
import { GifsSideMenuHeaderComponent } from './side-menu-header/gifs-side-menu-header.component';
import { GifsSideMenuOptionsComponent } from './side-menu-options/gifs-side-menu-options.component';

@Component({
  selector: 'gifs-side-menu',
  standalone: true,
  imports: [GifsSideMenuHeaderComponent, GifsSideMenuOptionsComponent],
  templateUrl: './gifs-side-menu.component.html'
})
export class GifsSideMenuComponent {
  
 }
