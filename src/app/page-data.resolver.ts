import { ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LanguageService } from './services/language.service';
import { COMPONENT_PAGE_MAP } from './shared/constants';
import { UrlTranslationService } from './services/url-translation.service';

export interface PageData {
  page: string;
  title: string;
  description: string;
  keywords: string;
  image: string;
}

export const pageDataResolver = async (
  route: ActivatedRouteSnapshot
): Promise<PageData> => {
  const lang = route.params['lang'];
  const translatedPage = route.params['translatedPage'];
  const translate = inject(TranslateService);
  const languageService = inject(LanguageService);
  const urlTranslationService = inject(UrlTranslationService);

  if (!languageService.isSupportedLanguage(lang)) {
    return Promise.reject('Unsupported language');
  }

  if (!translatedPage) {
    return Promise.reject('No page provided');
  }

  try {
    await firstValueFrom(translate.use(lang));
    const originalPage = await urlTranslationService.getOriginalPage(
      translatedPage,
      lang
    );

    if (!COMPONENT_PAGE_MAP[originalPage]) {
      return Promise.reject('Page not initialised');
    }

    const translatedData = await firstValueFrom(
      translate.get(`pages.${originalPage}`)
    );

    if (!translatedData || translatedData === `pages.${originalPage}`) {
      return Promise.reject('Page not found');
    }

    return {
      ...translatedData,
      page: originalPage,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
