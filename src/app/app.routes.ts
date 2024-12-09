import { LangGuard } from './lang.guard';
import { PageGuard } from './page.guard';
import { pageDataResolver } from './page-data.resolver';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/notFound/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: ':lang',
    canActivate: [LangGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: ':page',
        canActivateChild: [PageGuard],
        resolve: {
          pageData: pageDataResolver,
        },
        loadComponent: () =>
          import('./pages/dynamicPage/dynamic-page.component').then(
            (m) => m.DynamicPageComponent
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/notFound/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
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
