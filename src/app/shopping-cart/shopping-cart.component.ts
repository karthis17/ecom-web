import { AfterViewInit, Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CartTableComponent } from '../cart-table/cart-table.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DeliverDetailsService } from '../service/deliver-details.service';
import { NgIf } from '@angular/common';
import { ProductListComponentComponent } from '../product-list-component/product-list-component.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CartTableComponent, NgIf, ProductListComponentComponent, RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {


  constructor(private route: ActivatedRoute, private router: Router, private addressService: DeliverDetailsService) { }

  isEmpty: boolean = false;

  id = this.route.snapshot.paramMap.get('id');

  async next() {
    let address = this.addressService.getAddress()
    if (address) {
      this.router.navigate(['/', 'place-order']);

    } else
      this.router.navigate(['/', 'dtl', this.id]);
  }

  checkCartEmty(cart: boolean) {

    this.isEmpty = cart;

  }

}
