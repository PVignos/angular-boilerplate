import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('en');
  language$ = this.languageSubject.asObservable();

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object // Inject platform ID for SSR check
  ) {
    const defaultLanguage = this.getDefaultLanguage();
    this.setLanguage(defaultLanguage);
  }

  setLanguage(lang: string): void {
    this.languageSubject.next(lang); // Emit the new language value
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
    }
    this.translate.use(lang);
  }

  getCurrentLanguage(): string {
    return this.languageSubject.getValue();
  }

  private getDefaultLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      const storedLanguage = localStorage.getItem('language');
      const browserLanguage = this.getBrowserLanguage();
      return storedLanguage || browserLanguage || 'en';
    }
    return 'en';
  }

  private getBrowserLanguage(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = navigator.language.split('-')[0];
      return ['en', 'it'].includes(browserLang) ? browserLang : null;
    }
    return null;
  }
}
