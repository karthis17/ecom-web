import { Component, HostListener, SimpleChanges } from '@angular/core';
import { ProductListComponentComponent } from '../product-list-component/product-list-component.component';
import { Product } from '../models/product.model';
import { ProdectService } from '../service/prodect.service';
import { CategoryNavComponent } from '../partials/category-nav/category-nav.component';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { StarRatingComponent } from '../review/star-rating/star-rating.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductListComponentComponent, CategoryNavComponent, CurrencyPipe, NgFor, NgIf, StarRatingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private prodect: ProdectService) { }
  data: Product[] = [];
  upperLimits: number[] = [];
  category!: string;

  brand_name!: string[];
  pc_mob: any;
  colors!: any[];
  headPhone!: any;

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
        this.getBrandName()
      }
    });
    this.data = products ? products : [];
    this.getBrandName()
    if (this.data.length > 0) {
      this.prodect.getAmounts(this.category).subscribe((amount: number[]) => {
        this.calculateUpperLimit(amount);
      })

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
  }

  getBrandName() {
    const brands = new Set<string>();
    const RR = new Set<string>();
    const os = new Set<string>();
    const cpu = new Set<string>();
    const S = new Set<string>();
    const CT = new Set<string>();
    const color = new Set<string>();
    if (this.data) {
      this.data.forEach(prod => {
        if (prod.specifiction) {
          const spec = JSON.parse(prod.specifiction)
          brands.add(spec.Brand.trim());
          if (spec.RAM && spec.Storage && spec.CPU_Model && spec.OS) {
            RR.add(`${spec.RAM.trim()} - ${spec.Storage.trim()}`);
            cpu.add(spec.CPU_Model.trim());
            os.add(spec.OS.trim());
          }
          if (spec.Form_Factor) {
            S.add(spec.Form_Factor.trim())
            CT.add(spec.Connectivity_Technology.trim())
          }
          color.add(spec.Colour);
        }
      })
      this.brand_name = Array.from(brands);
      this.pc_mob = [Array.from(RR), Array.from(os), Array.from(cpu)];
      this.headPhone = [(Array.from(S)), (Array.from(CT))];
      this.colors = Array.from(color);
    }
  }

  filterByBrandName(filter: string) {


    this.prodect.fetchDataBYBrand(filter, this.category).subscribe((data: Product[]) => {
      this.data = data;
    });
  }

  filterByRating(rating: number) {

    this.prodect.filterBYrating(rating, this.category).subscribe((data: Product[]) => {
      this.data = data;
    });
  }


}
