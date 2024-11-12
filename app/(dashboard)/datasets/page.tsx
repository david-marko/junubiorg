
import { db } from "@/lib/db";
import { dataset } from "@/db/schema";
import DataResults from "./dataresults";

import { auth } from "@/lib/auth";
export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const session = await auth();
    // options, topics, 
    let sectorSearch = searchParams.sector ?? "";
    let formatSearch = searchParams.format ?? "";
    let sortSearch = searchParams.sort ?? "Newest";
    let sourceSearch = searchParams.source ?? "";
    let search = searchParams.search ?? "";
    const sectors = await db.selectDistinct({ sector: dataset.sector }).from(dataset);
    const formats = await db.selectDistinct({ format: dataset.format }).from(dataset);
    return (
        <div>
            <DataResults sectors={sectors} dataformats={formats} sectorSearch={sectorSearch} formatSearch={formatSearch} sortSearch={sortSearch} sourceSearch={sourceSearch} search={search} session={session} />
        </div>
    );
}