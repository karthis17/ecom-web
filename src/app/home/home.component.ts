import { Component, HostListener } from '@angular/core';
import { ProductListComponentComponent } from '../product-list-component/product-list-component.component';
import { Product } from '../models/product.model';
import { ProdectService } from '../service/prodect.service';
import { CategoryNavComponent } from '../partials/category-nav/category-nav.component';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductListComponentComponent, CategoryNavComponent, CurrencyPipe, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private prodect: ProdectService) { }
  data: Product[] = [];
  upperLimits: number[] = [];
  category: string = '';

  screenWidth!: number;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  filterByPrice(price: number[]) {
    this.prodect.filter({ about: '', price: price, category: this.category !== 'all' ? this.category : '' }).subscribe((pro: Product[]) => {
      this.data = pro;
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

  setCategory(category: string) {
    this.category = category;
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
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
