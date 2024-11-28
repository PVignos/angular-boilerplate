import { RouterState } from '@ngrx/router-store';
import { UiState } from './ui-store/ui.reducer';

export interface AppState {
  ui: UiState;
  router: RouterState;
}
