import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET || "bookmydslr_secret_2025_fixed",
    providers: [
        CredentialsProvider({
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
}
