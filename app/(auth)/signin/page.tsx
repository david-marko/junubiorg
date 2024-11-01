import { signIn } from "@/lib/auth"

export default function SignIn() {
    async function handleSubmit(formData: FormData) {
        "use server"
        try {
            await signIn("credentials", formData)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form
            action={handleSubmit}
        >
            <label>
                Email
                <input name="email" type="email" />
            </label>
            <label>
                Password
                <input name="password" type="password" />
            </label>
            <button>Sign In</button>
        </form>
    )
}