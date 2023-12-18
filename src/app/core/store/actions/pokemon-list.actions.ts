import { createAction, props } from '@ngrx/store';
import { PokemonList } from '../../interfaces/pokemon-list';
import { PokemonDetails } from '../../interfaces/pokemon-details';

export const loadPokemonList = createAction(
  '[Pokemon] Load Pokemon List',
  props<{ limit: number; offset: number }>()
);

export const loadPokemonListSearch = createAction(
  '[Pokemon] Load Pokemon single pokemon',
  props<{ search: string | number }>()
);
export const loadPokemonListSuccess = createAction(
  '[Pokemon] Load Pokemon List Success',
  props<{ list: PokemonList | null }>()
);

export const loadPokemonListSearchSuccess = createAction(
  '[Pokemon] Load Pokemon single Success',
  props<{ pokemon: PokemonDetails }>()
);

export const loadPokemonListFailure = createAction(
  '[Pokemon] Load Pokemon List Failure',
  props<{ error: string | null }>()
);
