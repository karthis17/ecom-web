import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdectService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/api/';
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  getUserLocally(user: any): null | any[] {
    let local = localStorage.getItem('user');
    if (local) {
      return JSON.parse(local);
    } else {
      return null;
    }
  }
  setUserLocally(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  fectData<product>(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'product/products/')
  }

  getDataByID<product>(id: string | null): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'product/id/' + id);
  }

  addToCart(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'cart/new-cart', data, this._options);
  }

  getCart(id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'cart/get-cart/' + id);
  }

}
