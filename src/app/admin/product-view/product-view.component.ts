import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProdectService } from '../../service/prodect.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {

  showOutOfStock = false;
  products: Product[] = [];

  constructor(private productService: ProdectService, private router: Router, private route: ActivatedRoute) { }

  getData() {
    if (this.showOutOfStock) {
      this.productService.fetchOutOfStock().subscribe(data => {
        this.products = data;
      });
    } else {
      this.productService.fectData().subscribe((data: Product[]) => {
        this.products = data;
      });
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.showOutOfStock = params['outOfStock'] === 'true';
      console.log(params['outOfStock']);
    });

    this.getData();

  }

  deleteProduct(id: any) {
    this.productService.remove(id).subscribe(data => {
      console.log(data);
      this.getData();
    });
  }

  edit(id: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        edit: id
      }
    };
    this.router.navigate(['/admin', 'product-manipulate'], navigationExtras);
  }


}
