import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { DeliveryDtlComponent } from '../../delivery-dtl/delivery-dtl.component';
import { OrderHistoryComponent } from '../../order-history/order-history.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DeliveryDtlComponent, OrderHistoryComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.getUser().then(user => {
      this.user = user;
    });


  }

  logout() {
    this.auth.logout();
    this.auth.loggedIn.next(false);
    this.router.navigate(['']);
  }
}
