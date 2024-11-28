import { ActionReducer, createReducer, on } from '@ngrx/store';
import { increasePage, resetPage } from './ui.actions';

export interface UiState {
  pagination: { page: number };
}

export const initialState: UiState = {
  pagination: { page: 1 },
};

export const uiReducer: ActionReducer<UiState> = createReducer(
  initialState,
  on(increasePage, (state: UiState) => ({
    ...state,
    pagination: { page: state.pagination.page + 1 },
  })),
  on(resetPage, (state: UiState) => ({
    ...state,
    pagination: { page: 1 },
  }))
);
