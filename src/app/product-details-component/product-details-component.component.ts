import { Component } from '@angular/core';
import { ProdectService } from '../service/prodect.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Dsicount } from '../configuration/discountClac';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-details-component',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-details-component.component.html',
  styleUrl: './product-details-component.component.css'
})
export class ProductDetailsComponentComponent {

  data: Product | undefined;
  discount = new Dsicount();
  constructor(public productService: ProdectService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getDataByID(this.router.snapshot.paramMap.get('id'))?.subscribe(res => {
      this.data = res;
    });
  }

}
