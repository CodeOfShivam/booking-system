import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const salesData = [
  {
    id: 1,
    date: "Nov. 24",
    year: "2024",
    title: "Black Friday Sale",
    discount: "Up to 70% off",
    availability: "Online & In-Store - All Customers",
    color: "bg-green-500",
    discountColor: "text-green-600",
  },
  {
    id: 2,
    date: "Dec. 20",
    year: "2024",
    title: "Holiday Blowout Sale",
    discount: "Flat 40% off",
    availability: "Online Exclusive - VIP Members",
    color: "bg-purple-500",
    discountColor: "text-purple-600",
  },
  {
    id: 3,
    date: "June 10",
    year: "2024",
    title: "Summer Clearance",
    discount: "Up to 50% off",
    availability: "In-Store Only - All Customers",
    color: "bg-red-500",
    discountColor: "text-red-600",
  },
  {
    id: 4,
    date: "Oct. 15",
    year: "2024",
    title: "Flash Electronics Sale",
    discount: "Buy 1 Get 1 Free",
    availability: "Online & In-Store - All Customers",
    color: "bg-orange-500",
    discountColor: "text-orange-600",
  },
  {
    id: 5,
    date: "Aug. 01",
    year: "2024",
    title: "Back to School Sale",
    discount: "Up to 30% off",
    availability: "Online Exclusive - All Customers",
    color: "bg-blue-500",
    discountColor: "text-blue-600",
  },
];

export default function UpcomingSales() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>UPCOMING SALES</CardTitle>
        <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent className="space-y-9 px-4">
        {salesData.map((sale) => (
          <div key={sale.id} className="flex items-start space-x-3">
            <div className="flex flex-col items-center text-center min-w-[60px]">
              <div className="text-xs text-muted-foreground">{sale.date}</div>
              <div className="text-sm">{sale.year}</div>
            </div>
            <div
              className={`w-2 h-2 rounded-full ${sale.color} mt-2 flex-shrink-0`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-sm leading-tight">
                  {sale.title} –
                </h3>
                <Badge
                  variant="secondary"
                  className={`text-xs ${sale.discountColor} bg-transparent border-0 p-0 font-medium`}
                >
                  {sale.discount}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {sale.availability}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
