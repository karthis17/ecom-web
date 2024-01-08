import { Component } from '@angular/core';
import { DeliverDetailsService } from '../service/deliver-details.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-delivery-dtl',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './delivery-dtl.component.html',
  styleUrl: './delivery-dtl.component.css'
})
export class DeliveryDtlComponent {

  dtls: any[] = [];
  id: string | null = this.route.snapshot.paramMap.get('id');
  orderForm!: FormGroup;

  constructor(private dtlService: DeliverDetailsService, private route: ActivatedRoute, private loc: Location, private formBuilder: FormBuilder) { }

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

  ngOnInit() {
    this.getDtl();

    this.orderForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  getDtl() {
    if (this.id) {
      this.dtlService.getDtl(Number.parseInt(this.id)).subscribe(data => {
        this.dtls = data;
      })
    }
  }

  setDefultdtl() {
    if (this.dtls) {
      this.dtlService.setAddress(this.dtls[0]);
    }
  }

  address(address: string) {
    return JSON.parse(address).join(', ')
  }

  set(detail: any) {
    console.log(detail)
    this.dtlService.setAddress(detail);
    setTimeout(() => this.loc.back(), 500);
  }

  submit() {
    if (this.orderForm.valid) {
      let address = JSON.stringify([this.orderForm.get('address')?.value, this.orderForm.get('city')?.value, this.orderForm.get('state')?.value, this.orderForm.get('zip')?.value]);
      console.log(this.orderForm.value);
      console.log(address);
      this.dtlService.addDtl({ user_id: this.id, address: address, phone: this.orderForm.get('phoneNumber')?.value, email: this.orderForm.get('email')?.value }).subscribe(data => {

        this.getDtl();
      })
    }
  }

}
