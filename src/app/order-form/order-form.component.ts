import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CartTableComponent } from '../cart-table/cart-table.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProdectService } from '../service/prodect.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [NgFor, NgIf, CartTableComponent, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  @ViewChild(CartTableComponent, { static: true }) cartTable!: CartTableComponent;
  indianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ];

  orderForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private cart: CartService, private route: ActivatedRoute, private product: ProdectService, private order: OrderService, private router: Router) { }



  ngOnInit(): void {

    this.orderForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      paymentOption: ['', Validators.required],
      cardNo: [''],
      upiID: ['']
    });
  }

  submit() {
    // throw new Error('Method not implemented.');
    this.cartTable.items.forEach(item => {
      console.log(item);
      this.product.changeQty({ quantity: item.quantity, name: item.productName }).subscribe(result => {
        console.log(result);
      })
    });
    this.cart.placeOrder(this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
      console.log(response);
      this.order.addToOrder({ user_id: this.route.snapshot.paramMap.get('id'), phone: this.orderForm.get('phoneNumber')?.value, address: JSON.stringify([this.orderForm.get('address')?.value, this.orderForm.get('city')?.value, this.orderForm.get('state')?.value, this.orderForm.get('zip')?.value]), payment: this.orderForm.get('paymentOption')?.value }).subscribe((res) => {
        console.log(res)
        this.router.navigateByUrl('')
      })
    })
  }

}
