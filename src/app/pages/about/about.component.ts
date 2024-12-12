import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterModule, TranslateModule],
  providers: [],
  templateUrl: './about.component.html',
  standalone: true,
})
export class AboutComponent {
  constructor() {}
}
