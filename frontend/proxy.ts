import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isAuthPage = req.nextUrl.pathname === "/admin/login"
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname.startsWith("/api/admin")

    if (isAdminRoute && !isAuthPage && !isLoggedIn && req.nextUrl.pathname !== "/api/auth") {
        if (req.nextUrl.pathname.startsWith("/api")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        return NextResponse.redirect(new URL("/admin/login", req.nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
}
