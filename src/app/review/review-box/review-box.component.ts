import { Component, Input } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { NgFor, NgIf } from '@angular/common';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../service/review.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdectService } from '../../service/prodect.service';

@Component({
  selector: 'app-review-box',
  standalone: true,
  imports: [StarRatingComponent, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './review-box.component.html',
  styleUrl: './review-box.component.css'
})
export class ReviewBoxComponent {

  @Input('productId') productId!: string;

  @Input('new_review') new_review: string = '';

  rating!: number;
  reviews: Review[] = [];
  comment = new FormControl('', Validators.required)

  constructor(private reviewService: ReviewService, private router: Router, private product: ProdectService) { }

  ngOnInit() {
    this.rating = 0;

    this.productId ? this.getReviews() : '';



  }

  getReviews(add = false) {
    this.reviewService.getReviews(this.productId).subscribe(reviews => {
      this.reviews = reviews;

      if (add) {
        this.product.updateRating({ id: this.productId, rating: this.calculateAverageRating(reviews) }).subscribe(rating => { console.log(rating) })
      }
      // this.product.updateRating({ id: this.productId, rating: this.calculateAverageRating(reviews) }).subscribe(rating => { console.log(rating) })
    });
  }

  getrating(rating: number) {
    this.rating = rating;
  }

  addrating() {
    console.log(this.productId)
    if (this.comment.valid && this.comment.value && this.productId) {
      this.reviewService.addReview({ name: this.new_review, rating: this.rating, comment: this.comment.value, product_id: this.productId } as Review).subscribe((review: any) => {
        if (review.success) {
          console.log(review);
          this.getReviews(true);
          this.router.navigate([`/product/${this.productId}`]);
        }
      });
    }
  }


  calculateAverageRating(reviews: Review[]): number {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return averageRating;
  }


}
