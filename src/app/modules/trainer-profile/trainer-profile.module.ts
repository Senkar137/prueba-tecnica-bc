import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

import { TrainerProfileComponent } from './trainer-profile.component';
import { TeamComponent } from './components/team/team.component';

@NgModule({
  declarations: [TrainerProfileComponent, TeamComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TrainerProfileComponent,
      },
    ]),
  ],
})
export class TrainerProfileModule {}
