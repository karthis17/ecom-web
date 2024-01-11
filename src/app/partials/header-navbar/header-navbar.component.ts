import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { NavigationExtras, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ProdectService } from '../../service/prodect.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports: [NgIf, RouterLink, NgFor, FormsModule],
  templateUrl: './header-navbar.component.html',
  styleUrl: './header-navbar.component.css'
})
export class HeaderNavbarComponent {


  user: any;
  logState!: boolean;
  product_names: Product[] = [];
  selected_product: any;

  constructor(private auth: AuthService, private router: Router, private product: ProdectService) { }

  ngOnInit() {
    this.auth.loggedIn.subscribe(async (state: boolean) => {
      if (state) {
        setTimeout(async () => {
          this.user = await this.auth.getUser();
          console.log(state, this.user);
          this.logState = state;
          console.log(this.logState);
        }, 100);
      }
    });

    this.product.fectData().subscribe(data => {
      this.product_names = data;
    })
  }

  logout() {
    this.auth.logout();
    this.logState = false;
    this.user = null;
  }
  alt() {
    if (this.user) {
      this.router.navigateByUrl('/cart/' + this.user.id);
    } else {

      alert("please login first");
    }
  }

  nav(select = this.selected_product) {
    console.log(select);
    if (select) {
      let foundedProduct = this.product_names.find(product => product.productName === select)
      if (foundedProduct) {

        this.selected_product = '';
        this.router.navigate(['/product', foundedProduct.id]);
      } else {
        this.product.setProductList(this.product_names.filter(product => product.productName.toLowerCase().includes(select.toLowerCase()) || product.category.toLowerCase().includes(select.toLowerCase()) || product.description.toLowerCase().includes(select.toLowerCase()) || product.about?.toString().toLowerCase().includes(select.toLowerCase())));

        this.selected_product = '';
        this.router.navigate([`/`])
      }

    }
  }
}
