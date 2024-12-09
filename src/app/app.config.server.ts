import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { uiReducer } from './store/ui-store/ui.reducer';
import { UiFacade } from './store/ui-store/ui.facade';
import {
  provideClientHydration,
  withI18nSupport,
} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideServerRendering } from '@angular/platform-server';
import { serverRoutes } from './app.routes.server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

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
      ui: uiReducer,
    }),
    provideStoreDevtools({
      trace: false,
      traceLimit: 75,
    }),
    provideRouterStore(),
    UiFacade,
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
  ],
};

// console.log('>>> Server routes:', JSON.stringify(serverRoutes, null, 2));
// console.log('>>> Angular routes:', JSON.stringify(routes, null, 2));
