import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliverDetailsService {

  baseUrl: string = 'http://localhost:3000/api/deliver-details';
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };

  constructor(private http: HttpClient) { }

  current_address: any;

  getAddress() {
    let address = localStorage.getItem('address')
    if (address) {

      return JSON.parse(address);
    }
    return null;
  }

  setAddress(address: any) {
    localStorage.setItem('address', JSON.stringify(address));
  }

  getDtl(userId: number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/get-dtl/' + userId, { withCredentials: true });
  }

  addDtl(dtl: any) {
    return this.http.post(this.baseUrl + '/add-dtl', dtl, this._options);
  }

}
