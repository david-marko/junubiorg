import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { SearchIcon } from "lucide-react";
export default async function Home() {
  const session = await auth();
  const categories = [
    'Health',
    'Education',
    'Economy',
    'Environment',
    'Government',
    'Security',
    'Transport',
    'Agriculture',
    'Government',
    'Security',
    'Transport',
    'Agriculture',
    'Other',
  ];

  const topAgencies = [
    {
      logo: 'https://picsum.photos/300/100',
      name: 'Ministry of Health',
      slug: 'ministry-of-health',
      datasets: 12,
      jobs: 4,
    },
    {
      logo: 'https://picsum.photos/300/100',
      name: 'Land Transport Authority',
      slug: 'land-transport-authority',
      datasets: 0,
      jobs: 4,
    },
    {
      logo: 'https://picsum.photos/300/100',
      name: 'National Bureau of Statistics',
      slug: 'national-bureau-of-statistics',
      datasets: 10,
      jobs: 5,
    },
    {
      logo: 'https://picsum.photos/300/100',
      name: 'Ministry of Health',
      slug: 'ministry-of-health',
      datasets: 12,
      jobs: 4,
    },
    {
      logo: 'https://picsum.photos/300/100',
      name: 'Land Transport Authority',
      slug: 'land-transport-authority',
      datasets: 0,
      jobs: 4,
    },
    {
      logo: 'https://picsum.photos/300/100',
      name: 'National Bureau of Statistics',
      slug: 'national-bureau-of-statistics',
      datasets: 10,
      jobs: 5,
    },
  ];
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
          {categories.map((category) => (
            <div key={category} className="bg-gray-100 rounded-md p-2 cursor-pointer hover:shadow-md transition-all duration-300">
              <p className="text-gray-500">{category}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-2"> </div>
      <div className="flex flex-col gap-2 py-8">
        <h2 className="text-2xl md:text-4xl py-4 text-center">
          <span className="font-bold"> 4000+ </span> datasets, <span className="font-bold"> 100+ </span> Organizations, <span className="font-bold"> 100+ </span> Jobs
        </h2>
        <div className="w-full px-4 md:w-4/5 md:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center">
            {topAgencies.map((agency) => (
              <div key={agency.slug} className="bg-gray-50 rounded-md p-2 border-2 border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300">
                <img src={agency.logo} alt={agency.name} className="w-16 h-16 object-contain" />
                <p className="text-lg font-bold">{agency.name}</p>
                <p className="text-gray-500">{agency.datasets} datasets . {agency.jobs} jobs </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button variant="outline"> View All </Button>
        </div>
      </div>
      <div className="bg-slate-800 py-8 rounded-xl text-white">
        <h2 className="text-2xl md:text-4xl py-4 text-center">
          Our <span className="font-bold"> most used </span> datasets.
        </h2>
      </div>
      <div className="flex flex-col gap-2 py-8">
        <h2 className="text-2xl md:text-4xl py-4 text-center">
          For <span className="font-bold"> commercial </span> and <span className="font-bold"> personal </span> use.
        </h2>
        <div className="w-full px-4 md:w-2/5 md:mx-auto flex flex-col gap-2">
          <div className="flex gap-2 items-center justify-center">
            <div>
              <h1 className="text-4xl font-semibold"> 239k </h1>
            </div>
            <div className="text-xs">
              <p className="text-gray-500"> total API calls </p>
              <p className="text-gray-500"> Average <span className="font-bold"> 1000 </span> calls per day </p>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <div>
              <h1 className="text-4xl font-semibold"> 1.2M </h1>
            </div>
            <div className="text-xs">
              <p className="text-gray-500"> total views </p>
              <p className="text-gray-500"> Average <span className="font-bold"> 1000 </span> views per day </p>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <div>
              <h1 className="text-4xl font-semibold"> 29k </h1>
            </div>
            <div className="text-xs">
              <p className="text-gray-500"> total downloads </p>
              <p className="text-gray-500"> Average <span className="font-bold"> 1000 </span> downloads daily </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
