"use server"

import { users } from "@/db/schema"
import { signIn } from "@/lib/auth"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm";
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
        password: parsedData.data.password,
        name: parsedData.data.name,
        role: 'User',
    }
    const currentUser = await db.select().from(users).where(eq(users.email, parsedData.data.email))
    if (currentUser.length > 0) {
        return {
            message: "User already registered"
        }
    }
    await db.insert(users).values(user).returning()
    try {
        await signIn("credentials", parsedData.data)
        return {
            message: "Signed up successfully"
        }
    } catch (error) {
        return {
            message: "Invalid credentials"
        }
    }
}