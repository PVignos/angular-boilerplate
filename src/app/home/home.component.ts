import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, TranslateModule],
  providers: [],
  templateUrl: './home.component.html',
  standalone: true,
})
export class HomeComponent implements OnInit {
  public title = 'Home - San Francesco Lodge';
  public description = 'San Francesco Lodge description.';
  public keywords = 'Angular, SEO, JavaScript';
  public image = 'path/to/your/image.png';

  constructor(
    private meta: Meta,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.meta.updateTag({
      name: 'description',
      content: this.description,
    });
    this.meta.updateTag({
      name: 'keywords',
      content: this.keywords,
    });
    this.meta.updateTag({
      property: 'og:title',
      content: this.title,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: this.description,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: this.image,
    });
  }
}
