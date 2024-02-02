import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl: string = 'http://localhost:3000/api/order';
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };
  constructor(private http: HttpClient) { }


  addToOrder(order: any) {
    return this.http.post(this.baseUrl + "/addOrder", order, this._options)
  }

  getOrder(user_id: any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "/getOrders/" + user_id, { withCredentials: true });
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "/get-all-orders", { withCredentials: true });
  }

  returnProduct(data: any) {
    return this.http.post(this.baseUrl + '/return-product', data, this._options)
  }

  getAllreturn(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/get-all-returned', { withCredentials: true });
  }

}
