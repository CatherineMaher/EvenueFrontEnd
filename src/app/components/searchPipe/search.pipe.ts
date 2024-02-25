import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(list: any[], term: string): any[] {
    console.log('here');
    console.log(list);
    console.log(term);

    return list.filter(
      (elem => elem && elem.title?.toLowerCase().includes(term.toLowerCase()))
    );
  }
}
