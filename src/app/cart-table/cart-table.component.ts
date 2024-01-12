import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingCart } from '../models/cart.model';
import { CartService } from '../service/cart.service';
import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

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
  order_id: any = 0;

  constructor(private cart: CartService, private route: ActivatedRoute, private router: Router) { }

  items: Array<ShoppingCart> = [];
  editModeIndex: number | null = null;
  Total_price: number = 0;
  id = this.route.snapshot.paramMap.get('id');

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


    if (!this.ordered && !this.order_id) this.getCartItems();
    else this.getOrderedItems()
  }


  getOrderedItems() {
    if (this.id) this.cart.getOrderedItems(this.order_id, Number.parseInt(this.id)).subscribe(item => {
      this.items = item;

      this.items.forEach((item: ShoppingCart, index: number) => {
        this.formGroup.addControl(`quantity${index}`, new FormControl(item.quantity, Validators.required));
        if (item.total) this.Total_price += item.total;
      });
    });
  }

  getFormControl(index: number): FormControl {
    return this.formGroup.get(`quantity${index}`) as FormControl;
  }

  editQty(index: number, id: number | undefined, price: number) {

    if (this.getFormControl(index).value && id) {
      if (this.getFormControl(index).value > 0) {
        console.log(id, this.getFormControl(index).value, price * this.getFormControl(index).value);
        this.cart.updateQty(id, this.getFormControl(index).value, price * this.getFormControl(index).value).subscribe(() => {

          this.getCartItems();
          console.log(this.getFormControl(index).value);
          // this.edit = false;
          this.editModeIndex = null;
        })
      }
    }
  }

  remove(id: number) {
    this.cart.removeCartItem(id);
    setTimeout(() => {
      this.getCartItems();
    }, 500);
  }

  enterEditMode(index: number) {
    this.editModeIndex = index;
  }

  nav(product_id: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        review: true
      }
    };

    this.router.navigate([`/product/${product_id}`], navigationExtras)
  }

}
