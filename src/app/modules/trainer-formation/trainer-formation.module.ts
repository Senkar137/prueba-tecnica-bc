import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

import { TrainerFormationComponent } from './trainer-formation.component';

@NgModule({
  declarations: [TrainerFormationComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TrainerFormationComponent,
      },
    ]),
  ],
})
export class TrainerFormationModule {}
