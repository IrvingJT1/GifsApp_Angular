import { Gif } from "../interfaces/gifInterface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

//El objetivo del mapper es adecuar los datos de un objeto grande deun API 
//A un objeto tipado con una interfaz más sencilla que facilite su manejo

export class GifMapper{
    static mapGiphyItemToGif( item: GiphyItem ): Gif{
        return {
            id: item.id,
            title: item.title,
            url: item.images.original.url
        }
    }

    static mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[]{
        return items.map(this.mapGiphyItemToGif);
    }
}