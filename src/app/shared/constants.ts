import { Type } from '@angular/core';
import { HomeComponent } from '../pages/home/home.component';
import { AboutComponent } from '../pages/about/about.component';
import { NotFoundComponent } from '../pages/notFound/not-found.component';

export type ComponentPageType = Type<HomeComponent | AboutComponent>;

export const COMPONENT_PAGE_MAP: Record<string, ComponentPageType> = {
  home: HomeComponent,
  about: AboutComponent,
  notFound: NotFoundComponent,
};

export const LANGUAGES: { code: string; label: string }[] = [
  {
    code: 'en',
    label: 'English',
  },
  {
    code: 'it',
    label: 'Italiano',
  },
];
