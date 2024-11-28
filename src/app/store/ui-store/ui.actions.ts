import { createAction } from '@ngrx/store';

export const uiKey = '[Ui]';

export const increasePage = createAction(`${uiKey} Increase Page`);

export const resetPage = createAction(`${uiKey} Reset Page`);
