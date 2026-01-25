export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

/**
 * Generic fetch wrapper for Django API.
 * Handles network errors gracefully by returning null, allowing the UI to render empty states.
 */
export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
    try {
        // Ensure endpoint starts with / if not provided
        const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const url = `${API_BASE_URL}${path}`;

        // In dev, we might want 'no-store' to see updates immediately, 
        // but for production usually we cache. defaulting to no-store for now to debug.
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
            // Log minimal warning
            console.warn(`[API] ${res.status} Error fetching ${url}`);
            return null;
        }

        const data = await res.json();
        return data;
    } catch (error) {
        // Silent fail in dev implies "Backend not ready", so we just log and return null
        console.warn(`[API] Connection failed to ${API_BASE_URL}${endpoint}`);
        return null;
    }
}
