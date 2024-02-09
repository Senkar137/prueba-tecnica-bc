import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class LoaderPokeBallService {
  private loaderSubject = new Subject<boolean>();
  loader$: Observable<boolean> = this.loaderSubject.asObservable();

  constructor() {
    this.hideLoader();
  }

  showLoader() {
    this.loaderSubject.next(true);
  }

  hideLoader() {
    this.loaderSubject.next(false);
  }
}
