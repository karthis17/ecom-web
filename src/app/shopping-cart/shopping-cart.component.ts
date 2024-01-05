import { Component } from '@angular/core';
import { CartTableComponent } from '../cart-table/cart-table.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CartTableComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  constructor(private route: ActivatedRoute, private router: Router) { }

  id = this.route.snapshot.paramMap.get('id');

  next() {
    this.router.navigateByUrl('place-order/' + this.id);
  }

}
