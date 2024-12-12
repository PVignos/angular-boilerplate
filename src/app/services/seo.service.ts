import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { UrlTranslationService } from './url-translation.service';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translateService: TranslateService,
    private urlTranslationService: UrlTranslationService
  ) {}

  /**
   * Sets basic SEO data like title, description, canonical URL, and social tags.
   */
  setSeoData(pageKey: string, translatedUrl?: string): void {
    const currentLang = this.translateService.currentLang;

    this.translateService
      .get([
        `pages.${pageKey}.title`,
        `pages.${pageKey}.description`,
        `pages.${pageKey}.image`,
      ])
      .subscribe(async (translations) => {
        // Set robots
        this.setRobotsTag('index, follow');

        // Set title
        this.titleService.setTitle(translations[`pages.${pageKey}.title`]);

        // Set description
        this.metaService.updateTag({
          name: 'description',
          content: translations[`pages.${pageKey}.description`],
        });

        // Set canonical URL
        this.metaService.updateTag({
          rel: 'canonical',
          href: `${environment.apiUrl}/${currentLang}/${translatedUrl || pageKey}`,
        });

        // Set hreflang tags
        this.setAlternateHrefLang(translatedUrl || pageKey, currentLang);

        // Set social tags
        this.setSocialTags(
          translations[`pages.${pageKey}.title`],
          translations[`pages.${pageKey}.description`],
          translations[`pages.${pageKey}.image`]
        );
      });
  }

  setSocialTags(title: string, description: string, imageUrl: string): void {
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({
      property: 'og:description',
      content: description,
    });
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });

    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: description,
    });
    this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });
  }

  setRobotsTag(content: string): void {
    this.metaService.updateTag({ name: 'robots', content });
  }

  async setAlternateHrefLang(
    translatedUrl: string,
    currentLang: string
  ): Promise<void> {
    const supportedLangs = this.translateService.getLangs();

    const originalPage = await this.urlTranslationService.getOriginalPage(
      translatedUrl,
      currentLang
    );
    const alternatesUrl = await Promise.all(
      supportedLangs.flatMap(async (language) => {
        const translatedUrl = await this.urlTranslationService.getTranslatedUrl(
          originalPage,
          language
        );
        return {
          lang: language,
          translatedPage: translatedUrl,
        };
      })
    );
    for (const { lang, translatedPage } of alternatesUrl) {
      const hreflangUrl = `${environment.apiUrl}/${lang}/${translatedPage}`;
      this.metaService.updateTag({
        rel: 'alternate',
        hreflang: lang,
        href: hreflangUrl,
      });
    }
  }

  setStructuredData(schema: Record<string, unknown>): void {
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(schema);
    document.head.appendChild(scriptTag);
  }
}
