// pokemon.state.ts
import { createReducer, on } from '@ngrx/store';
import { PokemonList } from '../../interfaces/pokemon-list';
import {
  loadPokemonList,
  loadPokemonListFailure,
  loadPokemonListSuccess,
} from '../actions/pokemon-list.actions';

export interface PokemonListState {
  list: PokemonList | null;
  loading: boolean;
  error: string | null;
}

export const initialState: PokemonListState = {
  list: null,
  loading: false,
  error: null,
};

export const pokemonListReducer = createReducer(
  initialState,
  on(loadPokemonList, state => ({ ...state, loading: true })),
  on(loadPokemonListSuccess, (state, { list }) => ({
    ...state,
    list,
    loading: false,
  })),
  on(loadPokemonListFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
