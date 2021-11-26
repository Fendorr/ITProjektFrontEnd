import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param members sort variable 
   * @param createdAt sort variable
   * @param popularity sort variable
   * @returns list of elements filtered by search text or []
   */
  transform(items: any[], members: number, createdAt: number, popularity: number): any[] {
    if (!items) {
      return [];
    }
    //searchText = searchText.toLocaleLowerCase();
    console.log(members);
    console.log(createdAt);
    console.log(popularity);

    if(members != 0) {
        if(members == 1){
            items.sort((a,b) => {
                return a.currUser - b.currUser
            })
        }
        else {
            items.sort((a,b) => {
                return b.currUser - a.currUser
            })
        }
    }
    else if(createdAt != 0) {
        if(createdAt == 1) {
            items.sort((a,b) => {
               return a.createdAt - b.createdAt
            })
        }
        else {
            items.sort((a,b) => {
                return b.createdAt - a.createdAt
            })
        }
    }
    else if(popularity != 0) {
        if(popularity == 1) {
            items.sort((a,b) => {
                return a.projectLikes.length - b.projectLikes.length
            })
        }
        else {
            items.sort((a,b) => {
                return b.projectLikes.length - a.projectLikes.length
            })
        }
    }
    else {
        return items; 
    }

    return items;
  }
}