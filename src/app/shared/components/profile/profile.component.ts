import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrainerState } from '../../../core/store/reducers/trainer.reducer';
import { Observable } from 'rxjs';
import { TrainerProfile } from '../../../core/interfaces/trainer-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  trainerInfo$: Observable<TrainerProfile | null>;

  @Input() isProfile: boolean = false;

  constructor(private store: Store<{ trainer: TrainerState }>) {
    this.trainerInfo$ = store.select('trainer', 'trainer');
  }
}
