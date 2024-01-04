import { Component } from '@angular/core';
import { ProdectService } from '../service/prodect.service';
import { AuthService } from '../service/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingCart } from '../models/cart.model';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  constructor(private cart: CartService, private route: ActivatedRoute, private router: Router) { }

  items: Array<ShoppingCart> = [];
  editModeIndex: number | null = null;
  Total_price: number = 0;

  formGroup: FormGroup = new FormGroup({});


  getCartItems() {
    this.Total_price = 0;
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cart.getCart(Number.parseInt(id)).subscribe((cart) => {
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


    this.getCartItems();

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



}
