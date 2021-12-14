/*
export class Product {
    _id: string = '';
    name: string = '';
    description: string = 'Pas de description';
    price: number = 0;
    inStock: boolean = false;
}
*/

export interface Product {
    readonly _id: string;
    name: string;
    description?: string;
    price: number;
    inStock?: boolean;
}

export function Product(name: string ='', price: number =0) {
    return { name: name, price: price } as Product;
}
