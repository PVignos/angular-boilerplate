import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':lang/:page',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server,
    async getPrerenderParams() {
      return [
        { lang: 'en', page: 'about' },
        { lang: 'it', page: 'about' },
      ];
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
