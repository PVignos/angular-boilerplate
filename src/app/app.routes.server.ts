import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { COMPONENT_PAGE_MAP, LANGUAGES } from './shared/constants';
import { UrlTranslationService } from './services/url-translation.service';
import { inject } from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':lang/:translatedPage',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server,
    async getPrerenderParams() {
      const urlTranslationService = inject(UrlTranslationService);
      await urlTranslationService.ensureTranslationsLoaded();

      const params = await Promise.all(
        LANGUAGES.flatMap(async (language) => {
          const pagePromises = Object.keys(COMPONENT_PAGE_MAP)
            .filter((page) => page !== 'index')
            .map(async (page) => {
              const translatedUrl =
                await urlTranslationService.getTranslatedUrl(
                  page,
                  language.code
                );
              return {
                lang: language.code,
                translatedPage: translatedUrl,
              };
            });
          return await Promise.all(pagePromises);
        })
      );

      return params.flat();
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
