import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';

@Injectable({
  providedIn: 'root',
})
export class PageGuard implements CanActivate {
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const page = route.params['page'];
    const lang = route.params['lang'];

    if (!this.languageService.isSupportedLanguage(lang)) {
      return false;
    }

    await this.translate.use(lang).toPromise();

    const translatedData = await this.translate
      .get(`pages.${page}`)
      .toPromise();

    return !(!translatedData || translatedData === `pages.${page}`);
  }
}
