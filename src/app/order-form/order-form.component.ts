import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CartTableComponent } from '../cart-table/cart-table.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProdectService } from '../service/prodect.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [NgFor, NgIf, CartTableComponent, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {

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

  constructor(private formBuilder: FormBuilder, private cart: CartService, private route: ActivatedRoute, private product: ProdectService) { }

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
    this.cart.placeOrder(this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
      response.item.forEach((item: any) => {
        this.product.changeQty({ quantity: item.quantity, name: item.name }).subscribe(res => {
          console.log(res)
        })
      })
    })
  }

}
