import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Download, MailIcon, PersonStandingIcon, Share } from "lucide-react"
import DataCard from "@/components/datacard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Footer from "@/components/footer";

export default function Page() {
    // options, topics, 
    const lists = [
        { title: "Entities Registered with ACRA", dataFormat: "CSV", agency: "MDDI", size: "100MB", date: "2021-01-01" },
        { title: "COVID Weekly Stats", dataFormat: "CSV", agency: "MDDI", size: "100MB", date: "2021-01-01" },
        { title: "Resale Flat Prices", dataFormat: "CSV", agency: "MDDI", size: "100MB", date: "2021-01-01" },
        { title: "Population by Region", dataFormat: "CSV", agency: "MDDI", size: "100MB", date: "2021-01-01" },
    ]
    return (
        <div>
            <div className="sticky w-full bg-white flex gap-2 items-center justify-between px-4 py-2 shadow-sm">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Topics
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Government</DropdownMenuItem>
                        <DropdownMenuItem>Healthcare</DropdownMenuItem>
                        <DropdownMenuItem>Education</DropdownMenuItem>
                        <DropdownMenuItem>Environment</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Columns
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>All Columns</DropdownMenuItem>
                        <DropdownMenuItem>Selected Columns</DropdownMenuItem>
                        <DropdownMenuItem>Custom Selection</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Period
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                        <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                        <DropdownMenuItem>Last 3 months</DropdownMenuItem>
                        <DropdownMenuItem>Last year</DropdownMenuItem>
                        <DropdownMenuItem>Custom range</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Formats
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>CSV</DropdownMenuItem>
                        <DropdownMenuItem>JSON</DropdownMenuItem>
                        <DropdownMenuItem>XML</DropdownMenuItem>
                        <DropdownMenuItem>PDF</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Agencies
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>MDDI</DropdownMenuItem>
                        <DropdownMenuItem>NEA</DropdownMenuItem>
                        <DropdownMenuItem>ACRA</DropdownMenuItem>
                        <DropdownMenuItem>MOH</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Sort by: Relevance
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Relevance</DropdownMenuItem>
                        <DropdownMenuItem>Date (Newest)</DropdownMenuItem>
                        <DropdownMenuItem>Date (Oldest)</DropdownMenuItem>
                        <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                        <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex gap-4">
                <aside className="sticky top-0 h-screen w-1/5 bg-white p-4">
                    <h2 className="text-xl font-bold mb-4"> 123 Results </h2>
                    <hr />
                    {lists.map((list) => (
                        <DataCard key={list.title} title={list.title} dataFormat={list.dataFormat} agency={list.agency} size={list.size} date={list.date} />
                    ))}
                </aside>
                <main className="flex-1 p-4 bg-white my-4 mx-2 rounded-lg">
                    <section id="dataset" className="flex flex-col gap-2">
                        <div className="flex">
                            <Badge variant="outline" className="flex items-center gap-2">
                                <PersonStandingIcon />
                                <span> Social </span>
                            </Badge>
                        </div>
                        <h2 className="text-2xl font-bold mb-2"> Government Gazzette Supplement 2024 </h2>
                        <p className="text-sm text-gray-500"> Data from Feb 2024 to Jul 2024 - Updated 3months ago </p>
                        <Link href={"/"} className="underline text-blue-500"> MDDI (Ministry of Digital Development) </Link>
                        <div className="flex gap-2 items-center py-2">
                            <Button variant="default"> <Download /> Download </Button>
                            <Button variant="outline"> <MailIcon /> Subscribe </Button>
                            <Button variant="outline"> <Share /> </Button>
                        </div>
                        <div className="text-gray-500">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, vitae consectetur. Neque repellat, modi quo architecto quasi vel perferendis inventore quos sit voluptate vitae tenetur ea pariatur exercitationem ipsa nam.
                            Illo quam voluptates, dolorem quia optio delectus quos ducimus debitis ex error ab necessitatibus totam ipsum assumenda vel aperiam blanditiis officiis illum cum! Rem quaerat quibusdam, id quos minima cupiditate.
                            Vitae perspiciatis sed corporis quis enim incidunt corrupti odio cum placeat eos quibusdam commodi totam in iure neque sunt molestiae, libero aliquam ea minima molestias pariatur maxime? Rerum, sit earum!
                            Eum sapiente accusamus et, ad eius placeat tempora. Dolor eveniet fugit dolores, veniam mollitia soluta sint non odio ex perspiciatis consequatur voluptates quidem delectus vel explicabo ad possimus expedita asperiores!
                            <br />
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio maiores totam ullam magnam aperiam natus ad? Modi accusamus, ratione tempora inventore, error quasi ipsa sint sed neque ducimus assumenda corrupti.
                            Harum error consectetur nihil voluptas omnis totam odio temporibus praesentium, odit doloribus quisquam eligendi, in eveniet sequi rerum. Laboriosam perspiciatis magnam consequuntur! Voluptatum odit id adipisci, ut ipsa consectetur? Tempora?
                        </div>
                        <div className="flex flex-col gap-2 py-4">
                            <h3 className="text-lg font-bold"> Dataset usage </h3>
                            <div className="flex gap-8">
                                <div className="flex flex-col">
                                    <span className="text-lg font-semibold text-gray-500"> 29 </span>
                                    <span className="text-xs text-gray-500"> VIEWS </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-semibold text-gray-500"> 29 </span>
                                    <span className="text-xs text-gray-500"> DOWNLOADS </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-semibold text-gray-500"> 29 </span>
                                    <span className="text-xs text-gray-500"> API CALLS </span>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </section>
                </main>
            </div>
        </div>
    );
}