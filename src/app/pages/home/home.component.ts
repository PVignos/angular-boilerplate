import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../services/seo.service';
import { UrlTranslationService } from '../../services/url-translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, TranslateModule],
  providers: [],
  templateUrl: './home.component.html',
  standalone: true,
})
export class HomeComponent implements OnInit, OnDestroy {
  private navigationSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
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
    const translatedUrl = await this.urlTranslationService.getTranslatedUrl({
      page: 'index',
      lang: this.route.snapshot.params['lang'],
      withLang: false,
    });
    this.seoService.setSeoData('index', translatedUrl);
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
