import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption{
  label: string;
  subLabel: string;
  router: string;
  icon: string;
}

@Component({
  selector: 'app-gifs-side-menu-options',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.component.html'
})
export class GifsSideMenuOptionsComponent { 

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs populares',
      router: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      router: '/dashboard/search'
    },
  ];

}
