import { Component, Input } from '@angular/core';
import { OrderService } from '../service/order.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { CartTableComponent } from '../cart-table/cart-table.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [NgFor, CartTableComponent, NgIf, DatePipe],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {

  @Input() id: any = null;
  @Input() orders!: any[];
  @Input() admin: boolean = false;

  email!: string;
  name!: string;
  constructor(private order: OrderService, private route: ActivatedRoute, private auth: AuthService) { }
  converToDate = (date: string) => { new Date(date) }


  ngOnInit() {
    if (!this.id) {
      this.id = this.route.snapshot.paramMap.get('id');
    }
    if (this.id) {
      this.order.getOrder(this.id).subscribe((data: any[]) => {
        this.orders = data;
        this.auth.getUser().subscribe((user: any) => {
          this.email = user.email;
          this.name = user.name;
        });
      })
    }
  }

  address(address: string) {
    return JSON.parse(address).join(', ')
  }

}
