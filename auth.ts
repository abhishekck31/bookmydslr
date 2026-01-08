import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.AUTH_SECRET || "bookmydslr_secret_2025_fixed",
    trustHost: true,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const hardcodedEmail = "bookmydslr@gmail.com"
                const hardcodedPassword = "bookmydslr@2015"

                if (
                    credentials.email === hardcodedEmail &&
                    credentials.password === hardcodedPassword
                ) {
                    return {
                        id: "admin-1",
                        email: hardcodedEmail,
                        name: "Admin",
                    }
                }

                // Fallback to database check if needed, but the request was "if the email is ... it must login"
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id
            }
            return session
        },
    },
    pages: {
        signIn: "/admin/login",
    },
})
