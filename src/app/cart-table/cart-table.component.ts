import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingCart } from '../models/cart.model';
import { CartService } from '../service/cart.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ProdectService } from '../service/prodect.service';

@Component({
  selector: 'app-cart-table',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, CurrencyPipe, RouterLink],
  templateUrl: './cart-table.component.html',
  styleUrl: './cart-table.component.css'
})
export class CartTableComponent {

  @Input('ordered')
  ordered: boolean = false;

  @Input('order_id')
  order_id: any;

  @Input() id: any;

  constructor(private cart: CartService, private route: ActivatedRoute, private router: Router, private productService: ProdectService) { }

  items: Array<ShoppingCart> = [];
  editModeIndex: number | null = null;
  Total_price: number = 0;
  err: string | null = null;


  formGroup: FormGroup = new FormGroup({});


  getCartItems() {
    this.Total_price = 0;
    if (this.id) {
      this.cart.getCart(Number.parseInt(this.id)).subscribe((cart) => {
        console.log(cart);
        this.items = cart;

        this.items.forEach((item: ShoppingCart, index: number) => {
          this.formGroup.addControl(`quantity${index}`, new FormControl(item.quantity, Validators.required));
          if (item.total) this.Total_price += item.total;
        });
      });
    } else {

      this.router.navigateByUrl("");

    }
  }

  ngOnInit() {

    if (this.route.snapshot.paramMap.get('id')) this.id = this.route.snapshot.paramMap.get('id');


    if (!this.order_id) this.getCartItems();
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
        this.editModeIndex = null;
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

}
