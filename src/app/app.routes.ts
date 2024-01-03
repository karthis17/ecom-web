import { Routes } from '@angular/router';
import { ProductListComponentComponent } from './product-list-component/product-list-component.component';
import { ProductDetailsComponentComponent } from './product-details-component/product-details-component.component';
import { LoginComponent } from './userauth/login/login.component';
import { RegisterComponent } from './userauth/register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

export const routes: Routes = [
    { path: '', component: ProductListComponentComponent },
    { path: 'product/:id', component: ProductDetailsComponentComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart/:id', component: ShoppingCartComponent },
];
