import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { saltAndHashPassword } from "./authhelpers"
import { db } from "./db"
import { users } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                let user = null

                // logic to salt and hash password
                const pwHash = saltAndHashPassword(credentials.password as string) as string;
                user = await db.select().from(users).where(and(eq(users.email, credentials.email as string), eq(users.password, pwHash)));
                // logic to verify if the user exists
                // user = await getUserFromDb(credentials.email, pwHash)
                if (!user || user.length == 0) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error("Invalid credentials.")
                }

                // return user object with their profile data
                return {
                    id: user[0].id.toString(),
                    email: user[0].email,
                    name: user[0].name,
                    role: user[0].role,
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string
            return session
        },
    },
})