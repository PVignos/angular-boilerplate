import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import {
  provideClientHydration,
  withI18nSupport,
} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateStore,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideServerRendering } from '@angular/platform-server';
import { serverRoutes } from './app.routes.server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { UrlTranslationService } from './services/url-translation.service';
import { LANGUAGES } from './shared/constants';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfigServer: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes),
    provideHttpClient(withFetch()),
    provideStore({
      router: routerReducer,
    }),
    provideStoreDevtools({
      trace: false,
      traceLimit: 75,
    }),
    provideRouterStore(),
    provideClientHydration(withI18nSupport()),
    provideRouter(routes),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    { provide: TranslateStore, useClass: TranslateStore },
    {
      provide: 'TRANSLATIONS_INITIALIZER',
      useFactory:
        (
          urlTranslationService: UrlTranslationService,
          translateService: TranslateService
        ) =>
        async () => {
          await urlTranslationService.ensureTranslationsLoaded();
          await Promise.all(
            LANGUAGES.map((lang) =>
              translateService.getTranslation(lang.code).toPromise()
            )
          );
        },
      deps: [UrlTranslationService, TranslateService],
      multi: true,
    },
  ],
};

// console.log('>>> Angular routes:', JSON.stringify(routes, null, 2));
// console.log('>>> Server routes:', JSON.stringify(serverRoutes, null, 2));
