import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { PokeApiService } from './core/services/poke-api.service';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showLoader$ = this.loaderService.loader$;

  constructor(
    private translocoService: TranslocoService,
    private loaderService: LoaderService
  ) {}

  isSpanish: boolean = true;

  toggleLanguage(): void {
    this.isSpanish = !this.isSpanish;
    this.translocoService.setActiveLang(this.isSpanish ? 'es' : 'en');

    this.loaderService.showLoader();
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 2000);
  }
}
