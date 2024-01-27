import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/api/reviews';
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };


  getReviews(prduct_id: string): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl + '/get-reviews/' + prduct_id, { withCredentials: true })
  }

  addReview(review: Review) {
    return this.http.post(this.baseUrl + '/add-review', review, this._options)
  }


}
