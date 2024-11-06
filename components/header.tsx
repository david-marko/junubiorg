import Link from "next/link";

export default function Header({ session }: { session: any }) {
    return (
        <nav className="sticky top-0 flex justify-between items-center p-4 bg-white">
            <Link href="/"> <h1 className="text-2xl font-bold flex items-center gap-2"> <span> Junubi </span> <span className="text-sm text-gray-500 hidden md:flex"> South Sudan's Open Data Portal</span></h1> </Link>
            <div className="hidden md:flex gap-4">
                <Link href="/datasets"> Datasets </Link>
                <Link href="/jobs"> Jobs </Link>
                <Link href="/about"> About </Link>
                {session ? <Link href="/logout"> Logout </Link> : <Link href="/signin"> Login </Link>}
                {session == null && <Link href="/signup"> Register </Link>}
            </div>
            <div className="flex gap-4 md:hidden">
                {session ? <Link href="/logout"> Logout </Link> : <Link href="/signin"> Login </Link>}
                {session == null && <Link href="/signup"> Register </Link>}
            </div>
        </nav>
    );
}