import { createSelector } from '@ngrx/store';
import { UiState } from './ui.reducer';
import { AppState } from '..';

export const selectFeature = (state: AppState) => state.ui;

export const selectPage = createSelector(
  selectFeature,
  (state: UiState) => state.pagination.page
);
