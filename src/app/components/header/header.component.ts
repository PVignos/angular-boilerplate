import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitchComponent } from '../LanguageSwitch/language-switch.component';

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
  isActive = false;
  isMobileMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isActive = this.router.url === '/about'; // Imposta isActive in base alla rotta
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
