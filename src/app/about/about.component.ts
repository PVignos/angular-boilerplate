import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterModule, TranslateModule],
  providers: [],
  templateUrl: './about.component.html',
  standalone: true,
})
export class AboutComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setSeoData('about');
  }
}
