import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CartTableComponent } from '../cart-table/cart-table.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { ProdectService } from '../service/prodect.service';
import { OrderService } from '../service/order.service';
import { DeliverDetailsService } from '../service/deliver-details.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [NgFor, NgIf, CartTableComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  @ViewChild(CartTableComponent, { static: true }) cartTable!: CartTableComponent;

  user_id = this.route.snapshot.paramMap.get('id');
  constructor(private dtlService: DeliverDetailsService, private cart: CartService, private route: ActivatedRoute, private product: ProdectService, private order: OrderService, private router: Router) { }

  paymentOption = new FormControl('', Validators.required);
  deliveryAddress: any = {};


  ngOnInit(): void {

    this.deliveryAddress = this.dtlService.getAddress();
    console.log(this.deliveryAddress, "hi");

  }
  address(address: string) {
    return JSON.parse(address).join(', ')
  }
  submit() {
    // throw new Error('Method not implemented.');
    this.cartTable.items.forEach(item => {
      console.log(item);
      this.product.changeQty({ quantity: item.quantity, name: item.productName }).subscribe(result => {
        console.log(result);
      })
    });
    this.cart.placeOrder(this.user_id).subscribe((response: any) => {
      console.log(response);
      this.order.addToOrder({ user_id: this.user_id, phone: this.deliveryAddress.phone, address: this.deliveryAddress.address, payment: this.paymentOption?.value }).subscribe((res) => {
        console.log(res)
        this.router.navigateByUrl('')
      })
    })
  }

}
