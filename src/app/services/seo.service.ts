import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translateService: TranslateService
  ) {}

  setSeoData(pageKey: string): void {
    this.translateService
      .get([
        `pages.${pageKey}.title`,
        `pages.${pageKey}.description`,
        `pages.${pageKey}.keywords`,
        `pages.${pageKey}.image`,
      ])
      .subscribe((translations) => {
        this.titleService.setTitle(translations[`pages.${pageKey}.title`]);

        this.metaService.updateTag({
          name: 'description',
          content: translations[`pages.${pageKey}.description`],
        });
        this.metaService.updateTag({
          name: 'keywords',
          content: translations[`pages.${pageKey}.keywords`],
        });
        this.metaService.updateTag({
          property: 'og:title',
          content: translations[`pages.${pageKey}.title`],
        });
        this.metaService.updateTag({
          property: 'og:description',
          content: translations[`pages.${pageKey}.description`],
        });
        this.metaService.updateTag({
          property: 'og:image',
          content: translations[`pages.${pageKey}.image`],
        });
      });
  }
}
