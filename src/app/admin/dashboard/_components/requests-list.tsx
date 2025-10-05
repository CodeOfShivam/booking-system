"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, Trash2, Check } from "lucide-react";

interface RequestData {
  id: string;
  name: string;
  avatar: string;
  timeAgo: string;
  initials: string;
}

const staticRequests: RequestData[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "/users/user-1.jpg",
    timeAgo: "2 minutes ago",
    initials: "AJ",
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "/users/user-2.jpg",
    timeAgo: "10 minutes ago",
    initials: "BS",
  },
  {
    id: "3",
    name: "Charlie Brown",
    avatar: "/users/user-3.jpg",
    timeAgo: "1 hour ago",
    initials: "CB",
  },
  {
    id: "4",
    name: "Diana Prince",
    avatar: "/users/user-4.jpg",
    timeAgo: "Yesterday",
    initials: "DP",
  },
  {
    id: "5",
    name: "Ethan Hunt",
    avatar: "/users/user-5.jpg",
    timeAgo: "2 days ago",
    initials: "EH",
  },
  {
    id: "6",
    name: "John Doe",
    avatar: "/users/user-6.jpg",
    timeAgo: "2 days ago",
    initials: "EH",
  },
];

export function RequestsList() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">Requests</CardTitle>
        <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent className="space-y-0">
        {staticRequests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center space-x-3 flex-1">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={request.avatar || "/placeholder.svg"}
                  alt={request.name}
                />
                <AvatarFallback className="bg-gray-200 text-gray-600 text-sm font-medium">
                  {request.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm">
                  {request.name}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {request.timeAgo}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 border-0 h-8 px-3 text-xs font-medium"
              >
                <Check className="h-3 w-3 mr-1" />
                Accept
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
