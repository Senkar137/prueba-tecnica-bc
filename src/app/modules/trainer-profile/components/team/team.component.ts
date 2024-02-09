import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../../../../core/interfaces/pokemon-details';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { selectPTFTeam } from '../../../../core/store/selectors/main.selector';
import { AppState } from '../../../../core/store/states/app.state';

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

  constructor(private store: Store<AppState>) {
    this.pokemonTeam$ = this.store.select(selectPTFTeam);
  }
}
