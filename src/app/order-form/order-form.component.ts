import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartTableComponent } from '../cart-table/cart-table.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { ProdectService } from '../service/prodect.service';
import { OrderService } from '../service/order.service';
import { DeliverDetailsService } from '../service/deliver-details.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [NgFor, NgIf, CartTableComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  @ViewChild(CartTableComponent, { static: true }) cartTable!: CartTableComponent;

  @ViewChild("body", { static: true }) body!: ElementRef;

  user_id = this.route.snapshot.paramMap.get('id');
  user: any;
  constructor(private dtlService: DeliverDetailsService, private cart: CartService, private route: ActivatedRoute, private product: ProdectService, private order: OrderService, private router: Router, private auth: AuthService) {
    this.auth.getUser().then((user) => { this.user = user; })
  }

  paymentOption = new FormControl('', Validators.required);
  deliveryAddress: any = {};

  paymentHandler: any = null;



  convertRupeesToDollars(rupees: number): number {
    const rupeesToDollarConversionRate = 0.014;
    const dollars = rupees * rupeesToDollarConversionRate;

    return Math.round(dollars * 100) / 100;
  }

  ngOnInit(): void {

    console.log(window.paypal)
    this.deliveryAddress = this.dtlService.getAddress();
    console.log(this.deliveryAddress, "hi");

    window.paypal.Buttons({
      style: {
        layout: 'horizontal',
        color: 'blue',
        label: 'paypal'
      },
      createOrder: async (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.convertRupeesToDollars(this.cartTable.Total_price).toString(),
                currency_code: 'USD'
              },
              shipping: {
                name: {
                  full_name: this.user.name
                },
                address: {
                  address_line_1: JSON.parse(this.deliveryAddress.address)[0],
                  admin_area_2: JSON.parse(this.deliveryAddress.address)[1],
                  admin_area_1: JSON.parse(this.deliveryAddress.address)[2],
                  postal_code: JSON.parse(this.deliveryAddress.address)[3],
                  country_code: 'IN'
                }
              }
            }
          ]
        });
      },
      onApprove: async (data: any, actions: any) => {
        try {
          const details = await actions.order.capture();
          alert("Transaction completed successfully transaction id: " + details.id + " your products will deliver soon");
          if (details.status === "COMPLETED") {

            this.submit(JSON.stringify(details.payer));

          }
        } catch (error) {
          console.error(error);
        }
      },
      onError: (err: any) => {
        alert("Transaction is not completed successfully")
      }
    }).render(this.body.nativeElement);

  }
  address(address: string) {
    return JSON.parse(address).join(', ')
  }
  submit(payer: any) {
    // throw new Error('Method not implemented.');
    this.cartTable.items.forEach(item => {
      console.log(item);
      this.product.changeQty({ quantity: item.quantity, name: item.productName }).subscribe(result => {
        console.log(result);
      })
    });
    this.cart.placeOrder(this.user_id).subscribe((response: any) => {
      console.log(response);
      this.order.addToOrder({ user_id: this.user_id, phone: this.deliveryAddress.phone, address: this.deliveryAddress.address, payment: payer }).subscribe((res) => {
        console.log(res)
        this.router.navigateByUrl('')
      })
    })
  }

}
