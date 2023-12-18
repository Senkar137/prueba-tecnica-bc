import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPokemonList } from '../../../../core/store/actions/pokemon-list.actions';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { PokemonDetails } from '../../../../core/interfaces/pokemon-details';
import { loadPokemonTeamSuccess } from '../../../../core/store/actions/pokemon-team.actions';
import { Router } from '@angular/router';
import { LoaderPokeBallService } from '../../../../core/services/loader-pokeball.service';
import { AppState } from '../../../../core/store/states/app.state';
import {
  selectPLFList,
  selectPLFLoading,
  selectPTFTeam,
} from '../../../../core/store/selectors/main.selector';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  loading$: Observable<boolean>;
  pokemonList$: Observable<PokemonDetails[]>;
  pokemonTeam$: Observable<PokemonDetails[]>;
  teamMembersId: number[] = [];
  isFullTeam = false;

  constructor(
    private loaderPokeBallService: LoaderPokeBallService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loaderPokeBallService.showLoader();
    this.loading$ = this.store.select(selectPLFLoading);
    this.pokemonList$ = this.store.select(selectPLFList);
    this.pokemonTeam$ = this.store.select(selectPTFTeam);

    this.pokemonTeam$.subscribe(res => {
      this.teamMembersId = res.map(item => item.id || 0);
      this.isFullTeam = this.teamMembersId.length === 3;
    });
  }

  ngOnInit() {
    this.store.dispatch(loadPokemonList({ limit: 9, offset: 0 }));
    this.loading$.subscribe(res => {
      if (!res) {
        setTimeout(() => {
          this.loaderPokeBallService.hideLoader();
        }, 1000);
      }
    });
  }

  changePage(event: PageEvent) {
    this.store.dispatch(
      loadPokemonList({
        limit: event.pageIndex === 16 ? 7 : 9,
        offset: event.pageIndex * 9,
      })
    );
  }

  saveThisPokemon(pokemon: PokemonDetails) {
    if (pokemon.id && this.teamMembersId.includes(pokemon.id)) {
      return;
    }
    this.store.dispatch(loadPokemonTeamSuccess({ newMember: pokemon }));
  }

  saveTeam() {
    if (this.isFullTeam) {
      this.router.navigate(['/trainer-profile']);
    }
  }
}
