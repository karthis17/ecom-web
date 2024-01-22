import { Component } from '@angular/core';
import { OrderHistoryComponent } from '../../order-history/order-history.component';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-ordered',
  standalone: true,
  imports: [OrderHistoryComponent],
  template: `
  <app-order-history [orders]="data"></app-order-history>

  `
})
export class OrderedComponent {

  data!: any[];
  constructor(private orderHistoryService: OrderService) { }

  ngOnInit() {
    this.orderHistoryService.getAllOrders().subscribe(data => {
      this.data = data;
    })
  }

}
