import { createReducer, on } from '@ngrx/store';
import { PokemonDetails } from '../../interfaces/pokemon-details';
import {
  loadPokemonTeam,
  loadPokemonTeamFailure,
  loadPokemonTeamSuccess,
} from '../actions/pokemon-team.actions';

export interface PokemonTeamState {
  team: PokemonDetails[];
  loading: boolean;
  error: string | null;
}

export const initialState: PokemonTeamState = {
  team: [],
  loading: false,
  error: null,
};

export const pokemonTeamReducer = createReducer(
  initialState,
  on(loadPokemonTeam, state => ({ ...state, loading: true })),
  on(loadPokemonTeamSuccess, (state, { newMember }) => {
    let updatedTeam = [...state.team, newMember];

    if (updatedTeam.length > 3) {
      updatedTeam = updatedTeam.slice(1);
    }

    return {
      ...state,
      team: updatedTeam,
      loading: false,
    };
  }),
  on(loadPokemonTeamFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
