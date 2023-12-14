import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';
import { ApiResponse } from '../interfaces/api-response';
import { PokemonList } from '../interfaces/pokemon-list';
import { map, switchMap } from 'rxjs/operators';
import { PokemonDetails, PokemonStats } from '../interfaces/pokemon-details';

@Injectable()
export class PokeApiService {
  private url = environment.api;
  constructor(private http: HttpClient) {}

  transformPokemonToPokemonDetails(
    pokemon: Pokemon,
    url: string
  ): PokemonDetails {
    const pokeStats: PokemonStats[] = pokemon.stats.map(statItem => {
      return {
        name: statItem.stat.name,
        value: statItem.base_stat,
      };
    });

    return {
      name: pokemon.name,
      url: url,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types.map(typeItem => typeItem.type.name),
      stats: pokeStats,
    };
  }

  getPokemonList(limit = 9, offset = 0): Observable<ApiResponse<PokemonList>> {
    return this.http
      .get<ApiResponse<PokemonList>>(
        `${this.url}pokemon?offset=${offset}&limit=${limit}}`
      )
      .pipe(
        switchMap(apiResponsePokeList => {
          if (!apiResponsePokeList.data) {
            return of(apiResponsePokeList);
          }

          const requestDetailsForEachPokemon =
            apiResponsePokeList.data.results.map(pokeItem =>
              this.http.get<ApiResponse<Pokemon>>(pokeItem.url).pipe(
                map(pokeDetails => {
                  if (!pokeDetails.data) {
                    return { name: pokeItem.name, url: pokeItem.url };
                  }

                  return this.transformPokemonToPokemonDetails(
                    pokeDetails.data,
                    pokeItem.url
                  );
                })
              )
            );

          return forkJoin(requestDetailsForEachPokemon).pipe(
            map(result => {
              if (apiResponsePokeList.data) {
                apiResponsePokeList.data.results = result;
              }
              return apiResponsePokeList;
            })
          );
        })
      );
  }

  getPokemonDetails(
    pokemonSearch: number | string
  ): Observable<ApiResponse<PokemonDetails>> {
    const urlString = `${this.url}pokemon/${pokemonSearch}`;

    return this.http.get<ApiResponse<Pokemon>>(urlString).pipe(
      map(response => {
        if (!response.data) {
          return { ...response, data: null };
        }

        return {
          ...response,
          data: this.transformPokemonToPokemonDetails(response.data, urlString),
        };
      })
    );
  }

  getMyTeamPokemonDetails(
    pokemonList: number[]
  ): Observable<ApiResponse<PokemonDetails[]>> {
    const requests = pokemonList.map(toRequest => {
      return this.getPokemonDetails(toRequest);
    });

    return forkJoin(requests).pipe(
      map(response => {
        const apiResponseTeam: ApiResponse<PokemonDetails[]> = {
          statusCode: response[response.length - 1].statusCode,
          errorMessage: response[response.length - 1].errorMessage,
          data: response.map(item => item.data) as PokemonDetails[],
        };

        return apiResponseTeam;
      })
    );
  }
}
