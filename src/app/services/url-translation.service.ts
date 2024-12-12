import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '../shared/constants';
import { LanguageService } from './language.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlTranslationService {
  private urlTranslations: Record<string, Record<string, { path: string }>> =
    {};
  private initializationPromise: Promise<void> | null = null;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  private async initializeUrlTranslations() {
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

  async ensureTranslationsLoaded(): Promise<void> {
    await this.initializeUrlTranslations();
  }

  async getTranslatedUrl(
    page: string,
    lang: string,
    withLang = false
  ): Promise<string> {
    await this.ensureTranslationsLoaded();
    const pageData = this.urlTranslations[lang]?.[page];
    return withLang
      ? `/${lang}/${pageData?.path || page}`
      : pageData?.path || page;
  }

  async getOriginalPage(translatedUrl: string, lang?: string): Promise<string> {
    await this.ensureTranslationsLoaded();
    if (!lang) {
      lang = this.languageService.getCurrentLanguage();
    }
    const entries = Object.entries(this.urlTranslations[lang] || {});
    const found = entries.find(([_, value]) => value.path === translatedUrl);
    return found ? found[0] : '';
  }
}
