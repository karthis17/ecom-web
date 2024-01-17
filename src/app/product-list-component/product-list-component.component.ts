import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
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
  @Input('category') category: string | null = null;
  @Input('product') product!: Product[];
  @Input('isHome') isHome: boolean = true;

  @Output('clickedProd') clickedProd: EventEmitter<any> = new EventEmitter();
  constructor(private prodect: ProdectService, private router: Router) { }

  start!: number;
  end!: number;

  pageNumbers!: number[];

  activePage: number = 1;

  ngOnInit() {

    console.log(this.product, "hi")
    if (this.category) {
      this.prodect.fectDataCategoryWis(this.category).subscribe(data => {
        this.product = data;
        this.start = 0;
        this.end = 10;
      });
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && !this.category) {
      this.start = 0;
      this.end = 10;
      this.pageNumbers = Array.from({ length: Math.ceil(this.product.length / 10) });
    }

  }

  nav(id: any) {

    this.isHome ? this.router.navigate(['/', 'product', id]) : this.clickedProd.emit(id);
  }

  changePage(page_number: number) {
    this.start = (page_number - 1) * 10;
    this.end = page_number * 10;

    this.activePage = page_number;

    console.log(this.start, this.end)
  }


}
