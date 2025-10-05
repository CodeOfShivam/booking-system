import type React from "react";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RevenueChannel {
  id: number;
  name: string;
  amount: string;
  growth: string;
  color: string;
  width: string;
  icon: React.ReactNode;
}

export default function RevenueChannels() {
  const channels: RevenueChannel[] = [
    {
      id: 1,
      name: "Google Ads",
      amount: "$25",
      growth: "3.5%",
      color: "bg-emerald-500",
      width: "w-[70%]",
      icon: (
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
          <span className="text-sm font-bold">G</span>
        </div>
      ),
    },
    {
      id: 2,
      name: "Facebook Ads",
      amount: "$15",
      growth: "2.8%",
      color: "bg-violet-500",
      width: "w-[45%]",
      icon: (
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-600">
          <span className="text-sm font-bold">f</span>
        </div>
      ),
    },
    {
      id: 3,
      name: "Email Marketing",
      amount: "$65",
      growth: "3.0%",
      color: "bg-rose-500",
      width: "w-[25%]",
      icon: (
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
      ),
    },
    {
      id: 4,
      name: "Referral Traffic",
      amount: "$400",
      growth: "2.5%",
      color: "bg-amber-500",
      width: "w-[15%]",
      icon: (
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>TOP REVENUE</CardTitle>
        <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </CardHeader>

      <div className="px-6 flex rounded">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className={`h-1 m-1 ${channel.color} flex-1`}
          ></div>
        ))}
      </div>

      <div className="px-6 flex items-center justify-between">
        <div className="text-sm font-medium">Overall Adds</div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-emerald-600">2.74% ↑</span>
          <span className="text-base font-semibold">1,25</span>
        </div>
      </div>
      <CardContent className="space-y-6">
        {channels.map((channel) => (
          <div key={channel.id} className="py-3 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {channel.icon}
                <span className="font-medium text-sm">{channel.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-medium"
                  style={{ color: `var(--${channel.color.split("-")[1]}-500)` }}
                >
                  {channel.growth}
                </span>
                <span className="font-semibold">{channel.amount}</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${channel.color} rounded-full ${channel.width}`}
              ></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
