import { Component } from '@angular/core';
import { environment } from '@environments/environment';
// import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-gifs-side-menu-header',
  standalone: true,
  imports: [],
  templateUrl: './gifs-side-menu-header.component.html',
})
export class GifsSideMenuHeaderComponent { 

  // se deja la importación con environment de producción porque dependiendo el contexto
  // de producción o desarrollo será cambiado automáticamente con la configuración de angular.json
  envs = environment;

}
