import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  standalone: true,
  imports: [],
  templateUrl: './gif-list-item.component.html',
})
export class GifListItemComponent { 

  url = input.required<string>();

}
