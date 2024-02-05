import { Component } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartTableComponent } from '../../cart-table/cart-table.component';

@Component({
  selector: 'app-purchased-user',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, CartTableComponent, DatePipe],
  templateUrl: './purchased-user.component.html',
  styleUrl: './purchased-user.component.css'
})
export class PurchasedUserComponent {

  data!: any[];
  showCart: boolean | number = false;
  isReturned: boolean = false;
  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      if (params['returned'] === 'true') {
        this.isReturned = true;
        this.orderService.getAllreturn().subscribe(orders => {
          this.data = orders;
        });
      } else {
        this.orderService.getAllOrders().subscribe(returned => {
          this.data = returned;
        });
      }
    })

  }

  show(order_id: number) {
    this.showCart = order_id;
  }

  setFalse() {
    this.showCart = false;
  }

}
