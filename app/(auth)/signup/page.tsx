import { users } from "@/db/schema"
import { signIn } from "@/lib/auth"
import { db } from "@/lib/db"

export default function SignUp() {
    async function handleSubmit(formData: FormData) {
        "use server"
        let user = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            name: formData.get('name') as string,
            role: 'User',
        }
        await db.insert(users).values(user).returning()
        try {
            await signIn("credentials", formData)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form
            action={handleSubmit}
            className="flex flex-col gap-2 mx-auto w-1/2 p-4 bg-white rounded-lg shadow-md"
        >
            <label>
                Email
                <input name="email" type="email" className="border-2 border-gray-300 rounded-md p-2" />
            </label>
            <label>
                Name
                <input name="name" type="text" className="border-2 border-gray-300 rounded-md p-2" />
            </label>
            <label>
                Password
                <input name="password" type="password" className="border-2 border-gray-300 rounded-md p-2" />
            </label>
            <button className="bg-blue-500 text-white p-2 rounded-md">Sign Up</button>
        </form>
    )
}