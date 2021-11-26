import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param noFullProjects filter options
   * @returns list of elements filtered by filterObj or []
   */
  transform(items: any[], noFullProjects: boolean, hasProfessor: boolean): any[] {
    let filteredItems: any[] = [];

    if (!items) {
      return [];
    }
    if (!noFullProjects && !hasProfessor) {
      return items;
    }

    if(noFullProjects && hasProfessor) {
      for(let item of items){
        if(item.currUser < item.maxUser && item.professorId != null){
            filteredItems.push(item);
        }
      }
    }
    else if(noFullProjects && !hasProfessor) {
        for(let item of items){
            if(item.currUser < item.maxUser){
                filteredItems.push(item);
            }
        }
    }
    else if(hasProfessor && !noFullProjects) {
      for(let item of items){
        if(item.professorId != null){
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