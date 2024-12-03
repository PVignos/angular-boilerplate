import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LANGUAGES } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('en');
  language$ = this.languageSubject.asObservable();
  private initialized = false;

  constructor(
    private translate: TranslateService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const urlLang = this.getLanguageFromUrl(event.urlAfterRedirects);

        if (!this.initialized) {
          const defaultLanguage = this.getDefaultLanguage();
          if (urlLang) {
            this.setLanguage(urlLang, false);
          } else {
            this.setLanguage(defaultLanguage, false);
          }
          this.initialized = true;
        } else {
          if (urlLang && urlLang !== this.getCurrentLanguage()) {
            this.setLanguage(urlLang, false);
          }
        }
      });
  }

  setLanguage(lang: string, updateUrl = true): void {
    if (!this.isSupportedLanguage(lang)) {
      lang = this.getDefaultLanguage();
    }
    this.languageSubject.next(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
    }

    this.translate.use(lang);

    if (updateUrl) {
      this.updateUrl(lang);
    }
  }

  getCurrentLanguage(): string {
    return this.languageSubject.getValue();
  }

  private getDefaultLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      const storedLanguage = localStorage.getItem('language');
      const browserLanguage = this.getBrowserLanguage();
      return this.isSupportedLanguage(storedLanguage)
        ? storedLanguage!
        : this.isSupportedLanguage(browserLanguage)
          ? browserLanguage!
          : 'en';
    }
    return 'en';
  }

  private getBrowserLanguage(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = navigator.language.split('-')[0];
      return this.isSupportedLanguage(browserLang) ? browserLang : null;
    }
    return null;
  }

  private getLanguageFromUrl(url: string): string | null {
    const urlSegments = url.split('/');
    const lang = urlSegments.length > 1 ? urlSegments[1] : null;
    return lang && this.isSupportedLanguage(lang) ? lang : null;
  }

  private isSupportedLanguage(lang: string | null): boolean {
    return !!LANGUAGES.find(({ code }) => code === (lang || ''));
  }

  private updateUrl(lang: string): void {
    const urlSegments = this.router.url.split('/');
    if (urlSegments.length > 1) {
      const currentLang = urlSegments[1];

      if (currentLang === lang) {
        return;
      }
      urlSegments[1] = lang;
      this.router.navigateByUrl(urlSegments.join('/'), { replaceUrl: true });
    }
  }
}
