import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';
import { ShoppingCart } from '../models/cart.model';
import { StarRatingComponent } from '../review/star-rating/star-rating.component';
import { ViewPriceComponent } from '../view-price/view-price.component';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, NgIf, StarRatingComponent, ViewPriceComponent],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  @Input() data!: Product;


  user: any;
  qty = new FormControl(1);
  cartItem!: Array<ShoppingCart>;
  success: boolean = false;


  constructor(private auth: AuthService, private cart: CartService) {

  }

  getUserAddCArt() {
    this.auth.getUser().then((us) => {
      this.user = us;
      this.cart.getCart(us.id).subscribe(data => {
        this.cartItem = data;
      });
    })
  }

  ngOnInit() {

    this.getUserAddCArt();

  }

  add() {
    if (this.data?.id && this.data?.productName && this.data?.price && this.qty.value && !this.checkItemInCartAndUpdateQty(this.data?.productName)) {
      this.cart.addToCart({ product_id: this.data?.id, productName: this.data?.productName, price: this.data.amount, quantity: this.qty.value, user_id: this.user.id, ordered: false }).subscribe(data => {
        console.log(data);
        this.getUserAddCArt();
      });
      alert("Product added successfully");
    } else {
      this.success = true;
      console.log("errr");
    }
  }

  checkItemInCartAndUpdateQty(productName: string) {
    let exsiting_item = this.cartItem.find(item => item.productName === productName);
    if (exsiting_item) {
      if (exsiting_item.id && this.qty.value && exsiting_item.total) {
        this.cart.updateQty(exsiting_item.id, exsiting_item.quantity + this.qty.value, exsiting_item.total + (exsiting_item.price * this.qty.value)).subscribe(data => {
          console.log(data);
        });
      }
      return exsiting_item;
    } else {
      return null;
    }
  }


}
