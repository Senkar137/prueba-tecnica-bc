import { NgModule } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { PokeApiService } from './services/poke-api.service';
import { LoaderService } from './services/loader.service';
import { PokemonIdPipe } from './pipes/pokemon-id.pipe';

@NgModule({
  declarations: [PokemonIdPipe],
  imports: [],
  providers: [LocalStorageService, PokeApiService, LoaderService],
  exports: [PokemonIdPipe],
})
export class CoreModule {}
