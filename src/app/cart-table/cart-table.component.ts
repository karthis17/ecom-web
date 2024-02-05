import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingCart } from '../models/cart.model';
import { CartService } from '../service/cart.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { OrderService } from '../service/order.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-cart-table',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, CurrencyPipe, RouterLink, FormsModule, DatePipe],
  templateUrl: './cart-table.component.html',
  styleUrl: './cart-table.component.css'
})
export class CartTableComponent {

  @Input('ordered')
  ordered: boolean = false;
  @Input() admin: boolean = false;
  @Input() isreturn: boolean = false;
  @Input('order_id')
  order_id: any;

  @Input() id: any;

  @Output() emtyCart = new EventEmitter<boolean>(false);

  showTab = false;
  resone: string = '';
  other_resone!: string;
  constructor(private cart: CartService, private route: ActivatedRoute, private router: Router, private order: OrderService) { }

  items!: Array<ShoppingCart>;
  Total_price: number = 0;
  err: string | null = null;

  returnItem !: ShoppingCart;
  formGroup: FormGroup = new FormGroup({});


  getCartItems() {

    if (this.id) {
      try {
        this.cart.getCart(Number.parseInt(this.id)).subscribe((cart) => {
          console.log(cart);
          this.items = cart;
          this.emtyCart.emit(cart.length < 1);
          this.items.forEach((item: ShoppingCart, index: number) => {
            this.formGroup.addControl(`quantity${index}`, new FormControl(item.quantity, Validators.required));
            if (item.total) this.Total_price += item.total;
          });
        }, (err: Error) => { console.log(err); this.router.navigate(['/', 'login']) });
      } catch (err) {
        console.log(err);
      }
    } else {

      this.router.navigateByUrl("");

    }
  }
  setreturnItem(item: ShoppingCart) {
    this.returnItem = item;
    this.show_tab();
  }
  ngOnInit() {

    // if (this.route.snapshot.paramMap.get('id')) this.id = this.route.snapshot.paramMap.get('id');


    if (!this.order_id) this.getCartItems();
    else if (this.isreturn) this.getReturnedOrder()
    else this.getOrderedItems()
  }


  getOrderedItems() {
    this.cart.getOrderedItems(this.order_id).subscribe(item => {
      this.items = item;

      item.forEach(element => {

        this.Total_price += element.total ? element.total : 0;
      });


    });
  }

  getReturnedOrder() {
    this.cart.getReturnedProduct(this.order_id).subscribe(response => {
      this.items = response;
      response.forEach(element => {

        this.Total_price += element.total ? element.total : 0;
      });
    });
  }

  getFormControl(index: number): FormControl {
    return this.formGroup.get(`quantity${index}`) as FormControl;
  }

  editQty(index: number, id: number | undefined, price: number, maxQty: number) {
    let qty = this.getFormControl(index).value;
    if (qty && id) {
      if (qty >= maxQty) this.err = `Only ${maxQty} quantity of product left`
      else this.err = null;
      console.log(id, this.getFormControl(index).value, price * this.getFormControl(index).value);
      this.cart.updateQty(id, this.getFormControl(index).value, price * this.getFormControl(index).value).subscribe(() => {

        this.getCartItems();
        console.log(this.getFormControl(index).value);
        // this.edit = false;
      })
    }
  }

  remove(id: number) {
    this.cart.removeCartItem(id);
    setTimeout(() => {
      this.getCartItems();
      this.cart.CheckItems(this.id);
    }, 500);
  }


  nav(product_id: string) {

    this.router.navigateByUrl(`/product?id=${product_id}`);
  }

  show_tab() {
    this.showTab = true;
  }

  close_tab() {
    this.showTab = false;
  }

  return() {
    console.log(this.returnItem, this.resone);

    if (this.resone) {
      this.close_tab()
      if (this.resone === 'other') {
        this.order.returnProduct({ ...this.returnItem, resone: this.other_resone }).subscribe(result => {
          console.log(result);
          this.getOrderedItems()
        })

      } else {
        this.order.returnProduct({ ...this.returnItem, resone: this.resone }).subscribe(result => {
          console.log(result);
          this.getOrderedItems()
        })
      }
    }

    // // Handle the selected value after the user clicks "Submit"


  }


}
