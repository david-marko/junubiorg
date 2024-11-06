import { auth } from "@/lib/auth";
import DashHeader from "@/components/dashHeader";
import Header from "@/components/header";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <section>
            {children}
        </section>
    );
}