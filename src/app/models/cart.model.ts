export class ShoppingCart {
    id?: number;
    productName!: string;
    price!: number;
    quantity!: number;
    user_id!: number;
    total?: number;
    ordered!: boolean;
}