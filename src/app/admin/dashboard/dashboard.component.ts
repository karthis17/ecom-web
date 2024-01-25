import { Component } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { AdminAuthService } from '../../service/admin-auth.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  dashboardOptions!: any[];

  constructor(private adminService: AdminAuthService, private router: Router) { }
  ngOnInit() {

    this.dashboardOptions = [
      { link: ['/admin', 'product-view'], name: 'Edit Product', icon: 'bi-pencil-square' },
      { link: ['/admin', 'product-manipulate'], name: 'Add Product', icon: 'bi-plus-square' },
      { link: ['/admin', 'ordered-products'], name: 'Ordered Product', icon: 'bi-cart-plus' },
      { link: ['/admin', 'purchased-user'], name: 'Purchased User', icon: 'bi-person-check-fill' },
    ]

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
