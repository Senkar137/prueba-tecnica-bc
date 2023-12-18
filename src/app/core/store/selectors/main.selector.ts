import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

export const selectPokemonListFeature = (state: AppState) => state.pokemonList;
export const selectTrainerFeature = (state: AppState) => state.trainer;
export const selectPokemonTeamFeature = (state: AppState) => state.pokemonTeam;

export const selectPLFList = createSelector(selectPokemonListFeature, state =>
  state.list ? state.list.results : []
);

export const selectPLFLoading = createSelector(
  selectPokemonListFeature,
  state => state.loading
);

export const selectTFTrainer = createSelector(
  selectTrainerFeature,
  state => state.trainer
);

export const selectPTFTeam = createSelector(
  selectPokemonTeamFeature,
  state => state.team
);
