import { UrlSegment } from '@angular/router';

export function languageMatcherFactory(supportedLanguages: string[]) {
  return (segments: UrlSegment[]) => {
    if (segments.length > 0) {
      const lang = segments[0].path;
      if (supportedLanguages.includes(lang)) {
        return {
          consumed: segments.slice(0, 1),
          posParams: { lang: segments[0] },
        };
      }
    }
    return null;
  };
}
