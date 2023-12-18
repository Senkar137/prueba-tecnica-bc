import {
  pokemonListReducer,
  PokemonListState,
} from '../reducers/pokemon-list.reducer';
import { trainerReducer, TrainerState } from '../reducers/trainer.reducer';
import {
  pokemonTeamReducer,
  PokemonTeamState,
} from '../reducers/pokemon-team.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  pokemonList: PokemonListState;
  trainer: TrainerState;
  pokemonTeam: PokemonTeamState;
}

export const APP_REDUCERS: ActionReducerMap<AppState> = {
  pokemonList: pokemonListReducer,
  trainer: trainerReducer,
  pokemonTeam: pokemonTeamReducer,
};
