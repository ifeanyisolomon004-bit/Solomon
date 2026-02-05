export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
}