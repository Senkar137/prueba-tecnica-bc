import { PokemonDetails } from './pokemon-details';

export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: PokemonDetails[];
}
