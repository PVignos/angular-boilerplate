import { Routes } from '@angular/router';
import { languageMatcherFactory } from './language-matcher';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/en',
    pathMatch: 'full',
  },
  {
    matcher: languageMatcherFactory(['en', 'it']),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component').then((m) => m.AboutComponent),
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
