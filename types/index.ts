export interface Category {
    id: string;
    name: string;
    slug: string;
    image?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    basePrice?: number;
    image: string;
    category?: Category;
    brand: string;
    type: string;
    isAvailable: boolean;
    rating?: number;
    reviews?: number;
    features?: string[];
    specs?: any;
    discountPercentage?: number;
    offerName?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface GlobalSettings {
    id: string;
    discountPercent: number;
    isDiscountActive: boolean;
    updatedAt?: string;
}
