import { createReducer, on } from '@ngrx/store';
import { PokemonDetails, PokemonStats } from '../../interfaces/pokemon-details';
import {
  loadPokemonTeam,
  loadPokemonTeamFailure,
  loadPokemonTeamSuccess,
} from '../actions/pokemon-team.actions';
import { environment } from '../../../../environments/environment';

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

export const statsValueBar = {
  hp: 255,
  attack: 190,
  defense: 230,
  'special-attack': 194,
  'special-defense': 230,
  speed: 180,
};

export const pokemonTeamReducer = createReducer(
  initialState,
  on(loadPokemonTeam, state => ({ ...state, loading: true })),
  on(loadPokemonTeamSuccess, (state, { newMember }) => {
    if (newMember.stats) {
      newMember = {
        ...newMember,
        stats: newMember.stats.map(stat => {
          return <PokemonStats>{
            ...stat,
            percentageBar: (stat.value * 100) / statsValueBar[stat.name],
          };
        }),
      };
    }

    let updatedTeam = [...state.team, newMember];

    if (updatedTeam.length > environment.numberPokemonPerTeam) {
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
