"use client";

import StackedColumnChart from "@/components/charts/column/stacked-column-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StackedColumnData = [
  { month: "March", takeaway: 400, delivery: 300, catering: 200 },
  { month: "April", takeaway: 300, delivery: 350, catering: 250 },
  { month: "May", takeaway: 450, delivery: 400, catering: 300 },
  { month: "June", takeaway: 400, delivery: 300, catering: 200 },
  { month: "July", takeaway: 420, delivery: 310, catering: 190 },
  { month: "August", takeaway: 120, delivery: 310, catering: 190 },
  { month: "September", takeaway: 420, delivery: 110, catering: 390 },
];

const StackedColumnConfig = {
  takeaway: { label: "Takeaway", color: "primary" },
  delivery: { label: "Delivery", color: "primary-light" },
  catering: { label: "Catering", color: "primary-lighter" },
};

export default function TotalRevenue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>TOTAL REVENUE</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-100">
          <StackedColumnChart
            data={StackedColumnData}
            xKey="month"
            stackKeys={["takeaway", "delivery", "catering"]}
            config={StackedColumnConfig}
          />
        </div>
      </CardContent>
    </Card>
  );
}
