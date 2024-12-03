import { UrlSegment, UrlMatchResult } from '@angular/router';

export function languageMatcherFactory(supportedLanguages: string[]) {
  return (segments: UrlSegment[]): UrlMatchResult | null => {
    if (segments.length > 0) {
      const lang = segments[0].path;
      if (supportedLanguages.includes(lang)) {
        return {
          consumed: [segments[0]],
          posParams: { lang: segments[0] },
        };
      }
    }
    return null;
  };
}
