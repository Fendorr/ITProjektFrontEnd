import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param filterObj filter options
   * @returns list of elements filtered by filterObj or []
   */
  transform(items: any[], filterObj: any): any[] {
    let filteredItems: any[] = [];

    if (!items) {
      return [];
    }
    if (!filterObj) {
      return items;
    }

    if(filterObj) {
        for(let item of items){
            if(item.currUser < item.maxUser){
                filteredItems.push(item);
            }
        }
    }
    else {
        filteredItems = items;
    }

    return filteredItems;
  }
}