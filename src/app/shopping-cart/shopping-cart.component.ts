import { Component } from '@angular/core';
import { ProdectService } from '../service/prodect.service';
import { AuthService } from '../service/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingCart } from '../models/cart.model';
import { CartTableComponent } from '../cart-table/cart-table.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CartTableComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {



}
