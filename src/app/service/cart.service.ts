import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string = 'http://localhost:3000/api/cart';
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient) { }

  addToCart(data: ShoppingCart): Observable<any> {
    return this.http.post(this.baseUrl + '/new-cart', data, this._options);
  }

  getCart(user_id: number): Observable<ShoppingCart[]> {
    return this.http.get<ShoppingCart[]>(this.baseUrl + '/get-cart/' + user_id);
  }

  updateQty(id: number, quantity: number, total: number): Observable<any> {
    return this.http.post(this.baseUrl + '/update-qty', { id: id, qty: quantity, total: total }, this._options);
  }

  removeCartItem(id: number): boolean {
    this.http.delete(this.baseUrl + '/remove-cart/' + id).subscribe((res) => {
      return true;
    }, (err) => {
      return false;
    })
    return false;
  }

  placeOrder(user_id: any) {
    return this.http.get(this.baseUrl + '/ordered/' + user_id);
  }

  getOrderedItems(order_id: number): Observable<ShoppingCart[]> {
    return this.http.post<ShoppingCart[]>(this.baseUrl + '/get-ordered-items', { order_id: order_id }, this._options);
  }

}
