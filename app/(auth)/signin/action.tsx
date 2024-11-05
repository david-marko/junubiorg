"use server"

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
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
    let user = null
    try {
        user = await signIn("credentials", parsedData.data)
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
                        message: "Signed in successfully"
                    }
            }
        }
    }
    if (user) {
        return {
            message: "Signed in successfully"
        }
    }
    else {
        return {
            message: "Invalid credentials"
        }
    }
}