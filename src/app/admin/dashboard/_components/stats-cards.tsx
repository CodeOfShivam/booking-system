import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    title: "Total Orders",
    value: "1,250",
    change: "+8.2%",
    positive: true,
    footer: "Orders increasing",
    description: "Compared to last week",
  },
  {
    title: "New Reservations",
    value: "320",
    change: "-5.1%",
    positive: false,
    footer: "Slight drop",
    description: "Fewer bookings this week",
  },
  {
    title: "Customer Reviews",
    value: "4.6 ★",
    change: "+0.3",
    positive: true,
    footer: "Positive feedback",
    description: "Avg rating this month",
  },
  {
    title: "Total Revenue",
    value: "$18,450",
    change: "+14%",
    positive: true,
    footer: "Great growth",
    description: "Based on last 30 days",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.positive ? TrendingUpIcon : TrendingDownIcon;
        const badgeColor = stat.positive ? "text-green-600" : "text-red-600";

        return (
          <Card key={index} className="gap-3 p-4 @container/card">
            <CardHeader className="relative p-0">
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="@[250px]/card:text-2xl text-2xl font-semibold tabular-nums">
                {stat.value}
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge
                  variant="outline"
                  className={`flex gap-1 rounded-lg text-xs ${badgeColor}`}
                >
                  <Icon className="size-3" />
                  {stat.change}
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start text-sm p-0">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {stat.footer} <Icon className="size-4" />
              </div>
              <div className="text-muted-foreground">{stat.description}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
