import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonTeamState } from '../../../../core/store/reducers/pokemon-team.reducer';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../../../../core/interfaces/pokemon-details';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  pokemonTeam$: Observable<PokemonDetails[]>;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: [''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
    autoHeight: true,
    autoWidth: true,
  };

  constructor(private store: Store<{ pokemonTeam: PokemonTeamState }>) {
    this.pokemonTeam$ = this.store.select('pokemonTeam', 'team');
  }
}
