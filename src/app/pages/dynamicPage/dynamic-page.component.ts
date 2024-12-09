import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../services/seo.service';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';

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
  pageComponent: Type<HomeComponent | AboutComponent> | null = null;
  componentMap: Record<string, Type<HomeComponent | AboutComponent>> = {
    home: HomeComponent,
    about: AboutComponent,
  };

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const { pageData } = data;
      this.seoService.setSeoData(pageData.page);
      this.pageComponent = this.componentMap[pageData.page] || null;
    });
  }
}
