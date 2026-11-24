export const WHATSAPP_NUMBER = "919972122462"

// Product data lives on the PythonAnywhere Django backend. Override with
// NEXT_PUBLIC_API_BASE_URL to point at a different backend.
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://abhishek31.pythonanywhere.com/api"
export const PUBLIC_API_BASE_URL = API_BASE_URL

export function getApiBaseUrl(): string {
    return API_BASE_URL
}
