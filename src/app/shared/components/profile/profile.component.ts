import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TrainerProfile } from '../../../core/interfaces/trainer-profile';
import { AppState } from '../../../core/store/states/app.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  trainerInfo$: Observable<TrainerProfile | null>;

  @Input() isProfile: boolean = false;

  constructor(private store: Store<AppState>) {
    this.trainerInfo$ = store.select('trainer', 'trainer');
  }
}
