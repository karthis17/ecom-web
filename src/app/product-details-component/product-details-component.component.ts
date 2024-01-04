import { Component } from '@angular/core';
import { ProdectService } from '../service/prodect.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Dsicount } from '../configuration/discountClac';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';
import { ShoppingCart } from '../models/cart.model';

@Component({
  selector: 'app-product-details-component',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, NgIf],
  templateUrl: './product-details-component.component.html',
  styleUrl: './product-details-component.component.css'
})
export class ProductDetailsComponentComponent {

  data!: Product;
  user: any;
  discount = new Dsicount();
  qty = new FormControl(1);
  cartItem!: Array<ShoppingCart>;
  success: boolean = false;

  constructor(private productService: ProdectService, private router: ActivatedRoute, private auth: AuthService, private cart: CartService) { }

  getUserAddCArt() {
    this.auth.getUser().then((us) => {
      this.user = us;
      this.cart.getCart(us.id).subscribe(data => {
        this.cartItem = data;
      });
    })
  }

  ngOnInit() {
    const productId = this.router.snapshot.paramMap.get('id');



    if (typeof productId === 'string') {
      this.productService.getDataByID(this.router.snapshot.paramMap.get('id')).subscribe(res => {
        res.images = JSON.parse(typeof res.images === 'string' ? res.images : "[]");
        res.about = JSON.parse(typeof res.about === 'string' ? res.about : "[]");

        this.data = res;

      })
      this.getUserAddCArt();

    }
  }

  add() {
    if (this.data?.productName && this.data?.price && this.qty.value && !this.checkItemInCartAndUpdateQty(this.data?.productName)) {
      this.cart.addToCart({ productName: this.data?.productName, price: this.data?.price, quantity: this.qty.value, user_id: this.user.id, ordered: false }).subscribe(data => {
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
