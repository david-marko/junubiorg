"use server"

import { users } from "@/db/schema"
import { signIn } from "@/lib/auth"
import { saltAndHashPassword } from "@/lib/authhelpers";
import { db } from "@/lib/db"
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import { z } from "zod";

const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1),
})

export async function signUpAction(currentState: any, formData: FormData) {
    const parsedData = signUpSchema.safeParse(Object.fromEntries(formData.entries()))
    if (!parsedData.success) {
        return {
            message: "Invalid Details"
        }
    }
    let user = {
        email: parsedData.data.email,
        password: saltAndHashPassword(parsedData.data.password) as string,
        name: parsedData.data.name,
        role: 'User',
    }
    const currentUser = await db.select().from(users).where(eq(users.email, parsedData.data.email))
    if (currentUser.length > 0) {
        return {
            message: "User already registered"
        }
    }
    await db.insert(users).values(user).returning();
    let currentuser = null
    try {
        currentuser = await signIn("credentials", parsedData.data)
    } catch (error) {
        if (error instanceof Error) {
			const { type, cause } = error as AuthError;
			switch (type) {
				case "CredentialsSignin":
					return {
                        message: "Invalid credentials"
                    }
				case "CallbackRouteError":
					return {
                        message: cause?.err?.toString()
                    }
				default:
					return {
                        message: "Signed up successfully"
                    }
            }
        }
    }
    if (currentuser) {
        return {
            message: "Signed up successfully"
        }
    }
}