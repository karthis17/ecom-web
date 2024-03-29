import { Component, HostListener, Input, SimpleChanges } from '@angular/core';
import { Product } from '../models/product.model';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { ShoppingCart } from '../models/cart.model';
import { StarRatingComponent } from '../review/star-rating/star-rating.component';
import { ViewPriceComponent } from '../view-price/view-price.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, NgIf, StarRatingComponent, ViewPriceComponent],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  @Input() data!: Product;
  @Input() userId!: number | null;

  screenWidth!: number;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    // console.log(this.screenWidth)
  }


  qty = new FormControl(1);
  cartItem!: Array<ShoppingCart>;
  success: boolean = false;
  activeImage!: number;
  image!: string;
  spec: any;
  isZoomed = false;
  zoomX = 0;
  zoomY = 0;


  constructor(private cart: CartService) {

  }

  getUserAddCArt() {
    if (this.userId) {
      this.cart.CheckItems(this.userId);
      this.cart.getCart(this.userId).subscribe(data => {
        this.cartItem = data;
      });
    }
  }

  ngOnInit() {

    this.screenWidth = window.innerWidth;



    console.log(this.screenWidth)
    this.getUserAddCArt();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.data.images ? this.image = this.data.images[0] : '';
      this.activeImage = 0;
      if (this.data.specifiction) this.spec = JSON.parse(this.data.specifiction)
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }

  add() {
    if (this.data?.id && this.data?.productName && this.data?.price && this.qty.value && !this.checkItemInCartAndUpdateQty(this.data?.productName) && this.userId) {
      this.cart.addToCart({ product_id: this.data?.id, productName: this.data?.productName, price: this.data.amount, quantity: this.qty.value, user_id: this.userId, ordered: false, product_qty: this.data.quantity }).subscribe(data => {
        console.log(data);
        this.getUserAddCArt();
      });
      swal.fire('Thank you...', 'Product added to cart', 'success')
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

  changeImage(src: string, index: number) {

    this.activeImage = index;

    this.image = src;

  }

  getObjectEntries(obj: any): [string, any][] {
    return Object.entries(obj);
  }



  handleMouseMove(event: MouseEvent): void {
    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.zoomX = x / rect.width;
    this.zoomY = y / rect.height;

    this.isZoomed = true;
  }

  handleMouseOut(): void {
    this.isZoomed = false;
  }

  getTransformOrigin(): string {
    return `${this.zoomX * 100}% ${this.zoomY * 100}%`;
  }
}
