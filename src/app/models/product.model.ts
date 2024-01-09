export class Product {
    id?: number;
    productName?: string;
    price!: number;
    images?: Array<string>;
    thumbnail?: string;
    description!: string;
    quantity!: number;
    discount!: number;
    about?: Array<string>;
}