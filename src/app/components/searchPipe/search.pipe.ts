import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(list: any[], term: string): any[] {
    console.log('ByName');
    console.log(term);
    console.log(list);
    console.log("-------------------------------------------");
    

    return list.filter(
      (elem => elem && elem.title?.toLowerCase().includes(term.toLowerCase()))
    );
  }
}
