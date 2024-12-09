import { ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LanguageService } from './services/language.service';

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
  const page = route.params['page'];
  const translate = inject(TranslateService);
  const languageService = inject(LanguageService);

  if (!languageService.isSupportedLanguage(lang)) {
    return Promise.reject('Unsupported language');
  }

  if (!page) {
    return Promise.reject('No page provided');
  }

  try {
    await firstValueFrom(translate.use(lang));
    const translatedData = await firstValueFrom(translate.get(`pages.${page}`));

    if (!translatedData || translatedData === `pages.${page}`) {
      return Promise.reject('Page not found');
    }

    return {
      ...translatedData,
      page,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
