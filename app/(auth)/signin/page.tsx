"use client"

import { useFormState } from "react-dom"
import { signInAction } from "./action"
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { SubmitButton } from "@/components/submit-button";

const initialState = {
    message: '',
}

export default function SignIn() {
    const [state, formAction] = useFormState(signInAction, initialState);

    useEffect(() => {
        if (state.message && state.message == 'Invalid credentials') {
            toast({
                title: state.message,
                variant: "destructive",
            })
        }
    }, [state.message])
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] w-full p-4">
            <form action={formAction} className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-md min-w-[400px]">
                <div className="flex flex-col gap-2">
                    <label>
                        Email
                    </label>
                    <input name="email" required type="email" placeholder="Your email" className="border border-gray-300 rounded-md p-2" />
                </div>
                <div className="flex flex-col gap-2">
                    <label>
                        Password
                    </label>
                    <input name="password" required type="password" placeholder="Your password" className="border border-gray-300 rounded-md p-2" />
                </div>
                <SubmitButton text="Sign In" />
            </form>
        </div>
    )
}