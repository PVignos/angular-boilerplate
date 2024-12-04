import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'en',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'it',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'en/:page',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'it/:page',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
