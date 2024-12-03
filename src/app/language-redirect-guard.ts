import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LanguageRedirectGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const supportedLanguages = ['en', 'it'];
    const language = next.url[0]?.path;

    if (supportedLanguages.includes(language)) {
      return true; // No redirect needed
    } else {
      this.router.navigate(['/en']); // Redirect to /en if language is not supported
      return false;
    }
  }
}
