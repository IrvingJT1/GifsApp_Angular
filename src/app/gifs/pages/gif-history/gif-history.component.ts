import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-gif-history',
  standalone: true,
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent { 

  gifService = inject(GifService);

  // en este caso se usa inject(ActivatedRoute).params para tener acceso dinamicamente a los parámetros de la url de la página
  // inject(ActivatedRoute).params es un observable al cual se le puede aplicar el respectivo pipe y
  // las funciones de rxjs para obtener el parámetro deseado, en este caso query (definido asi en app.routes)
  // ese observable se puede convertir en un signal y de esa manera puede ser invocado en la vista 

  query = toSignal(inject(ActivatedRoute).params.pipe(
    map(params => params['query'])
  ));

  gifsByKey = computed(()=>{
    return this.gifService.getHistoryGifs(this.query())
  });
}
