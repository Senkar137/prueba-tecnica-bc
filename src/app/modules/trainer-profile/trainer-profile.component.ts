import { Component } from '@angular/core';
import { TrainerState } from '../../core/store/reducers/trainer.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TrainerProfile } from '../../core/interfaces/trainer-profile';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.scss'],
})
export class TrainerProfileComponent {
  trainerInfo$: Observable<TrainerProfile | null>;

  constructor(private store: Store<{ trainer: TrainerState }>) {
    this.trainerInfo$ = this.store.select('trainer', 'trainer');
  }
}
