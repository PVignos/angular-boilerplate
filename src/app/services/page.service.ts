import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  pageExists(lang: string, page: string): Promise<boolean> {
    const existingPages = ['home', 'about', 'contact'];

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(existingPages.includes(page));
      }, 500);
    });
  }
}
