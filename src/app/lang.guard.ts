import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { LanguageService } from './services/language.service';

@Injectable({
  providedIn: 'root',
})
export class LangGuard implements CanActivate {
  constructor(private languageService: LanguageService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const lang = route.paramMap.get('lang');

    return this.languageService.isSupportedLanguage(lang);
  }
}
