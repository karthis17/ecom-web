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

  constructor(private prodect: ProdectService) { }

  ngOnInit() {

    this.categoryNavigation("PC & Laptops")

  }

  activeButton: string = "";

  taggelActiveButton(button: string) {
    this.activeButton = button;
  }

  categoryNavigation(category: string) {
    this.taggelActiveButton(category);
    this.prodect.fectDataCategoryWis(category).subscribe((pro: Product[]) => {
      console.log(pro)
      this.data.emit(pro);
    }, (error) => {
      console.log(error);
    });
  }

}
