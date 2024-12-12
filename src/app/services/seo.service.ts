import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translateService: TranslateService
  ) {}

  setSeoData(pageKey: string, translatedUrl: string): void {
    const currentLang = this.translateService.currentLang;
    const supportedLangs = this.translateService.getLangs();

    this.translateService
      .get([
        `pages.${pageKey}.title`,
        `pages.${pageKey}.description`,
        `pages.${pageKey}.keywords`,
        `pages.${pageKey}.image`,
      ])
      .subscribe((translations) => {
        // Set title
        this.titleService.setTitle(translations[`pages.${pageKey}.title`]);

        // Set description
        this.metaService.updateTag({
          name: 'description',
          content: translations[`pages.${pageKey}.description`],
        });

        // Set canonical URL
        const canonicalUrl = `${environment.apiUrl}/${currentLang}/${translatedUrl}`;
        this.metaService.updateTag({
          rel: 'canonical',
          href: canonicalUrl,
        });

        // Set hreflang tags
        supportedLangs.forEach((lang) => {
          const hreflangUrl = `${environment.apiUrl}/${lang}/${translatedUrl}`;
          this.metaService.updateTag({
            rel: 'alternate',
            hreflang: lang,
            href: hreflangUrl,
          });
        });

        // Set social tags
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
