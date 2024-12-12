import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { COMPONENT_PAGE_MAP, LANGUAGES } from './shared/constants';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':lang/:page',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server,
    async getPrerenderParams() {
      return LANGUAGES.flatMap((language) =>
        Object.keys(COMPONENT_PAGE_MAP)
          .filter((page) => page !== 'index')
          .map((page) => ({
            lang: language.code,
            page,
          }))
      );
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
