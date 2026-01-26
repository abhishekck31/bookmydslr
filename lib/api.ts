import { API_BASE_URL } from "@/config/constants";
import { Product, Category, GlobalSettings } from "@/types";

export { API_BASE_URL };

// Helper to slugify text
function slugify(text: string): string {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start
        .replace(/-+$/, '');            // Trim - from end
}

// Generic fetch wrapper
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
    try {
        let url: string;
        if (endpoint.startsWith('http')) {
            url = endpoint;
        } else {
            const baseUrl = API_BASE_URL.replace(/\/$/, '');
            const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
            url = `${baseUrl}${path}`;
        }

        console.log(`[API] Fetching ${url}`);

        const res = await fetch(url, {
            cache: 'no-store',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            },
        });

        if (!res.ok) {
            console.warn(`[API] ${res.status} Error fetching ${url}`);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.warn(`[API] Connection failed to ${endpoint}`, error);
        return null;
    }
}

// API Response Wrappers
interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

interface ApiProduct {
    id: number;
    name: string;
    description: string;
    price_per_day: number;
    final_price: number;
    image_url: string;
    is_available: boolean;
    category: number;
    category_detail: ApiCategory;
    brand: number;
    brand_detail?: { id: number, name: string };
    created_at: string;
}

interface ApiCategory {
    id: number;
    name: string;
    description: string;
    image?: string;
    // slug might be missing
}

// Mappers
function getImageUrl(imagePath?: string): string {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    // Remove /api from base url to get root
    const rootUrl = API_BASE_URL.replace('/api', '').replace(/\/$/, '');
    const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${rootUrl}${path}`;
}

function mapProduct(item: ApiProduct): Product {
    return {
        id: item.id.toString(),
        name: item.name,
        description: item.description,
        price: item.price_per_day || 0, // Map price_per_day to price
        basePrice: item.price_per_day, // Optional
        image: getImageUrl(item.image_url),
        category: mapCategory(item.category_detail),
        brand: item.brand_detail?.name || (typeof item.brand === 'string' ? item.brand : `Brand ${item.brand}`),
        isAvailable: item.is_available,
        type: 'equipment', // Default
        discountPercentage: item.final_price && item.price_per_day ?
            Math.round(((item.price_per_day - item.final_price) / item.price_per_day) * 100) : 0,
    };
}

function mapCategory(item: ApiCategory): Category {
    return {
        id: item.id.toString(),
        name: item.name,
        slug: slugify(item.name),
        image: item.image ? getImageUrl(item.image) : undefined,
    };
}

// Exported Data Fetchers

export async function fetchCategories(): Promise<Category[]> {
    let allCategories: ApiCategory[] = [];
    let nextUrl: string | null = '/categories/';

    while (nextUrl) {
        const data: PaginatedResponse<ApiCategory> | null = await fetchAPI<PaginatedResponse<ApiCategory>>(nextUrl);
        if (!data || !data.results) break;

        allCategories = [...allCategories, ...data.results];
        nextUrl = data.next;
    }

    return allCategories.map(mapCategory);
}

export async function fetchProducts(): Promise<Product[]> {
    let allProducts: ApiProduct[] = [];
    let nextUrl: string | null = '/products/';

    while (nextUrl) {
        const data: PaginatedResponse<ApiProduct> | null = await fetchAPI<PaginatedResponse<ApiProduct>>(nextUrl);
        if (!data || !data.results) break;

        allProducts = [...allProducts, ...data.results];
        nextUrl = data.next;
    }

    return allProducts.map(mapProduct);
}


export async function fetchProduct(id: string): Promise<Product | null> {
    const data = await fetchAPI<ApiProduct>(`/products/${id}/`);
    if (!data) return null;
    return mapProduct(data);
}

export async function fetchGlobalSettings(): Promise<GlobalSettings> {
    // Determine what endpoint provides global settings or mock it for now if not available
    // Existing code used '/settings/global'
    const data = await fetchAPI<GlobalSettings>('/settings/global/');
    if (!data) {
        return { id: 'default', discountPercent: 0, isDiscountActive: false };
    }
    return data;
}

// Re-export generic if needed, but prefer specific
export { fetchAPI as fetchGeneric };
