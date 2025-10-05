import type React from "react";
import {
  ChevronRight,
  Lightbulb,
  ShoppingBag,
  Gamepad2,
  Book,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Category {
  id: number;
  name: string;
  sales: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

export default function CategoriesBySales() {
  const categories: Category[] = [
    {
      id: 1,
      name: "Electronics",
      sales: "8,14,233",
      change: "5.36%",
      isPositive: true,
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      id: 2,
      name: "Fashion",
      sales: "12,865",
      change: "5.36%",
      isPositive: true,
      bgColor: "bg-violet-100",
      iconColor: "text-violet-600",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      id: 3,
      name: "Toys",
      sales: "34,753",
      change: "5.36%",
      isPositive: true,
      bgColor: "bg-rose-100",
      iconColor: "text-rose-600",
      icon: <Gamepad2 className="w-5 h-5" />,
    },
    {
      id: 4,
      name: "Books",
      sales: "1,58,156",
      change: "7.45%",
      isPositive: false,
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      icon: <Book className="w-5 h-5" />,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>TOP CATEGORIES BY SALES</CardTitle>
        <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="space-y-3 border p-3 rounded-lg border-dashed"
            >
              <div className="flex items-center gap-3 ">
                <div className={`p-2 rounded-lg ${category.bgColor}`}>
                  <div className={category.iconColor}>{category.icon}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{category.name}</h3>
                  <p className="text-lg font-bold">{category.sales}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-muted-foreground">
                  {category.isPositive ? "Increased By" : "Decreased By"}
                </span>
                <span
                  className={
                    category.isPositive
                      ? "text-emerald-600 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {category.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
