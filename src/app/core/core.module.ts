import { NgModule } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { PokeApiService } from './services/poke-api.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [LocalStorageService, PokeApiService],
})
export class CoreModule {}
