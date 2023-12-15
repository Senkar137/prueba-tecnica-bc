import { createAction, props } from '@ngrx/store';
import { PokemonDetails } from '../../interfaces/pokemon-details';

export const loadPokemonTeam = createAction(
  '[Pokemon] Load Pokemon Team',
  props<{ limit: number; offset: number }>()
);
export const loadPokemonTeamSuccess = createAction(
  '[Pokemon] Load Pokemon Team Success',
  props<{ newMember: PokemonDetails }>()
);
export const loadPokemonTeamFailure = createAction(
  '[Pokemon] Load Pokemon Team Failure',
  props<{ error: string }>()
);
