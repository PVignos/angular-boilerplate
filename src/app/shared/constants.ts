import { Type } from '@angular/core';
import { HomeComponent } from '../pages/home/home.component';
import { AboutComponent } from '../pages/about/about.component';

export type ComponentPageType = Type<HomeComponent | AboutComponent>;

export const COMPONENT_PAGE_MAP: Record<string, ComponentPageType> = {
  home: HomeComponent,
  about: AboutComponent,
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
