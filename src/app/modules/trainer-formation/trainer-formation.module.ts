import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

import { TrainerFormationComponent } from './trainer-formation.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

@NgModule({
  declarations: [TrainerFormationComponent, PokemonListComponent],
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
