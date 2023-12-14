import { NgModule } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { PokeApiService } from './services/poke-api.service';
import { LoaderService } from './services/loader.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [LocalStorageService, PokeApiService, LoaderService],
})
export class CoreModule {}
