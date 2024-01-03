import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProdectService {

  constructor(private http: HttpClient) { }

  fectData<product>(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/data.json')
  }

  getDataByID(id: string | null): Observable<Product | undefined> | null {
    if (id) {
      return this.fectData().pipe(
        map((data: Product[]) => {
          return data.find(product => product.id === id);
        })
      );
    }
    return null;
  }

}
