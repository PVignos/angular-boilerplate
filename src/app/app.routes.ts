import { Routes } from '@angular/router';
import { inject, Injector, runInInjectionContext } from '@angular/core';
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
