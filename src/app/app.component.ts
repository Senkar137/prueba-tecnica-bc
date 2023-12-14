import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { LoaderService } from './core/services/loader.service';
import { Observable } from 'rxjs';
import { PokemonList } from './core/interfaces/pokemon-list';
import { Store } from '@ngrx/store';
import { loadPokemonList } from './core/store/actions/pokemon-list.actions';
import { PokemonListState } from './core/store/reducers/pokemon-list.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isSpanish: boolean = true;

  showLoader$ = this.loaderService.loader$;
  loading$: Observable<boolean>;
  pokemonList$: Observable<PokemonList | null>;

  constructor(
    private translocoService: TranslocoService,
    private loaderService: LoaderService,
    private store: Store<{ pokemonList: PokemonListState }>
  ) {
    this.loading$ = this.store.select('pokemonList', 'loading');
    this.pokemonList$ = this.store.select('pokemonList', 'list');
  }

  ngOnInit() {
    this.store.dispatch(loadPokemonList());
  }

  toggleLanguage(): void {
    this.isSpanish = !this.isSpanish;
    this.translocoService.setActiveLang(this.isSpanish ? 'es' : 'en');

    this.loaderService.showLoader();
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 2000);
  }
}
