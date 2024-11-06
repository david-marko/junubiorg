export default function DataCard({ title, dataFormat, agency, size, date }: { title: string, dataFormat: string, agency: string, size: string, date: string }) {
    return (
        <div className="bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-100">
            <h1 className="text-lg font-semibold truncate ..."> {title} </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span> {agency} </span>
                <span> {dataFormat} </span>
                <span> {size} </span>
            </div>
            <p className="text-xs text-gray-500"> {date} </p>
        </div>
    );
}