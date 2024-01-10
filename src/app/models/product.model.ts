export class Product {
    id?: string;
    productName?: string;
    price!: number;
    images?: Array<string>;
    thumbnail?: string;
    description!: string;
    quantity!: number;
    discount!: number;
    about?: Array<string>;
    rating!: number | null;
    category!: string;
}