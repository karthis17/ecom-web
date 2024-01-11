import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProdectService } from '../service/prodect.service';
import { Dsicount } from '../configuration/discountClac';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StarRatingComponent } from '../review/star-rating/star-rating.component';
import { CategoryNavComponent } from '../partials/category-nav/category-nav.component';

@Component({
  selector: 'app-product-list-component',
  standalone: true,
  imports: [NgFor, RouterLink, ReactiveFormsModule, StarRatingComponent, CategoryNavComponent],
  templateUrl: './product-list-component.component.html',
  styleUrl: './product-list-component.component.css'
})
export class ProductListComponentComponent {


  constructor(private prodect: ProdectService, private router: Router, private builder: FormBuilder) { }
  data: Product[] = [];
  discount = new Dsicount();
  form !: FormGroup;

  getData(products: Product[] | null = null) {

    if (this.form.get('about')?.value || this.form.get('price')?.value || this.form.get('category')?.value) {
      console.log(this.form.value)
      let filter = this.form.value;
      if (this.form.get('price')?.value) {
        const [startStr, endStr] = this.form.get('price')?.value.split('-').map((str: string) => str.trim());
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);

        filter.price = [start, end];
      }
      this.prodect.filter(filter).subscribe((pro: Product[]) => {
        this.data = pro;
        this.form.setValue({ about: '', price: '', category: '' });
      }, (error) => {
        console.log(error);
      });
      // this.form.setValue({ about: '', price: '' })
    } else {
      this.data = products ? products : [];
    }
  }

  ngOnInit() {
    this.form = this.builder.group({
      about: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.getData();


  }






}
