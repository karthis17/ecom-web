import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdectService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/api/product';
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  fectData<product>(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/products/')
  }

  getDataByID<product>(id: string | null): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + '/id/' + id);
  }


  changeQty(data: any) {
    return this.http.post(this.baseUrl + '/qty-red', data, this._options)
  }

  filter(data: any): Observable<Product[]> {
    return this.http.post<Product[]>(this.baseUrl + '/like', JSON.stringify(data), this._options);
  }

  remove(id: any) {
    return this.http.delete(this.baseUrl + '/delete/' + id);
  }

  addProduct(data: any) {
    return this.http.post(this.baseUrl + '/add', data, this._options);
  }

  editProduct(data: any) {
    return this.http.put(this.baseUrl + '/update', data, this._options);
  }

}
