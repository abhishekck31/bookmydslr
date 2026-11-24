export const WHATSAPP_NUMBER = "919972122462"

// Public API base, used by the browser and for building asset URLs.
// On Vercel the Django service is mounted on the same domain under /api, so a
// relative path works. Set NEXT_PUBLIC_API_BASE_URL only to point at an
// external backend instead.
export const PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api"

// Server-side API base. BOOKMYDSLRADMIN_URL is injected at runtime by the
// Vercel service binding (vercel.json) and points at the internal Django
// service. Bindings are not available during `next build`, so the build falls
// back to the public external URL.
const FALLBACK_API_BASE_URL = "https://abhishek31.pythonanywhere.com/api"

export function getServerApiBaseUrl(): string {
    const bound = process.env.BOOKMYDSLRADMIN_URL
    if (bound) return new URL("api", bound.endsWith("/") ? bound : `${bound}/`).toString()
    return process.env.NEXT_PUBLIC_API_BASE_URL || FALLBACK_API_BASE_URL
}

export function getApiBaseUrl(): string {
    return typeof window === "undefined" ? getServerApiBaseUrl() : PUBLIC_API_BASE_URL
}

/** @deprecated use getApiBaseUrl(); kept for existing imports. */
export const API_BASE_URL = PUBLIC_API_BASE_URL
