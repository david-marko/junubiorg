"use server"

import { users } from "@/db/schema";
import { signIn } from "@/lib/auth"
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export async function signInAction(currentState: any, formData: FormData) {
    const parsedData = signInSchema.safeParse(Object.fromEntries(formData.entries()))
    if (!parsedData.success) {
        return {
            message: "Invalid Details"
        }
    }
    try {
        await signIn("credentials", parsedData.data)
        return {
            message: "Signed in successfully"
        }
    } catch (error) {
        // console.log(error)
        return {
            message: "Invalid credentials"
        }
    }
}