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
import { TrainerItem, TrainerProfile } from './core/interfaces/trainer-profile';
import { PokemonDetails } from './core/interfaces/pokemon-details';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSpanish: boolean = true;
  showTrainerMenu: boolean = false;

  trainerName = 'trainer';
  trainerTeam: PokemonDetails[] = [];
  trainerInfo: TrainerProfile = {};
  trainerList: TrainerItem[] = [];

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
        this.trainerTeam = res;
        this.showTrainerMenu = res.length === environment.numberPokemonPerTeam;

        if (!this.localStorageService.get('trainerList')) {
          this.localStorageService.set('trainerList', []);
        }
        this.trainerList = JSON.parse(
          this.localStorageService.get('trainerList') || ''
        ) as TrainerItem[];
      });

    this.store.select(selectTFTrainer).subscribe(res => {
      if (res) {
        this.trainerName = res.name || 'trainer';
        this.trainerName =
          this.trainerName.charAt(0).toUpperCase() + this.trainerName.slice(1);
        this.trainerInfo = { ...res, imageUrl: null, imageName: null };
      }
    });
  }

  toggleLanguage(): void {
    this.isSpanish = !this.isSpanish;
    this.translocoService.setActiveLang(this.isSpanish ? 'es' : 'en');
  }

  newTrainer(remove = true) {
    const newTrainerItem: TrainerItem = {
      name: this.trainerName,
      trainerInfo: this.trainerInfo,
      team: this.trainerTeam,
    };
    this.trainerList.push(newTrainerItem);
    this.localStorageService.set('trainerList', this.trainerList);
    if (remove) this.removeTrainer();
  }

  switchTrainer(trainer: TrainerItem) {
    this.trainerList = this.trainerList.filter(item => item !== trainer);
    this.newTrainer(false);
    this.changeTrainerUpdateState(trainer);
  }

  changeTrainerUpdateState(trainer: TrainerItem) {
    const currentState = JSON.parse(
      this.localStorageService.get('state') || ''
    ) as AppState;

    const newState = {
      ...currentState,
      trainer: { trainer: trainer.trainerInfo },
      pokemonTeam: { team: trainer.team },
    };

    this.localStorageService.set('state', newState);
    this.router.navigate(['/update-profile']).then(() => {
      window.location.reload(); //Should avoid using reload
    });
  }

  removeTrainer() {
    try {
      if (this.trainerList.length > 0) {
        const lastTrainer = this.trainerList.pop();
        if (lastTrainer) {
          this.changeTrainerUpdateState(lastTrainer);
          this.localStorageService.set('trainerList', this.trainerList);
        }
      } else {
        this.localStorageService.remove('state');
      }
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  }
}
