import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderNavbarComponent } from './partials/header-navbar/header-navbar.component';
import { FooterComponent } from './partials/footer/footer.component';
import { ReviewBoxComponent } from './review/review-box/review-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderNavbarComponent, FooterComponent, NgIf, ReviewBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecom-web';

  constructor(private router: Router) { }

  isAdminRoute(): boolean {
    return this.router.url.includes('/admin'); // Check if the current route contains '/admin'
  }
}
