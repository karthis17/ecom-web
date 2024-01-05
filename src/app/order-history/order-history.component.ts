import { Component } from '@angular/core';
import { OrderService } from '../service/order.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { CartTableComponent } from '../cart-table/cart-table.component';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [NgFor, CartTableComponent],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {

  constructor(private order: OrderService, private route: ActivatedRoute) { }

  orders: any[] = []
  id = this.route.snapshot.paramMap.get('id');

  ngOnInit() {

    this.order.getOrder(this.id).subscribe((data: any[]) => {
      this.orders = data;
    })

  }

  address(address: string) {
    return JSON.parse(address).join(', ')
  }

}
