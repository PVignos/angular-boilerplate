import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore({
      router: routerReducer,
      ui: uiReducer,
    }),
    provideStoreDevtools({
      trace: false,
      traceLimit: 75,
    }),
    provideHttpClient(),
    provideRouterStore(),
    UiFacade,
    provideClientHydration(withI18nSupport()),
  ],
};
