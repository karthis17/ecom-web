import { Component } from '@angular/core';
import { ProdectService } from '../service/prodect.service';
import { AuthService } from '../service/auth.service';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  constructor(private cart: ProdectService, private route: ActivatedRoute) { }

  items: any;

  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');

    this.cart.getCart(id).subscribe((cart) => {
      this.items = cart;
    });


  }



}
