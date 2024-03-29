import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as PokemonListActions from '../actions/pokemon-list.actions';
import { PokeApiService } from '../../services/poke-api.service';

@Injectable()
export class PokemonListEffects {
  loadPokemonList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonListActions.loadPokemonList),
      mergeMap(props =>
        this.pokeApiService.getPokemonList(props.limit, props.offset).pipe(
          map(list =>
            PokemonListActions.loadPokemonListSuccess({ list: list.data })
          ),
          catchError(error =>
            of(
              PokemonListActions.loadPokemonListFailure({
                error: 'Error loading Pokemon list',
              })
            )
          )
        )
      )
    )
  );

  loadSinglePokemon = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonListActions.loadPokemonListSearch),
      mergeMap(props => {
        if (typeof props.search === 'number' && props.search > 151) {
          return of(
            PokemonListActions.loadPokemonListFailure({
              error: 'Error finding the pokemon/s',
            })
          );
        }
        return this.pokeApiService.getPokemonDetails(props.search).pipe(
          map(poke => {
            if (poke && poke.data) {
              return PokemonListActions.loadPokemonListSearchSuccess({
                pokemon: poke.data,
              });
            } else {
              return PokemonListActions.loadPokemonListFailure({
                error: 'Error finding the pokemon/s',
              });
            }
          }),
          catchError(error =>
            of(
              PokemonListActions.loadPokemonListFailure({
                error: 'Error finding the pokemon/s',
              })
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private pokeApiService: PokeApiService
  ) {}
}
