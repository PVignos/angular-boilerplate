import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSwitchComponent } from '../languageSwitch/language-switch.component';
import { UrlTranslationService } from '../../services/url-translation.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    LanguageSwitchComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  translatedRoutes: {
    home: string;
    about: string;
  } = {
    home: '',
    about: '',
  };

  constructor(
    private urlTranslationService: UrlTranslationService,
    protected translate: TranslateService
  ) {}

  async ngOnInit() {
    await this.updateTranslatedRoutes();
    this.translate.onLangChange.subscribe(async () => {
      await this.updateTranslatedRoutes();
    });
  }

  async updateTranslatedRoutes() {
    this.translatedRoutes = {
      home: await this.urlTranslationService.getTranslatedUrl({
        page: 'index',
      }),
      about: await this.urlTranslationService.getTranslatedUrl({
        page: 'about',
      }),
    };
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
