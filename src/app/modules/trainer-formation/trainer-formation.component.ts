import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/states/app.state';
import { take } from 'rxjs/operators';
import { selectPTFTeam } from '../../core/store/selectors/main.selector';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-trainer-formation',
  templateUrl: './trainer-formation.component.html',
  styleUrls: ['./trainer-formation.component.scss'],
})
export class TrainerFormationComponent {
  isNotEdit = true;

  constructor(private store: Store<AppState>) {
    this.store
      .select(selectPTFTeam)
      .pipe(take(1))
      .subscribe(res => {
        this.isNotEdit = res.length !== environment.numberPokemonPerTeam;
      });
  }
}
