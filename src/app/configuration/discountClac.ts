import { Inject } from '@angular/core';

export class Dsicount {


    discountPrice(price: number | undefined, discount: number) {
        if (price) {
            price = price - (price * (discount / 100));
            return price;
        }
        return undefined;
    }


}
