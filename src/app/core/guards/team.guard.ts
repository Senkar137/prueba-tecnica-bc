import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/states/app.state';
import { map } from 'rxjs/operators';
import { selectPTFTeam } from '../store/selectors/main.selector';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectPTFTeam).pipe(
      map(trainerInfo => {
        return (
          trainerInfo.length === environment.numberPokemonPerTeam ||
          this.router.parseUrl('/team-formation')
        );
      })
    );
  }
}
