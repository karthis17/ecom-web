import { Component } from '@angular/core';
import { ProdectService } from '../service/prodect.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Dsicount } from '../configuration/discountClac';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-product-details-component',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './product-details-component.component.html',
  styleUrl: './product-details-component.component.css'
})
export class ProductDetailsComponentComponent {

  data: Product | undefined;
  user: any;
  discount = new Dsicount();
  qty = new FormControl("1");
  constructor(public productService: ProdectService, private router: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    const productId = this.router.snapshot.paramMap.get('id');

    if (typeof productId === 'string') {
      this.productService.getDataByID(this.router.snapshot.paramMap.get('id')).subscribe(res => {
        res.images = JSON.parse(typeof res.images === 'string' ? res.images : "[]");
        res.about = JSON.parse(typeof res.about === 'string' ? res.about : "[]");

        this.data = res;

      })

      this.auth.getUser().then((us) => {
        this.user = us;
      })
    }
  }

  add() {
    this.productService.addToCart({ productName: this.data?.productName, price: this.data?.price, quantity: this.qty.value, user_id: this.user.id }).subscribe(data => {
      console.log(data);
    }
    )
  }

}
