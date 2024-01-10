import { Component } from '@angular/core';
import { LoginComponent } from '../../userauth/login/login.component';
import { NgIf } from '@angular/common';
import { AdminAuthService } from '../../service/admin-auth.service';
import { NavigationExtras, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashbord',
  standalone: true,
  imports: [LoginComponent, NgIf, RouterOutlet],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent {

  // admin: any;

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


}
