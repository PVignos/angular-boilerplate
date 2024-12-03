import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { AboutComponent } from '../pages/about/about.component';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private translate = inject(TranslateService);
  async generateRoutes(): Promise<Routes> {
    const translations = await this.translate.get('pages').toPromise();

    const routes: Routes = Object.keys(translations).map((pageKey) => {
      const page = translations[pageKey];
      let component;

      switch (pageKey) {
        case 'index':
          component = HomeComponent;
          break;
        case 'about':
          component = AboutComponent;
          break;
        default:
          component = HomeComponent;
      }

      return {
        path: page.path,
        loadComponent: () =>
          import(`./${pageKey}/${pageKey}.component`).then(
            (mod) =>
              mod[
                `${pageKey.charAt(0).toUpperCase() + pageKey.slice(1)}Component`
              ]
          ),
        title: page.title,
        description: page.description,
        keywords: page.keywords,
        image: page.image,
      };
    });

    routes.push({
      path: '**',
      redirectTo: '/home',
    });

    return routes;
  }
}
