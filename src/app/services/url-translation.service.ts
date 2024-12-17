import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '../shared/constants';
import { LanguageService } from './language.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UrlTranslationService {
  private urlTranslations: Record<string, Record<string, { path: string }>> =
    {};
  private initializationPromise: Promise<void> | null = null;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  public async initializeUrlTranslations() {
    if (!this.initializationPromise) {
      this.initializationPromise = (async () => {
        for (const lang of LANGUAGES) {
          const translations = await firstValueFrom(
            this.translate.getTranslation(lang.code)
          );
          this.urlTranslations[lang.code] = translations?.['pages'] || {};
        }
      })();
    }
    return this.initializationPromise;
  }

  async getTranslatedUrl({
    page,
    lang,
    withLang = true,
  }: {
    page: string;
    lang?: string;
    withLang?: boolean;
  }): Promise<string> {
    await this.initializeUrlTranslations();

    lang = lang || this.translate.currentLang;
    const pageData = this.urlTranslations[lang]?.[page || 'index'];
    const path = pageData?.path ? `/${pageData.path}` : '';
    return withLang ? `/${lang}${path}` : `${path}`;
  }

  async switchLanguageAndNavigate(newLang: string): Promise<void> {
    await this.initializeUrlTranslations();

    const currentLang = this.translate.currentLang;
    const currentUrl = this.router.url;

    const originalPage = await this.getOriginalPage({
      translatedUrl: this.stripLanguageFromUrl(currentUrl, currentLang),
      lang: currentLang,
    });

    const newTranslatedUrl = await this.getTranslatedUrl({
      page: originalPage,
      lang: newLang,
    });

    this.translate.use(newLang);

    this.router.navigateByUrl(newTranslatedUrl);
  }

  async getOriginalPage({
    translatedUrl,
    lang = this.languageService.getCurrentLanguage(),
  }: {
    translatedUrl: string;
    lang?: string;
  }): Promise<string> {
    await this.initializeUrlTranslations();
    const entries = Object.entries(this.urlTranslations[lang] || {});
    const found = entries.find(
      ([_, value]) =>
        value.path === translatedUrl ||
        value.path === translatedUrl.replace(/\//g, '')
    );
    return found ? found[0] : '';
  }

  private stripLanguageFromUrl(url: string, lang: string): string {
    const langPrefix = `/${lang}/`;
    return url.startsWith(langPrefix) ? url.slice(langPrefix.length) : url;
  }
}
