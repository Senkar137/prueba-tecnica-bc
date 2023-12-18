import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listTypes',
})
export class ListTypesPipe implements PipeTransform {
  transform(value?: string[]): string {
    if (!value || value.length === 0) {
      return '';
    }

    const typesListed = value.map(str => this.titleCase(str));
    return typesListed.join(' / ');
  }

  private titleCase(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}
