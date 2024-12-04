import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { languageMatcherFactory } from './language-matcher';
import { TranslateService } from '@ngx-translate/core';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface PageData {
  title: string;
  description: string;
  keywords: string;
  image: string;
}

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'en',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/home/home.component').then(
                (m) => m.HomeComponent
              ),
          },
          {
            path: ':page',
            loadComponent: () =>
              import('./pages/dynamicPage/dynamic-page.component').then(
                (m) => m.DynamicPageComponent
              ),
            resolve: {
              pageData: (route: ActivatedRouteSnapshot): Promise<PageData> => {
                const translate = inject(TranslateService);
                const page = route.params['page'];
                return firstValueFrom(
                  translate.get(`pages.${page}`)
                ) as Promise<PageData>;
              },
            },
          },
        ],
      },
      {
        path: 'it',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/home/home.component').then(
                (m) => m.HomeComponent
              ),
          },
          {
            path: ':page',
            loadComponent: () =>
              import('./pages/dynamicPage/dynamic-page.component').then(
                (m) => m.DynamicPageComponent
              ),
            resolve: {
              pageData: (route: ActivatedRouteSnapshot): Promise<PageData> => {
                const translate = inject(TranslateService);
                const page = route.params['page'];
                return firstValueFrom(
                  translate.get(`pages.${page}`)
                ) as Promise<PageData>;
              },
            },
          },
        ],
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/notFound/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
