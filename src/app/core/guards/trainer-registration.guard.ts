import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../store/states/app.state';
import { Store } from '@ngrx/store';
import { selectTFTrainer } from '../store/selectors/main.selector';
import { TrainerProfile } from '../interfaces/trainer-profile';

export function hasRequiredInfo(trainerInfo: TrainerProfile | null): boolean {
  return !!(
    trainerInfo &&
    trainerInfo.name &&
    trainerInfo.birthdate &&
    // trainerInfo.imageUrl &&
    (trainerInfo.isMinor || !!trainerInfo.dui)
  );
}

@Injectable({
  providedIn: 'root',
})
export class TrainerRegistrationGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectTFTrainer).pipe(
      map(trainerInfo => {
        return (
          hasRequiredInfo(trainerInfo) || this.router.parseUrl('/configuration')
        );
      })
    );
  }
}
