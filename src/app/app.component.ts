import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { PokeApiService } from './core/services/poke-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private translocoService: TranslocoService) {}

  isSpanish: boolean = true;

  toggleLanguage(): void {
    this.isSpanish = !this.isSpanish;
    this.translocoService.setActiveLang(this.isSpanish ? 'es' : 'en');
  }
}
