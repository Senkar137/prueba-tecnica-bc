import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  set(key: string, value: any): void {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
