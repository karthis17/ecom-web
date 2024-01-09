import { Component } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { AdminAuthService } from '../../service/admin-auth.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private adminService: AdminAuthService, private router: Router) { }
  ngOnInit() {

    this.adminService.checkLogin().then((ress) => {
      if (!ress) {
        this.adminService.nav();
      }
    }).catch(() => {

      this.adminService.nav();
    });
  }

  nav() {

    this.router.navigate(['/admin', 'product-view']);
  }

}
