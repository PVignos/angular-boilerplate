import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((x) => x.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((x) => x.AboutComponent),
  },
];

export function generateRoutes(): Routes {
  const translate = inject(TranslateService);
  const translations = translate.instant('pages');

  return [
    {
      path: translations['index'].path, // URL da traduzione
      loadComponent: () =>
        import('./home/home.component').then((x) => x.HomeComponent),
      title: translations['index'].title,
    },
    {
      path: translations['about'].path, // URL da traduzione
      loadComponent: () =>
        import('./about/about.component').then((x) => x.AboutComponent),
      title: translations['about'].title,
    },
  ];
}
