import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { ApiResponseInterceptor } from './core/interceptors/api-response.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { PokemonListEffects } from './core/store/effects/pokemon-list.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { recoverState } from './core/store/reducers/meta-reducers';
import { LocalStorageService } from './core/services/local-storage.service';
import { PokeApiService } from './core/services/poke-api.service';
import { LoaderPokeBallService } from './core/services/loader-pokeball.service';
import { APP_REDUCERS } from './core/store/states/app.state';

const services = [LocalStorageService, PokeApiService, LoaderPokeBallService];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    StoreModule.forRoot(APP_REDUCERS, { metaReducers: [recoverState] }),
    EffectsModule.forRoot([PokemonListEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    TranslocoRootModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiResponseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
