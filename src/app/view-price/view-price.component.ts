import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-price',
  standalone: true,
  imports: [CurrencyPipe, NgIf],
  templateUrl: './view-price.component.html',
  styleUrl: './view-price.component.css'
})
export class ViewPriceComponent {

  @Input('amount') amount: number = 0;
  @Input('discount') discount: number = 0;
  @Input('list') list: boolean = true;
  @Input('price') price: number | string = 0;


}
