import { NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [NgFor],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() readonly: boolean = false;
  @Output() user_rating = new EventEmitter<number>();
  stars: number[] = [1, 2, 3, 4, 5];

  setRating(rating: number): void {
    if (!this.readonly) {
      this.rating = rating;
      this.user_rating.emit(this.rating);
      console.log(this.rating, this.user_rating);
    }
  }
}
