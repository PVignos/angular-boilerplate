import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule, RouterModule, TranslateModule],
  providers: [],
  templateUrl: './not-found.component.html',
  standalone: true,
})
export class NotFoundComponent {}
