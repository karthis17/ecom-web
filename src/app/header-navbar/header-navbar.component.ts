import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './header-navbar.component.html',
  styleUrl: './header-navbar.component.css'
})
export class HeaderNavbarComponent {


  user: any;
  logState!: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.loggedIn.subscribe(async (state: boolean) => {
      if (state) {
        setTimeout(async () => {
          this.user = await this.auth.getUser();
          console.log(state, this.user);
          this.logState = state;
          console.log(this.logState);
        }, 100);
      }
    });
    console.log(this.user);
  }

  logout() {
    this.auth.logout();
    this.logState = false;
  }
  alt() {
    if (this.user) {
      this.router.navigateByUrl('/cart/' + this.user.id);
    } else {

      alert("please login first");
    }
  }
}
