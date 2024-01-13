import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ProdectService } from '../service/prodect.service';
import { StarRatingComponent } from '../review/star-rating/star-rating.component';
import { ViewPriceComponent } from '../view-price/view-price.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-component',
  standalone: true,
  imports: [NgFor, NgIf, StarRatingComponent, CurrencyPipe, ViewPriceComponent],
  templateUrl: './product-list-component.component.html',
  styleUrl: './product-list-component.component.css'
})
export class ProductListComponentComponent {
  @Input('category') category: string = 'PC & Laptops';
  @Input('product') product: Product[] = [];
  @Input('isHome') isHome: boolean = true;

  @Output('clickedProd') clickedProd: EventEmitter<any> = new EventEmitter();
  constructor(private prodect: ProdectService, private router: Router) { }

  showProduct: number = 10;

  ngOnInit() {
    this.prodect.fectDataCategoryWis(this.category).subscribe(data => this.product = data);
  }

  nav(id: any) {

    this.isHome ? this.router.navigate(['/', 'product', id]) : this.clickedProd.emit(id);
  }

  showMore() {
    if (this.showProduct < this.product.length)
      this.showProduct = this.showProduct * 10
  }

  showLess() {
    if (this.showProduct > 10)
      this.showProduct = this.showProduct / 10;
  }

}
