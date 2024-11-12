"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Download, MailIcon, PersonStandingIcon, Share, XCircleIcon } from "lucide-react"
import DataCard from "@/components/datacard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function DataResults({ sectors, dataformats, sectorSearch, formatSearch, sortSearch, sourceSearch, search, session }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(false);
    const [selectedData, setSelectedData] = useState<null | any>(null);
    const [selectedSet, setSelectedSet] = useState<null | any>(null);


    const [selectedSector, setSelectedSector] = useState(sectorSearch);
    const [selectedFormat, setSelectedFormat] = useState(formatSearch);
    const [selectedSource, setSelectedSource] = useState(sourceSearch);
    const [selectedSort, setSelectedSort] = useState(sortSearch);

    const fetchData = async () => {
        const res = await fetch(`/api/datasets?sector=${selectedSector}&format=${selectedFormat}&source=${selectedSource}&sort=${selectedSort}&search=${search}`);
        const data = await res.json();
        setData(data.data);
    }
    const fetchSet = async (set: any) => {
        const res = await fetch(`/api/datasets/${set.id}`);
        const data = await res.json();
        setSelectedSet(data.sets);
    }
    useEffect(() => {
        setLoading(true);
        // await two seconds
        setTimeout(() => {
            fetchData();
            setLoading(false);
        }, 2000);
    }, [selectedSector, selectedFormat, selectedSource, selectedSort]);

    return <div>
        <div className="sticky w-full bg-white flex gap-2 items-center justify-between px-4 py-2 shadow-sm">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        {selectedSector == "" ? "Sectors" : selectedSector}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {sectors.map((sector) => (
                        <DropdownMenuItem key={sector.sector} onClick={() => setSelectedSector(sector.sector)}> {sector.sector} </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        {selectedSource == "" ? "Sources" : selectedSource}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedSource("Government")}> Government </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedSource("Non-Government")}> Non-Government </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedSource("Private Sector")}> Private Sector </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        {selectedFormat == "" ? "Formats" : selectedFormat}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {dataformats.map((format) => (
                        <DropdownMenuItem key={format.format} onClick={() => setSelectedFormat(format.format)}> {format.format} </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        {selectedSort == "" ? "Sort by: Relevance" : selectedSort}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedSort("Relevance")}>Relevance</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedSort("Newest")}>Date (Newest)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedSort("Oldest")}>Date (Oldest)</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        {(selectedSource != "" || selectedSector != "" || selectedFormat != "" || search != "") && <div className="p-2 bg-white flex gap-2 items-center">
            <h2 className="text-xl font-bold mb-2"> {data.length} Results </h2>
            {selectedSource != "" && <Badge variant="outline" className="flex items-center gap-2"> {selectedSource} <XCircleIcon onClick={() => setSelectedSource("")} className="cursor-pointer" /> </Badge>}
            {selectedSector != "" && <Badge variant="outline" className="flex items-center gap-2"> {selectedSector} <XCircleIcon onClick={() => setSelectedSector("")} className="cursor-pointer" /> </Badge>}
            {selectedFormat != "" && <Badge variant="outline" className="flex items-center gap-2"> {selectedFormat} <XCircleIcon onClick={() => setSelectedFormat("")} className="cursor-pointer" /> </Badge>}
            {search != "" && <Badge variant="outline" className="flex items-center gap-2"> {search} </Badge>}
        </div>}
        <div className="flex gap-4">
            <aside className="sticky top-0 h-screen w-1/5 bg-white p-4">
                {data.length > 0 && <h2 className="text-lg font-bold mb-4"> {data.length} Results </h2>}
                <hr />
                {loading === true ? [0, 1, 2, 3, 4, 5, 6].map(item => <Skeleton key={item} className="w-full h-[100px] rounded-md my-2" />) : data.map((list: any) => (
                    <div onClick={() => { setSelectedData(list); fetchSet(list) }} key={list.id} className={cn("cursor-pointer hover:bg-gray-100", selectedData != null && selectedData.id == list.id ? "bg-gray-100" : "")}>
                        <DataCard title={list.title} dataFormat={list.format} agency={list.name} date={list.date} />
                    </div>
                ))}
            </aside>
            <main className="flex-1 p-4 bg-white my-4 mx-2 rounded-lg">
                {selectedData ? <section id="dataset" className="flex flex-col gap-2">
                    <div className="flex">
                        <Badge variant="outline" className="flex items-center gap-2">
                            <PersonStandingIcon />
                            <span> {selectedData.sector} </span>
                        </Badge>
                    </div>
                    <h2 className="text-2xl font-bold mb-2"> {selectedData.title} </h2>
                    <p className="text-sm text-gray-500"> Date {selectedData.date} </p>
                    <Link href={"/agency/" + selectedData.slug} className="underline text-blue-500"> {selectedData.name} </Link>
                    <div className="flex gap-2 items-center py-2">
                        <Button variant="default"> <Download /> Download </Button>
                        <AlertDialog>
                            <AlertDialogTrigger><Button variant="outline"> <MailIcon /> {selectedData.subscribed == null ? "Subscribe" : "Unsubscribe"} </Button></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Subscribe to {selectedData.title}?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You will receive an email when this dataset is updated.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction>{session ? "Continue" : "Login to subscribe"}</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Button variant="outline"> <Share /> </Button>
                    </div>
                    <div className="text-gray-500">
                        {selectedData.desc}
                    </div>
                    <div className="flex flex-col gap-2 py-4">
                        <h3 className="text-lg font-bold"> Dataset usage </h3>
                        <div className="flex gap-8">
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold text-gray-500"> {selectedData.views} </span>
                                <span className="text-xs text-gray-500"> VIEWS </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold text-gray-500"> {selectedData.downloads} </span>
                                <span className="text-xs text-gray-500"> DOWNLOADS </span>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </section> : <div className="flex items-center justify-center h-full">
                    <h2 className="text-2xl font-bold"> Select Dataset to view </h2>
                </div>}
            </main>
        </div>
    </div>;
}