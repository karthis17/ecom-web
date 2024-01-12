import { Component, Input, Pipe } from '@angular/core';
import { Product } from '../models/product.model';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProdectService } from '../service/prodect.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StarRatingComponent } from '../review/star-rating/star-rating.component';
import { CategoryNavComponent } from '../partials/category-nav/category-nav.component';

@Component({
  selector: 'app-product-list-component',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, ReactiveFormsModule, StarRatingComponent, CategoryNavComponent, CurrencyPipe],
  templateUrl: './product-list-component.component.html',
  styleUrl: './product-list-component.component.css'
})
export class ProductListComponentComponent {


  constructor(private prodect: ProdectService, private router: Router, private builder: FormBuilder, private route: ActivatedRoute) { }
  data: Product[] = [];
  form !: FormGroup;
  upperLimits: number[] = [];

  filterByPrice(price: string) {
    const [startStr, endStr] = price.split('-').map((str: string) => str.trim());
    this.prodect.filter({ about: '', price: [+startStr, +endStr], category: this.data[0].category }).subscribe((pro: Product[]) => {
      this.data = pro;
      // this.form.setValue({ about: '', price: '' });
    }, (error) => {
      console.log(error);
    });
  }

  getData(products: Product[] | null = null) {


    this.prodect.selectedProduct$.subscribe(product => {
      if (product) {
        this.data = product;
      }
    });
    this.data = products ? products : [];

    if (this.data.length > 0) {
      this.calculateUpperLimit(this.data.map((product) => product.amount));

    }


  }

  ngOnInit() {
    this.form = this.builder.group({
      about: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    });


    this.getData()


  }

  calculateUpperLimit(prices: number[]) {
    const uniquePricesSet = new Set<number>();
    uniquePricesSet.add(prices[0]);

    let j = prices[0] + 10000;
    for (let i = 1; i <= prices.length; i++) {
      if (prices[i] > j) {
        j = prices[i] + 10000;
      } else {
        uniquePricesSet.add(j);
      }
    }

    this.upperLimits = Array.from(uniquePricesSet);
    console.log(this.upperLimits)
  }

}
