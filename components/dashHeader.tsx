import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function DashHeader({ session }: { session: any }) {
    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-white">
            <Link href="/"> <h1 className="text-2xl font-bold flex items-center gap-2"> <span> Junubi </span></h1> </Link>
            <div className="hidden md:flex items-center gap-2 relative">
                <input
                    type="text"
                    placeholder="Try keywords like 'GDP', 'Inflation', 'Unemployment', etc."
                    className="px-4 py-3 border rounded-md min-w-[60vw]"
                />
                <Button variant="default" className="absolute right-0 px-2 py-1 m-2 rounded-full">
                    <Search />
                </Button>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/datasets"> Datasets </Link>
                <Link href="/jobs"> Jobs </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile Information</DropdownMenuItem>
                        <DropdownMenuItem>Subscriptions</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Organizations</DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/organizations/new" className="text-blue-500">Add New</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="/logout" className="text-red-500">Logout</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {session == null && <Link href="/signin"> Login </Link>}
                {session == null && <Link href="/signup"> Register </Link>}
            </div>
        </nav>
    );
}