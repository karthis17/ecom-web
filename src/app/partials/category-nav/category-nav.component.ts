import { Component, EventEmitter, Output } from '@angular/core';
import { ProdectService } from '../../service/prodect.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-category-nav',
  standalone: true,
  imports: [],
  templateUrl: './category-nav.component.html',
  styleUrl: './category-nav.component.css'
})
export class CategoryNavComponent {

  @Output('data') data = new EventEmitter<Product[]>();
  @Output('category') category = new EventEmitter<string>();

  constructor(private prodect: ProdectService) { }

  ngOnInit() {

    this.categoryNavigation("PC & Laptops")

  }

  activeButton: string = "";

  taggelActiveButton(button: string) {
    this.activeButton = button;
  }

  all(category: string) {
    this.taggelActiveButton(category);
    this.prodect.fectData().subscribe(data => {
      this.category.emit(category);
      this.data.emit(data);
    })
  }

  categoryNavigation(category: string) {
    this.taggelActiveButton(category);
    this.prodect.fectDataCategoryWis(category).subscribe((pro: Product[]) => {
      console.log(pro)
      this.category.emit(category);
      this.data.emit(pro);
    }, (error) => {
      console.log(error);
    });
  }

}
