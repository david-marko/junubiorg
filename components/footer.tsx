import Link from "next/link";

export default function Footer() {
    return (
        <nav className="flex flex-col gap-2 justify-center items-center pt-12 pb-4">
            <div className="flex gap-4">
                <Link href="/"> Feedback </Link>
                <Link href="/"> Contribute </Link>
                <Link href="/"> Support </Link>
                <Link href="/"> Privacy & Terms </Link>
            </div>
            <p className="text-sm text-gray-500"> &copy; 2024 All rights reserved </p>
        </nav>
    );
}