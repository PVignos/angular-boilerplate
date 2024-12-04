import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <ng-container *ngIf="pageData">
      <h1>{{ pageData.title }}</h1>
      <p>{{ pageData.description }}</p>
      <meta name="keywords" [attr.content]="pageData.keywords" />
      <meta name="description" [attr.content]="pageData.description" />
      <meta property="og:title" [attr.content]="pageData.title" />
      <meta property="og:description" [attr.content]="pageData.description" />
      <meta property="og:image" [attr.content]="pageData.image" />
    </ng-container>
  `,
})
export class DynamicPageComponent implements OnInit {
  pageData: any;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.pageData = data['pageData'];
    });
  }
}
