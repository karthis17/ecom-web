import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProdectService } from '../service/prodect.service';
import { Dsicount } from '../configuration/discountClac';

@Component({
  selector: 'app-product-list-component',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './product-list-component.component.html',
  styleUrl: './product-list-component.component.css'
})
export class ProductListComponentComponent {

  constructor(private prodect: ProdectService) { }
  data: Product[] = [];
  discount = new Dsicount();

  ngOnInit() {

    this.prodect.fectData().subscribe((pro: Product[]) => {
      this.data = pro;
    }, (error) => {
      console.log(error);
    });


  }


}
