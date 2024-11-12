import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dataset, orgs } from "@/db/schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { count, desc, eq } from "drizzle-orm";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
export default async function Home() {
  const session = await auth();
  // get categories by distinct
  const cats = await db.selectDistinct({
    category: dataset.sector,
  }).from(dataset)
  // get top agencies by number of datasets
  const topAgency = await db.select({
    id: orgs.id,
    logo: orgs.logo,
    name: orgs.name,
    slug: orgs.slug,
    datasets: count(),
  }).from(dataset).leftJoin(orgs, eq(dataset.orgId, orgs.id))
    .groupBy(orgs.id)
    .where(eq(orgs.isClaimed, true))
    .orderBy(desc(count()))
    .limit(6);
  // get top datasets by views
  const topDatasets = await db.select({
    id: dataset.id,
    title: dataset.title,
    sector: dataset.sector,
    slug: orgs.slug,
    logo: orgs.logo,
    name: orgs.name,
    views: dataset.views,
  }).from(dataset).leftJoin(orgs, eq(dataset.orgId, orgs.id))
    .orderBy(desc(dataset.views))
    .limit(3);
  return (
    <div className="p-4">
      <div className="h-auto md:h-screen lg:h-[70vh] py-12 flex flex-col gap-1 items-center justify-center text-center" id="home">
        <Badge variant="outline">API Now available </Badge>
        <h1 className="text-6xl font-bold"> South Sudan's</h1>
        <p className="text-2xl text-gray-500"> Open Data Portal</p>
        <div className="py-4">
          <p className="text-lg text-gray-500"> Explore national datasets, jobs, apis and more </p>
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Try keywords like 'Health', 'Security'"
              className="border-2 border-gray-300 rounded-md p-2 w-full"
            />
            <SearchIcon className="absolute right-2 top-2 text-gray-500" />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 w-3/4 items-center justify-center">
          {cats.map((category) => (
            <Link key={category.category} href={`/datasets?sector=${category.category}`} className="bg-white rounded-md p-2 cursor-pointer hover:shadow-md transition-all duration-300">
              <p className="text-gray-500">{category.category}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="my-2"> </div>
      <div className="flex flex-col gap-2 py-8">
        <h2 className="text-2xl md:text-4xl py-4 text-center">
          <span className="font-bold"> 400+ </span> datasets, <span className="font-bold"> 100+ </span> Organizations, <span className="font-bold"> 100+ </span> Jobs
        </h2>
        <div className="w-full px-4 md:w-4/5 md:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center">
            {topAgency.map((agency) => (
              <Link key={agency.id} href={`/agencies/${agency.slug}`} className="bg-gray-50 rounded-md p-2 border-2 border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300">
                <img src={agency.logo || 'https://picsum.photos/300/100'} alt={agency.name || ''} className="w-16 h-16 object-contain" />
                <p className="text-lg font-bold">{agency.name}</p>
                <p className="text-gray-500">{agency.datasets} datasets </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/datasets" className="text-gray-500"> View All </Link>
        </div>
      </div>
      <div className="bg-slate-800 py-8 rounded-xl text-white">
        <h2 className="text-2xl md:text-4xl py-4 text-center">
          Our <span className="font-bold"> most popular </span> datasets.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center px-4">
          {topDatasets.map((dataset) => (
            <Link key={dataset.id} href={`/datasets/${dataset.id}`} className="rounded-md border-2 border-gray-700 p-2 cursor-pointer hover:shadow-md transition-all duration-300 flex gap-2 items-center">
              <img src={dataset.logo || 'https://picsum.photos/300/100'} alt={dataset.name || ''} className="w-16 h-16 object-contain" />
              <div>
                <p className="text-lg font-bold">{dataset.title}</p>
                <p className="text-gray-500 text-xs">{dataset.name}</p>
                <p className="text-gray-500 text-xs">{dataset.sector}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 py-8">
        <h2 className="text-2xl md:text-4xl py-4 text-center">
          For <span className="font-bold"> commercial </span> and <span className="font-bold"> personal </span> use.
        </h2>
        <div className="w-full px-4 md:w-2/5 md:mx-auto flex flex-col gap-2">
          <div className="flex gap-2 items-center justify-center">
            <div>
              <h1 className="text-4xl font-semibold"> 25k </h1>
            </div>
            <div className="text-xs">
              <p className="text-gray-500"> total API calls </p>
              <p className="text-gray-500"> Average <span className="font-bold"> 100 </span> calls per day </p>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <div>
              <h1 className="text-4xl font-semibold"> 12k </h1>
            </div>
            <div className="text-xs">
              <p className="text-gray-500"> total views </p>
              <p className="text-gray-500"> Average <span className="font-bold"> 50 </span> views per day </p>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <div>
              <h1 className="text-4xl font-semibold"> 5k </h1>
            </div>
            <div className="text-xs">
              <p className="text-gray-500"> total downloads </p>
              <p className="text-gray-500"> Average <span className="font-bold"> 20 </span> downloads daily </p>
            </div>
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
  );
}
