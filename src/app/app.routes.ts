import { Routes } from '@angular/router';
import { ProductListComponentComponent } from './product-list-component/product-list-component.component';
import { ProductDetailsComponentComponent } from './product-details-component/product-details-component.component';

export const routes: Routes = [
    { path: '', component: ProductListComponentComponent },
    { path: 'product/:id', component: ProductDetailsComponentComponent }
];
