import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule, RouterModule, TranslateModule],
  providers: [],
  templateUrl: './not-found.component.html',
  standalone: true,
})
export class NotFoundComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setSeoData('notFound');
  }
}
