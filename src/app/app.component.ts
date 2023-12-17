import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { LoaderPokeBallService } from './core/services/loader-pokeball.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSpanish: boolean = true;
  showLoader$: Observable<boolean> = this.loaderPokeBallService.loader$;

  constructor(
    private loaderPokeBallService: LoaderPokeBallService,
    private translocoService: TranslocoService
  ) {}

  toggleLanguage(): void {
    this.isSpanish = !this.isSpanish;
    this.translocoService.setActiveLang(this.isSpanish ? 'es' : 'en');
  }
}
