import { Component } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartTableComponent } from '../../cart-table/cart-table.component';

@Component({
  selector: 'app-purchased-user',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, CartTableComponent],
  templateUrl: './purchased-user.component.html',
  styleUrl: './purchased-user.component.css'
})
export class PurchasedUserComponent {

  data!: any[];
  showCart: boolean | number = false;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(orders => {
      this.data = orders;
    });
  }

  show(order_id: number) {
    this.showCart = order_id;
  }

  setFalse() {
    this.showCart = false;
  }

}
