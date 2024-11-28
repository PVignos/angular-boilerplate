import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UiActions from './ui.actions';
import { Observable } from 'rxjs';
import { selectPage } from './ui.selectors';

@Injectable()
export class UiFacade {
  private store = inject(Store);

  public getPage$: Observable<number> = this.store.select(selectPage);

  public increasePage(): void {
    this.store.dispatch(UiActions.increasePage());
  }

  public resetPage(): void {
    this.store.dispatch(UiActions.resetPage());
  }
}
