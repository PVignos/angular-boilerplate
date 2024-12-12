import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSwitchComponent } from '../languageSwitch/language-switch.component';

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
export class HeaderComponent {
  isMobileMenuOpen = false;

  constructor(protected translate: TranslateService) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
