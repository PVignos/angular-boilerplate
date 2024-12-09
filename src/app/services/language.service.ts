import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
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

  public isSupportedLanguage(lang: string | null): boolean {
    return !!LANGUAGES.find(({ code }) => code === (lang || ''));
  }

  private async updateUrl(lang: string): Promise<void> {
    const urlSegments = this.router.url.split('/');
    if (urlSegments.length > 1) {
      const currentLang = urlSegments[1];
      if (currentLang === lang) {
        return;
      }
      urlSegments[1] = lang;

      // Get the current page key
      const currentPageKey = this.getCurrentPageKey(urlSegments);

      if (currentPageKey) {
        // Get the localized path for the current page
        urlSegments[2] = await this.getLocalizedPath(lang, currentPageKey);
      }

      this.router.navigateByUrl(urlSegments.join('/'), { replaceUrl: true });
    }
  }

  private getCurrentPageKey(urlSegments: string[]): string | null {
    if (urlSegments.length <= 2) return 'index';
    const currentPath = urlSegments[2];
    // You might need to implement a reverse lookup here
    // to find the page key based on the current path
    // This is a simplified example
    return (
      Object.keys(this.translate.instant('pages')).find(
        (key) => this.translate.instant(`pages.${key}.path`) === currentPath
      ) || null
    );
  }

  private async getLocalizedPath(
    lang: string,
    pageKey: string
  ): Promise<string> {
    await this.translate.use(lang).toPromise();
    return this.translate.instant(`pages.${pageKey}.path`);
  }
}
