import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { LoaderPokeBallService } from './core/services/loader-pokeball.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './core/store/states/app.state';
import { LocalStorageService } from './core/services/local-storage.service';
import {
  selectPTFTeam,
  selectTFTrainer,
} from './core/store/selectors/main.selector';
import { environment } from '../environments/environment';
import { filter, switchMapTo, take } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSpanish: boolean = true;
  showTrainerMenu: boolean = false;
  trainerName = 'trainer';

  showLoader$: Observable<boolean> = this.loaderPokeBallService.loader$;

  constructor(
    private loaderPokeBallService: LoaderPokeBallService,
    private translocoService: TranslocoService,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        switchMapTo(this.store.select(selectPTFTeam).pipe(take(1)))
      )
      .subscribe(res => {
        this.showTrainerMenu = res.length === environment.numberPokemonPerTeam;
      });

    this.store.select(selectTFTrainer).subscribe(res => {
      this.trainerName = res?.name || 'trainer';
    });
  }

  toggleLanguage(): void {
    this.isSpanish = !this.isSpanish;
    this.translocoService.setActiveLang(this.isSpanish ? 'es' : 'en');
  }

  removeTrainer() {
    try {
      this.localStorageService.remove('state');
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  }
}
