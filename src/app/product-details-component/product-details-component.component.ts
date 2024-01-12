import { Component } from '@angular/core';
import { ProdectService } from '../service/prodect.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';
import { ShoppingCart } from '../models/cart.model';
import { ReviewBoxComponent } from '../review/review-box/review-box.component';
import { StarRatingComponent } from '../review/star-rating/star-rating.component';

@Component({
  selector: 'app-product-details-component',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, NgIf, ReviewBoxComponent, StarRatingComponent, CurrencyPipe],
  templateUrl: './product-details-component.component.html',
  styleUrl: './product-details-component.component.css'
})
export class ProductDetailsComponentComponent {

  data: Product = {
    productName: '',
    price: 0,
    description: '',
    quantity: 0,
    discount: 0,
    rating: 0,
    category: '',
    amount: 0
  };
  user: any;
  qty = new FormControl(1);
  cartItem!: Array<ShoppingCart>;
  success: boolean = false;
  productId !: string | null;

  isNewReview: boolean = false;

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
    this.productId = this.router.snapshot.paramMap.get('id');

    this.router.queryParams.subscribe(params => {
      this.isNewReview = params['review'];
      console.log(params['review'], "hi");
    });

    if (typeof this.productId === 'string') {
      this.productService.getDataByID(this.router.snapshot.paramMap.get('id')).subscribe(res => {
        res.images = JSON.parse(typeof res.images === 'string' ? res.images : "[]");
        res.about = JSON.parse(typeof res.about === 'string' ? res.about : "[]");

        this.data = res;
        console.log(this.data);

      })
      this.getUserAddCArt();

    }
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
