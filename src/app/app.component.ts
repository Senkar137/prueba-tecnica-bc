import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSpanish: boolean = true;
  showLoader$ = this.loaderService.loader$;

  constructor(
    private translocoService: TranslocoService,
    private loaderService: LoaderService
  ) {}

  toggleLanguage(): void {
    this.isSpanish = !this.isSpanish;
    this.translocoService.setActiveLang(this.isSpanish ? 'es' : 'en');
  }
}
