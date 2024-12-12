import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '../shared/constants';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class UrlTranslationService {
  private urlTranslations: Record<string, Record<string, { path: string }>> =
    {};

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.initializeUrlTranslations();
  }

  private async initializeUrlTranslations() {
    for (const lang of LANGUAGES) {
      const translations = await this.translate
        .getTranslation(lang.code)
        .toPromise();
      this.urlTranslations[lang.code] = translations?.['pages'] || {};
    }
  }

  async ensureTranslationsLoaded(): Promise<void> {
    if (Object.keys(this.urlTranslations).length === 0) {
      await this.initializeUrlTranslations();
    }
  }

  async getTranslatedUrl(page: string, lang: string): Promise<string> {
    await this.ensureTranslationsLoaded();

    const pageData = this.urlTranslations[lang]?.[page];
    return pageData?.path || page;
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
