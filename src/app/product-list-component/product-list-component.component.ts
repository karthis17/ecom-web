import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProdectService } from '../service/prodect.service';
import { StarRatingComponent } from '../review/star-rating/star-rating.component';
import { ViewPriceComponent } from '../view-price/view-price.component';

@Component({
  selector: 'app-product-list-component',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, StarRatingComponent, CurrencyPipe, ViewPriceComponent],
  templateUrl: './product-list-component.component.html',
  styleUrl: './product-list-component.component.css'
})
export class ProductListComponentComponent {
  @Input('category') category: string = 'PC & Laptops';
  @Input('product') product: Product[] = [];
  @Input('isHome') isHome: boolean = true;

  constructor(private prodect: ProdectService) { }

  ngOnInit() {
    this.prodect.fectDataCategoryWis(this.category).subscribe(data => this.product = data);
  }
}
