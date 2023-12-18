import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TrainerProfile } from '../../core/interfaces/trainer-profile';
import { AppState } from '../../core/store/states/app.state';
import { selectTFTrainer } from '../../core/store/selectors/main.selector';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.scss'],
})
export class TrainerProfileComponent {
  trainerInfo$: Observable<TrainerProfile | null>;

  constructor(private store: Store<AppState>) {
    this.trainerInfo$ = this.store.select(selectTFTrainer);
  }
}
