import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  standalone: true,
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent implements AfterViewInit{
  
  //Se ejecuta cuando la vista ya cargó
  //indica que se ocupe el mismo valor de scrollTop que ya se tenía
  //para cargar el componente como estaba antes de cambiar de página
  ngAfterViewInit(): void {

    const scrollDiv = this.scrollDivref()?.nativeElement;
    if(!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  } 

  gifService = inject( GifService );
  scrollStateService = inject( ScrollStateService );

  //viewChild obtiene parámetros de algun selector o referencia local
  //en este caso se usa la referencia local para más comodidad

  scrollDivref = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll = (event: Event) =>{
    const scrollDiv = this.scrollDivref()?.nativeElement;

    if(!scrollDiv) return;

    //scrollTop-> indica cuanto ha recorrido el div desde el inicio hasta donde va el scroll actualmente
    //clientHeight-> indica el tamaño de pantalla que usa el navegador para mostrar el div
    //scrollHeight-> indica el tamaño del bloque div que se está recorriendo
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    // console.log({ScrollTotal: scrollTop + clientHeight, scrollHeight})

    //en este caso el 300 es un numero cualquiera para indicar que el usuario se está
    //acercando al fondo de un elemento cuando se hace el scroll
    const isAtBottom = ( scrollTop + clientHeight + 300 ) >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);


    if(isAtBottom)
    {
      this.gifService.loadTrendingGifs();
    }

  }

}
