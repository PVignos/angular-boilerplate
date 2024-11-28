import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private preferredLanguage: string | null = null;

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  initLanguage() {
    // Usa la variabile locale o imposta la lingua di default
    if (this.preferredLanguage) {
      this.translate.use(this.preferredLanguage);
    } else {
      this.translate.use(this.translate.getDefaultLang());
    }
  }

  setLanguage(lang: string) {
    this.preferredLanguage = lang; // Memorizza la lingua in una variabile locale
    this.translate.use(lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.translate.getDefaultLang();
  }
}
