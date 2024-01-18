import { Component } from '@angular/core';
import { CartTableComponent } from '../cart-table/cart-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliverDetailsService } from '../service/deliver-details.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CartTableComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  constructor(private route: ActivatedRoute, private router: Router, private addressService: DeliverDetailsService) { }

  id = this.route.snapshot.paramMap.get('id');

  next() {
    let address = this.addressService.getAddress();
    if (address) {
      this.router.navigateByUrl('place-order/' + this.id);
      return;
    }
    this.router.navigate(['/', 'dtl', this.id]);
  }

}
