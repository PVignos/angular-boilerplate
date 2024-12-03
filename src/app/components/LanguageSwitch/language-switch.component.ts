import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import Constants from '../../shared/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  standalone: true,
})
export class LanguageSwitchComponent implements OnInit, OnDestroy {
  currentLanguage = 'en';
  isDropdownOpen = false;
  private languageSubscription!: Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
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

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
    this.isDropdownOpen = false;
  }

  getFlag(lang: string): string {
    return `assets/images/lang/${lang}.svg`;
  }

  onKeyDown(event: Event, lang: string) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
      event.preventDefault();
      this.switchLanguage(lang);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const dropdown = document.querySelector('.dropdown'); // Add class 'dropdown' to your dropdown container
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.isDropdownOpen = false; // Close the dropdown if the click is outside
    }
  }

  protected readonly LANGUAGES = Constants;
}
