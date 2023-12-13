import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

import { TrainerProfileComponent } from './trainer-profile.component';

@NgModule({
  declarations: [TrainerProfileComponent],
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
