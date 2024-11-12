import { Badge } from "./ui/badge";

export default function DataCard({ title, dataFormat, agency, date }: { title: string, dataFormat: string, agency: string, date: string }) {
    return (
        <div className="rounded-lg p-4 cursor-pointer hover:bg-gray-100">
            <h1 className="text-lg font-semibold truncate ..."> {title} </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="truncate"> {agency} </span>
                <Badge variant="outline" className="m-0"> {dataFormat} </Badge>
            </div>
            <p className="text-xs text-gray-500"> {date} </p>
        </div>
    );
}