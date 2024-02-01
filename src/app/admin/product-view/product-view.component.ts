import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProdectService } from '../../service/prodect.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [NgFor, RouterLink, CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {

  showOutOfStock = false;
  products: Product[] = [];
  filter = ""
  filteredProducts: Product[] = [];
  category = ["PC & Laptops", "Mobiles", "Headphones & Speakers", "Cameras", "TVs & Appliances"]

  constructor(private productService: ProdectService, private router: Router, private route: ActivatedRoute) { }

  getData() {
    if (this.showOutOfStock) {
      this.productService.fetchOutOfStock().subscribe(data => {
        this.products = data;
        this.filteredProducts = [...this.products]
      });
    } else {
      this.productService.fectData().subscribe((data: Product[]) => {
        this.products = data;
        this.filteredProducts = [...this.products]
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
  filterProduct() {

    if (this.filter === ' ') {
      this.filteredProducts = this.products;
    }
    this.filteredProducts = this.products.filter(p => p.productName.toLowerCase().includes(this.filter.toLowerCase()) || p.specifiction?.toLowerCase().includes(this.filter.toLowerCase()));

  }

  filterByCategory(category: any) {

    this.filteredProducts = this.products.filter(p => p.category.toLowerCase().includes(category.toLowerCase())) || [];

  }

  nav(id: any) {
    this.router.navigateByUrl("/product?id=" + id)
  }

}
