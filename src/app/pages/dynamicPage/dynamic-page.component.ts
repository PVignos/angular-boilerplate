import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../services/seo.service';
import { COMPONENT_PAGE_MAP, ComponentPageType } from '../../shared/constants';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="container mx-auto px-4 py-3">
      @if (pageComponent) {
        <ng-container *ngComponentOutlet="pageComponent"></ng-container>
      }
    </div>
  `,
})
export class DynamicPageComponent implements OnInit {
  pageComponent: ComponentPageType | null = null;

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const { pageData } = data;
      this.seoService.setSeoData(pageData.page);
      this.pageComponent = COMPONENT_PAGE_MAP[pageData.page] || null;
    });
  }
}
