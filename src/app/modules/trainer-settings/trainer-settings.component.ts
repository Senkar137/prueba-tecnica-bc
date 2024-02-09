import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/states/app.state';
import { selectTFTrainer } from '../../core/store/selectors/main.selector';
import { take } from 'rxjs/operators';
import { hasRequiredInfo } from '../../core/guards/trainer-registration.guard';

@Component({
  selector: 'app-trainer-settings',
  templateUrl: './trainer-settings.component.html',
  styleUrls: ['./trainer-settings.component.scss'],
})
export class TrainerSettingsComponent {
  isNotEdit = true;

  constructor(private store: Store<AppState>) {
    this.store
      .select(selectTFTrainer)
      .pipe(take(1))
      .subscribe(res => {
        this.isNotEdit = !hasRequiredInfo(res);
      });
  }
}
