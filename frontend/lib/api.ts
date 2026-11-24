import { cache } from "react";
import { API_BASE_URL, PUBLIC_API_BASE_URL, getApiBaseUrl } from "@/config/constants";
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

/**
 * When the backend is unreachable we must not render an empty catalogue:
 * Next.js would cache that empty page (ISR) and serve it until the next
 * revalidation. On the server at request/revalidation time we throw instead,
 * so Next keeps serving the last good page (or retries on the next request).
 *
 * During `next build` we still degrade to empty data so a backend outage
 * cannot block a deploy; the pages refresh on their first revalidation.
 * In the browser (admin pages) we keep the old null-returning behaviour.
 */
export class ApiUnavailableError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ApiUnavailableError";
    }
}

function shouldThrowOnFailure(): boolean {
    return typeof window === "undefined" && process.env.NEXT_PHASE !== "phase-production-build";
}

const REQUEST_TIMEOUT_MS = 12_000;
const RETRY_DELAY_MS = 800;

function resolveUrl(endpoint: string): string {
    const baseUrl = getApiBaseUrl().replace(/\/$/, '');
    if (endpoint.startsWith('http')) {
        // DRF pagination returns absolute `next` links built from whatever host
        // Django saw. Re-base them on the URL that works in this environment.
        const parsed = new URL(endpoint);
        const apiPath = parsed.pathname.replace(/^\/api(?=\/|$)/, '');
        return `${baseUrl}${apiPath}${parsed.search}`;
    }
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${path}`;
}

// Generic fetch wrapper with retries and a per-attempt timeout.
// Returns null only for a genuine 404; other failures throw on the server.
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}, retries = 3): Promise<T | null> {
    const url = resolveUrl(endpoint);
    let lastError = "";

    for (let attempt = 0; attempt <= retries; attempt++) {
        if (attempt > 0) await new Promise(r => setTimeout(r, RETRY_DELAY_MS * attempt));
        try {
            const res = await fetch(url, {
                ...options,
                signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
                next: {
                    revalidate: 30,
                    ...("next" in options ? (options as RequestInit & { next?: { revalidate?: number } }).next : {}),
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...options.headers,
                },
            });

            if (res.status === 404) return null;

            if (!res.ok) {
                lastError = `HTTP ${res.status}`;
                // 4xx other than 408/429 will not get better by retrying.
                if (res.status < 500 && res.status !== 408 && res.status !== 429) break;
                console.warn(`[API] ${res.status} on ${url} (attempt ${attempt + 1}/${retries + 1})`);
                continue;
            }

            return (await res.json()) as T;
        } catch (error) {
            lastError = (error as Error)?.message || String(error);
            console.warn(`[API] Request failed for ${url} (attempt ${attempt + 1}/${retries + 1}): ${lastError}`);
        }
    }

    const message = `[API] Giving up on ${url}: ${lastError}`;
    if (shouldThrowOnFailure()) throw new ApiUnavailableError(message);
    console.warn(message);
    return null;
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
    const rootUrl = PUBLIC_API_BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
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

export const fetchCategories = cache(async (): Promise<Category[]> => {
    let allCategories: ApiCategory[] = [];
    let nextUrl: string | null = '/categories/?page_size=250';

    while (nextUrl) {
        const data: PaginatedResponse<ApiCategory> | null = await fetchAPI<PaginatedResponse<ApiCategory>>(nextUrl);
        if (!data || !Array.isArray(data.results)) {
            // A missing or malformed page would leave a partial list; never cache that.
            if (shouldThrowOnFailure()) throw new ApiUnavailableError(`[API] Malformed category page: ${nextUrl}`);
            break;
        }

        allCategories = [...allCategories, ...data.results];
        nextUrl = data.next;
    }

    // An empty catalogue at runtime almost always means the backend misbehaved.
    if (allCategories.length === 0 && shouldThrowOnFailure()) {
        throw new ApiUnavailableError("[API] Backend returned no category records");
    }

    return allCategories.map(mapCategory);
});

export const fetchProducts = cache(async (): Promise<Product[]> => {
    let allProducts: ApiProduct[] = [];
    let nextUrl: string | null = '/products/?page_size=250';

    while (nextUrl) {
        const data: PaginatedResponse<ApiProduct> | null = await fetchAPI<PaginatedResponse<ApiProduct>>(nextUrl);
        if (!data || !Array.isArray(data.results)) {
            // A missing or malformed page would leave a partial list; never cache that.
            if (shouldThrowOnFailure()) throw new ApiUnavailableError(`[API] Malformed product page: ${nextUrl}`);
            break;
        }

        allProducts = [...allProducts, ...data.results];
        nextUrl = data.next;
    }

    // An empty catalogue at runtime almost always means the backend misbehaved.
    if (allProducts.length === 0 && shouldThrowOnFailure()) {
        throw new ApiUnavailableError("[API] Backend returned no product records");
    }

    return allProducts.map(mapProduct);
});


export const fetchProduct = cache(async (id: string): Promise<Product | null> => {
    const data = await fetchAPI<ApiProduct>(`/products/${id}/`);
    if (!data) return null;
    return mapProduct(data);
});

export const fetchGlobalSettings = cache(async (): Promise<GlobalSettings> => {
    // Determine what endpoint provides global settings or mock it for now if not available
    // Existing code used '/settings/global'
    const data = await fetchAPI<GlobalSettings>('/settings/global/');
    if (!data) {
        return { id: 'default', discountPercent: 0, isDiscountActive: false };
    }
    return data;
});

// Re-export generic if needed, but prefer specific
export { fetchAPI as fetchGeneric };
