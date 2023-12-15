import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonId',
})
export class PokemonIdPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (!value) {
      return '#000';
    }
    return `#${value.toString().padStart(3, '0')}`;
  }
}
