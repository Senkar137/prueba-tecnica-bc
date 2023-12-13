import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

import { TrainerSettingsComponent } from './trainer-settings.component';

@NgModule({
  declarations: [TrainerSettingsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TrainerSettingsComponent,
      },
    ]),
  ],
})
export class TrainerSettingsModule {}
