import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

import { TrainerSettingsComponent } from './trainer-settings.component';
import { SelectProfileImageComponent } from './components/select-profile-image/select-profile-image.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';

@NgModule({
  declarations: [
    TrainerSettingsComponent,
    SelectProfileImageComponent,
    ProfileFormComponent,
  ],
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
