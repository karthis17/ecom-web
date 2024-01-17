import { Component } from '@angular/core';
import { ProdectService } from '../service/prodect.service';
import { Product } from '../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ReviewBoxComponent } from '../review/review-box/review-box.component';
import { ProductListComponentComponent } from '../product-list-component/product-list-component.component';
import { ProductViewComponent } from '../product-view/product-view.component';

@Component({
  selector: 'app-product-details-component',
  standalone: true,
  imports: [NgFor, NgIf, ReviewBoxComponent, ProductListComponentComponent, ProductViewComponent],
  templateUrl: './product-details-component.component.html',
  styleUrl: './product-details-component.component.css'
})
export class ProductDetailsComponentComponent {

  data!: Product;
  user: any;
  productId !: string | null;

  isNewReview: boolean = false;

  constructor(private productService: ProdectService, private route: Router, private router: ActivatedRoute) {

  }


  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (typeof this.productId === 'string') {
        this.productService.getDataByID(this.router.snapshot.paramMap.get('id')).subscribe(res => {
          res.images = JSON.parse(typeof res.images === 'string' ? res.images : "[]");
          res.about = JSON.parse(typeof res.about === 'string' ? res.about : "[]");

          this.data = res;
          console.log(this.data);

        })

      }
    })

    this.router.queryParams.subscribe(params => {
      this.isNewReview = params['review'];
      console.log(params['review'], "hi");
    });

  }


  onClickRelatedProd(id: any) {
    this.route.navigate(['/', 'product', id]);
  }


}
