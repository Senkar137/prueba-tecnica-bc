import { NgModule } from '@angular/core';
import { PokemonIdPipe } from './pipes/pokemon-id.pipe';
import { ListTypesPipe } from './pipes/list-types.pipe';

const pipes = [PokemonIdPipe, ListTypesPipe];

@NgModule({
  declarations: [pipes],
  imports: [],
  providers: [],
  exports: [pipes],
})
export class CoreModule {}
