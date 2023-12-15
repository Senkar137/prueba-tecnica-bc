import { createAction, props } from '@ngrx/store';
import { PokemonList } from '../../interfaces/pokemon-list';

export const loadPokemonList = createAction(
  '[Pokemon] Load Pokemon List',
  props<{ limit: number; offset: number }>()
);
export const loadPokemonListSuccess = createAction(
  '[Pokemon] Load Pokemon List Success',
  props<{ list: PokemonList | null }>()
);
export const loadPokemonListFailure = createAction(
  '[Pokemon] Load Pokemon List Failure',
  props<{ error: string }>()
);
