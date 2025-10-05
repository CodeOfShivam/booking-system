import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";

interface LocationData {
  country: string;
  flag: string;
  percentage: string;
  growth: number;
  visitors: string;
  isPositiveGrowth: boolean;
}

const locationData: LocationData[] = [
  {
    country: "United States",
    flag: "/flags/us.jpg",
    percentage: "17.864%",
    growth: 12.86,
    visitors: "1,32,190",
    isPositiveGrowth: false,
  },
  {
    country: "Germany",
    flag: "/flags/germany.jpg",
    percentage: "16.984%",
    growth: 2.76,
    visitors: "5,86,486",
    isPositiveGrowth: true,
  },
  {
    country: "French",
    flag: "/flags/french.jpg",
    percentage: "27.856%",
    growth: 13.73,
    visitors: "9,75,586",
    isPositiveGrowth: true,
  },
  {
    country: "Canada",
    flag: "/flags/canada.jpg",
    percentage: "12.957%",
    growth: 11.86,
    visitors: "4,32,767",
    isPositiveGrowth: true,
  },
  {
    country: "Spain",
    flag: "/flags/spain.jpg",
    percentage: "19.768%",
    growth: 11.86,
    visitors: "7,32,767",
    isPositiveGrowth: true,
  },
  {
    country: "Argentina",
    flag: "/flags/argentina.jpg",
    percentage: "36.870%",
    growth: 4.76,
    visitors: "7,19,864",
    isPositiveGrowth: false,
  },
  {
    country: "Italy",
    flag: "/flags/italy.jpg",
    percentage: "36.870%",
    growth: 12.76,
    visitors: "6,65,879",
    isPositiveGrowth: true,
  },
  {
    country: "Mexico",
    flag: "/flags/mexico.jpg",
    percentage: "32.758%",
    growth: 5.76,
    visitors: "2,32,767",
    isPositiveGrowth: false,
  },
  {
    country: "Argentina",
    flag: "/flags/argentina.jpg",
    percentage: "36.870%",
    growth: 4.76,
    visitors: "7,19,864",
    isPositiveGrowth: false,
  },
];

export default function AudienceLocations() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>TOP AUDIENCE LOCATIONS</CardTitle>
        <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent className="space-y-0">
        {locationData.map((location, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="text-2xl">
                <Image
                  src={location.flag}
                  alt={`${location.country} flag`}
                  width={24}
                  height={24}
                  className="inline-block"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm">
                  {location.country}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {location.percentage}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {location.isPositiveGrowth ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={`text-xs font-medium ${
                    location.isPositiveGrowth
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {location.isPositiveGrowth ? "+" : "-"}
                  {location.growth}%
                </span>
              </div>

              <div className="text-sm font-semibold text-gray-900 min-w-[80px] text-right">
                {location.visitors}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
