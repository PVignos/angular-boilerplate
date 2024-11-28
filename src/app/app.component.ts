import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TranslateModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  standalone: true,
})
export class AppComponent implements OnInit {
  public currentLanguage = 'en';
  public title = 'San Francesco Lodge';
  public description = 'San Francesco Lodge description.';
  public keywords = 'Angular, SEO, JavaScript';
  public image = 'path/to/your/image.png';
  public router: Router = inject(Router);

  constructor(
    private meta: Meta,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private titleService: Title
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit() {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.updateMetaTags();
  }

  switchLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.currentLanguage = lang;
  }

  updateMetaTags() {
    this.titleService.setTitle(this.title);

    // Standard Meta Tags
    this.meta.addTag({
      name: 'description',
      content: this.description,
    });
    this.meta.addTag({ name: 'keywords', content: this.keywords });

    // Open Graph Meta Tags
    this.meta.addTag({
      property: 'og:title',
      content: this.title,
    });
    this.meta.addTag({
      property: 'og:description',
      content: this.description,
    });
    this.meta.addTag({
      property: 'og:image',
      content: this.image,
    });
  }
}
