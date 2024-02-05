export class ShoppingCart {
    id?: number;
    productName!: string;
    price!: number;
    quantity!: number;
    user_id!: number;
    total?: number;
    ordered!: boolean | number;
    product_id!: string;
    product_qty!: number;
    resone_for_return?: string;
    return_date?: string;
}