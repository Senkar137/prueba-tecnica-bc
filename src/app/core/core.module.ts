import { NgModule } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { PokeApiService } from './services/poke-api.service';
import { LoaderService } from './services/loader.service';
import { PokemonIdPipe } from './pipes/pokemon-id.pipe';
import { ListTypesPipe } from './pipes/list-types.pipe';

const pipes = [PokemonIdPipe, ListTypesPipe];

@NgModule({
  declarations: [pipes],
  imports: [],
  providers: [LocalStorageService, PokeApiService, LoaderService],
  exports: [pipes],
})
export class CoreModule {}
