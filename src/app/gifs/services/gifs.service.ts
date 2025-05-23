import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import type { GiphyResponse } from "../interfaces/giphy.interfaces";
import { Gif } from "../interfaces/gifInterface";
import { GifMapper } from "../mapper/gif.mapper";
import { map, Observable, tap } from "rxjs";

const GIF_KEY = 'gifs';

//Cuando se importan interfaces se puede usar la palabra reservada type para ayudar al compilador
//a indicar que no se debe hacer más con esa línea

const loadGifsFromLocalStorage = () => {

    // ?? indica que si el argumento de la izquierda es null o undefined, se obtará por el de la derecha
    const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
    const gifs = JSON.parse(gifsFromLocalStorage);

    return gifs;
    
}

@Injectable({providedIn: 'root'})
export class GifService {
    
    //Ahora http se inyecta en el servicio de esta forma, pero debe ser instanciado o proveído  
    //en el archivo app.config.ts
    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(false);

    private trendingPage = signal(0)

    trendingGifGroup = computed<Gif[][]>(() => {
        const groups = [];

        for (let index = 0; index < this.trendingGifs().length; index+=3) {
            
            groups.push(this.trendingGifs().slice(index, index + 3));
            
        }
        return groups;
    });

    searchHistory = signal<Record<string, Gif[]>>(loadGifsFromLocalStorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

    constructor(){
        this.loadTrendingGifs();
    }

    saveGifsToLocalStorage = effect(()=> {
        
        const historyString = JSON.stringify(this.searchHistory());

        localStorage.setItem(GIF_KEY, historyString );

    })

    

    loadTrendingGifs = () =>{

        if(this.trendingGifsLoading()) return;

        this.trendingGifsLoading.set(true);

        //Esta es la forma de hacer una petición a la siguiente URL 
        // 'https://api.giphy.com/v1/gifs/trending?api_key=ESz0vqtnFt6q7UUC2s6TVpVP74ryZxft&limit=25'
        //Definiendo una variable de entorno para la URL base
        //Añadiendo el texto '/gifs/trending'
        //Añadiendo los respectivos parámetros al identificar el signo ? en la URL original
        this.http.get<GiphyResponse>(`${ environment.giphyURL }/gifs/trending`,{
            params:{
                api_key: environment.giphyApiKey,
                limit: 20,
                offset: this.trendingPage() * 20,
            }
        }).subscribe((resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.trendingGifs.update( currentGifs => [ ...currentGifs, ...gifs ]);
            this.trendingPage.update( page => page + 1 );
            this.trendingGifsLoading.set(false);
        });

    }

    searchGifs = (query: string): Observable<Gif[]> => {
        return this.http.get<GiphyResponse>(`${environment.giphyURL}/gifs/search`,{
            params:{
                api_key: environment.giphyApiKey,
                q:query,
                limit: 25
            }
        }).pipe(
            map( ({data}) => data ),
            map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
            tap((items) => {
                this.searchHistory.update( history => ({
                    ...history,
                    [query.toLowerCase()]: items
                }))
            })
        );
        
    }

    getHistoryGifs = (query:string): Gif[] => {
        return this.searchHistory()[query] ?? [];
    }
}