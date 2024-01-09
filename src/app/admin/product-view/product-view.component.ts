import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProdectService } from '../../service/prodect.service';
import { Product } from '../../models/product.model';
import { NavigationExtras, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {


  products: Product[] = [];

  constructor(private productService: ProdectService, private router: Router) { }

  getData() {
    this.productService.fectData().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  ngOnInit() {

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
