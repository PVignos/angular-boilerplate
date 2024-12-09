import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../services/seo.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, TranslateModule],
  providers: [],
  templateUrl: './home.component.html',
  standalone: true,
})
export class HomeComponent implements OnInit, OnDestroy {
  private languageSubscription!: Subscription;
  currentLanguage = 'en';

  constructor(
    private seoService: SeoService,
    protected languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.seoService.setSeoData('index');
    this.languageSubscription = this.languageService.language$.subscribe(
      (lang) => {
        this.currentLanguage = lang;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
