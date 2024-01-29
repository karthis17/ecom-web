import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdectService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/api/product';
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };

  private product$ = new BehaviorSubject<Product[]>([]);
  selectedProduct$ = this.product$.asObservable();

  setProductList(productList: Product[]) {
    this.product$.next(productList);
  }

  fectData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/products/')
  }

  fectDataCategoryWis<product>(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/products-cate/' + category)
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

  updateRating(data: any) {
    return this.http.post(this.baseUrl + '/update-rating', data, this._options);
  }

  getAmounts(category: any): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + '/amountList/' + category);
  }

  getBrandName(category: any): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + '/getBrandList/' + category);
  }

  fetchDataBYBrand(brand: string, category: string): Observable<Product[]> {
    return this.http.post<Product[]>(this.baseUrl + `/get-brand-products`, { brand: brand, category: category });
  }

}
