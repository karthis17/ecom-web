import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdectService } from '../../service/prodect.service';
import { ActivatedRoute, Router } from '@angular/router';
import uniqid from 'uniqid';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-add-oredit-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, FormsModule, NgIf],
  templateUrl: './product-add-oredit-form.component.html',
  styleUrl: './product-add-oredit-form.component.css'
})
export class ProductAddOREditFormComponent implements OnInit {

  error: boolean = false;
  data: any = {};
  images: string[] = []
  about: any[] = []
  isEdit: string | null = null;
  constructor(private formBuilder: FormBuilder, private product: ProdectService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isEdit = params['edit'];
      console.log(params['edit']);
    });
    if (!this.isEdit) {
      this.data = {
        productName: '',
        price: 0,
        description: '',
        thumbnail: '',
        quantity: 0,
        discount: 0,
        category: '',
      };
      this.addAboutInput()
      this.addImageLink()
    } else {
      this.product.getDataByID(this.isEdit).subscribe((dataa: Product) => {
        this.data = { id: dataa.id, productName: dataa.productName, price: dataa.price, description: dataa.description, thumbnail: dataa.thumbnail, quantity: dataa.quantity, discount: dataa.discount };
        this.images = JSON.parse(typeof dataa.images === 'string' ? dataa.images : "[]");
        this.about = JSON.parse(typeof dataa.about === 'string' ? dataa.about : "[]");
      })
    }

  }

  addImageLink() {

    this.images.push("");
    console.log(this.images)
  }

  addAboutInput() {
    this.about.push('');
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  addNew() {
    if (this.images.length > 1 && this.about.length > 1 && this.data.price > 0 && this.data.quantity > 0) {
      console.log({ id: uniqid(), ...this.data, images: JSON.stringify(this.images), about: JSON.stringify(this.about) })
      this.product.addProduct({ ...this.data, id: uniqid(), images: JSON.stringify(this.images), about: JSON.stringify(this.about) }).subscribe(data => {
        console.log(data);
        this.router.navigate(['/admin']);
      });
      this.error = false
    } else {
      this.error = true;
    }
  }

  edit() {
    if (this.images.length > 1 && this.about.length > 1 && this.data.price > 0 && this.data.quantity > 0) {
      console.log({ ...this.data, images: JSON.stringify(this.images), about: JSON.stringify(this.about) })
      this.product.editProduct({ ...this.data, images: JSON.stringify(this.images), about: JSON.stringify(this.about) }).subscribe(data => {
        console.log(data);
        this.router.navigate(['/admin']);
      });
      this.error = false
    } else {
      this.error = true;
    }
  }
}


