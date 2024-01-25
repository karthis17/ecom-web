import { Routes } from '@angular/router';
import { ProductDetailsComponentComponent } from './product-details-component/product-details-component.component';
import { LoginComponent } from './userauth/login/login.component';
import { RegisterComponent } from './userauth/register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { DeliveryDtlComponent } from './delivery-dtl/delivery-dtl.component';
import { AdminDashbordComponent } from './admin/admin-dashbord/admin-dashbord.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductAddOREditFormComponent } from './admin/product-add-oredit-form/product-add-oredit-form.component';
import { ProductViewComponent } from './admin/product-view/product-view.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './partials/profile/profile.component';
import { OrderedComponent } from './admin/ordered/ordered.component';
import { PurchasedUserComponent } from './admin/purchased-user/purchased-user.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'product', component: ProductDetailsComponentComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart/:id', component: ShoppingCartComponent },
    { path: 'place-order/:id', component: OrderFormComponent },
    { path: 'order-history/:id', component: OrderHistoryComponent },
    { path: 'dtl/:id', component: DeliveryDtlComponent },
    { path: 'profile', component: ProfileComponent },
    {
        path: 'admin', component: AdminDashbordComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: '', component: DashboardComponent },
            { path: 'product-manipulate', component: ProductAddOREditFormComponent },
            { path: 'product-view', component: ProductViewComponent },
            { path: 'ordered-products', component: OrderedComponent },
            { path: 'purchased-user', component: PurchasedUserComponent }
        ]
    },
];
