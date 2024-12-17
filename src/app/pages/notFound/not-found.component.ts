import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../services/seo.service';
import { Subscription } from 'rxjs';
import { UrlTranslationService } from '../../services/url-translation.service';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule, RouterModule, TranslateModule],
  providers: [],
  templateUrl: './not-found.component.html',
  standalone: true,
})
export class NotFoundComponent implements OnInit, OnDestroy {
  private navigationSubscription!: Subscription;

  constructor(
    private router: Router,
    private seoService: SeoService,
    private urlTranslationService: UrlTranslationService
  ) {}

  async ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe(
      async (event) => {
        if (event instanceof NavigationEnd) {
          await this.updateSeoData();
        }
      }
    );

    await this.updateSeoData();
  }

  private async updateSeoData() {
    this.seoService.setSeoData(
      'notFound',
      await this.urlTranslationService.getTranslatedUrl({ page: 'index' })
    );
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
