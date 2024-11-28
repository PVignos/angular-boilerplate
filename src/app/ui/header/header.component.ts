import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent {}
