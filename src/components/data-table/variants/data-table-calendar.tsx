// "use client";

// import type React from "react";
// import { useState, useMemo } from "react";
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   isSameDay,
//   addMonths,
//   subMonths,
// } from "date-fns";
// import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { DataTableToolbar } from "../data-table-toolbar";
// import type { FilterMeta } from "../data-table";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// interface CalendarItem {
//   id: string | number;
//   title?: string;
//   date: string | Date;
//   status?: string;
//   category?: string;
// }

// interface DataTableCalendarProps<TData extends CalendarItem> {
//   data: TData[];
//   isLoading?: boolean;
//   filterMeta?: FilterMeta[];
//   searchableColumns?: (keyof TData)[];
//   dateField?: keyof TData;
//   titleField?: keyof TData;
//   statusField?: keyof TData;
//   className?: string;
//   calendarClassName?: string;
//   renderCalendarItem?: (item: TData) => React.ReactNode;
// }

// export function DataTableCalendar<TData extends CalendarItem>({
//   data,
//   isLoading = false,
//   filterMeta = [],
//   searchableColumns = [],
//   dateField = "date" as keyof TData,
//   titleField = "title" as keyof TData,
//   statusField = "status" as keyof TData,
//   className,
//   calendarClassName,
//   renderCalendarItem,
// }: DataTableCalendarProps<TData>) {
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   const filteredData = useMemo(() => {
//     if (!globalFilter) return data;
//     const lowercasedFilter = globalFilter.toLowerCase();
//     return data.filter((item) =>
//       searchableColumns.some((column) => {
//         const value = item[column];
//         return value && String(value).toLowerCase().includes(lowercasedFilter);
//       })
//     );
//   }, [data, globalFilter, searchableColumns]);

//   const calendarDays = useMemo(() => {
//     const monthStart = startOfMonth(currentMonth);
//     const monthEnd = endOfMonth(currentMonth);
//     const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
//     const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const firstDayOfMonth = monthStart.getDay();

//     const calendarGrid: (Date | null)[][] = [];
//     calendarGrid.push(dayNames as unknown as Date[]); // type workaround for header

//     let currentWeek = Array<Date | null>(7).fill(null);
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       currentWeek[i] = null;
//     }

//     days.forEach((day, index) => {
//       const dayOfWeek = day.getDay();
//       currentWeek[dayOfWeek] = day;
//       if (dayOfWeek === 6 || index === days.length - 1) {
//         calendarGrid.push([...currentWeek]);
//         currentWeek = Array(7).fill(null);
//       }
//     });

//     return calendarGrid;
//   }, [currentMonth]);

//   const itemsByDate = useMemo(() => {
//     const grouped: Record<string, TData[]> = {};
//     filteredData.forEach((item) => {
//       const date = new Date(item[dateField] as string | Date);
//       const dateKey = format(date, "yyyy-MM-dd");
//       if (!grouped[dateKey]) {
//         grouped[dateKey] = [];
//       }
//       grouped[dateKey].push(item);
//     });
//     return grouped;
//   }, [filteredData, dateField]);

//   const defaultRenderCalendarItem = (item: TData) => {
//     const title = (item[titleField] as string) || "Untitled";
//     const status = item[statusField] as string;

//     return (
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <div
//               className={cn(
//                 "px-2 py-1 text-xs rounded-sm mb-1 truncate",
//                 status === "completed" || status === "success"
//                   ? "bg-green-100 text-green-800"
//                   : status === "in-progress" || status === "processing"
//                   ? "bg-blue-100 text-blue-800"
//                   : status === "pending"
//                   ? "bg-yellow-100 text-yellow-800"
//                   : status === "cancelled" || status === "failed"
//                   ? "bg-red-100 text-red-800"
//                   : "bg-slate-100 text-slate-800"
//               )}
//             >
//               {title}
//             </div>
//           </TooltipTrigger>
//           <TooltipContent side="top">
//             <div className="space-y-1">
//               <p className="font-medium">{title}</p>
//               {status && (
//                 <Badge
//                   variant={
//                     status === "completed" || status === "success"
//                       ? "success"
//                       : status === "in-progress" || status === "processing"
//                       ? "default"
//                       : status === "pending"
//                       ? "secondary"
//                       : status === "cancelled" || status === "failed"
//                       ? "destructive"
//                       : "outline"
//                   }
//                 >
//                   {status}
//                 </Badge>
//               )}
//               <p className="text-xs text-muted-foreground">
//                 {format(
//                   new Date(item[dateField] as string | Date),
//                   "MMMM d, yyyy"
//                 )}
//               </p>
//             </div>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//     );
//   };

//   const handlePreviousMonth = () =>
//     setCurrentMonth((prev) => subMonths(prev, 1));
//   const handleNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));
//   const handleToday = () => setCurrentMonth(new Date());

//   const table = {
//     getState: () => ({ columnFilters: [], globalFilter }),
//     resetColumnFilters: () => {},
//   };

//   return (
//     <div className={cn("space-y-4", className)}>
//       <DataTableToolbar
//         table={table}
//         filterMeta={filterMeta}
//         searchableColumns={searchableColumns}
//         globalFilter={globalFilter}
//         setGlobalFilter={setGlobalFilter}
//       />
//       <Card className={cn(calendarClassName)}>
//         <CardHeader className="pb-2">
//           <div className="flex items-center justify-between">
//             <CardTitle className="text-lg flex items-center">
//               <CalendarIcon className="mr-2 h-5 w-5" />
//               {format(currentMonth, "MMMM yyyy")}
//             </CardTitle>
//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={handlePreviousMonth}
//               >
//                 <ChevronLeft className="h-4 w-4" />
//                 <span className="sr-only">Previous month</span>
//               </Button>
//               <Button variant="outline" size="sm" onClick={handleToday}>
//                 Today
//               </Button>
//               <Button variant="outline" size="icon" onClick={handleNextMonth}>
//                 <ChevronRight className="h-4 w-4" />
//                 <span className="sr-only">Next month</span>
//               </Button>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="p-0">
//           {isLoading ? (
//             <div className="p-8 text-center">Loading calendar...</div>
//           ) : (
//             <div className="grid grid-cols-7 border-t border-l">
//               {calendarDays[0].map((dayName, index) => (
//                 <div
//                   key={`header-${index}`}
//                   className="p-2 text-center font-medium text-sm border-r border-b"
//                 >
//                   {dayName as string}
//                 </div>
//               ))}

//               {calendarDays.slice(1).map((week, weekIndex) =>
//                 week.map((day, dayIndex) => {
//                   if (!day) {
//                     return (
//                       <div
//                         key={`empty-${weekIndex}-${dayIndex}`}
//                         className="border-r border-b bg-muted/20 p-2 min-h-[100px]"
//                       />
//                     );
//                   }

//                   const dateKey = format(day, "yyyy-MM-dd");
//                   const isToday = isSameDay(day, new Date());
//                   const items = itemsByDate[dateKey] || [];

//                   return (
//                     <div
//                       key={`day-${dateKey}`}
//                       className={cn(
//                         "border-r border-b p-1 min-h-[100px]",
//                         isToday && "bg-muted/30"
//                       )}
//                     >
//                       <div className="flex justify-between items-center mb-1">
//                         <span
//                           className={cn(
//                             "text-sm font-medium",
//                             isToday &&
//                               "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center"
//                           )}
//                         >
//                           {format(day, "d")}
//                         </span>
//                         {items.length > 0 && (
//                           <Badge variant="outline" className="text-xs">
//                             {items.length}
//                           </Badge>
//                         )}
//                       </div>

//                       <ScrollArea className="h-[80px]">
//                         {items.map((item) => (
//                           <div key={`item-${String(item.id)}`}>
//                             {renderCalendarItem
//                               ? renderCalendarItem(item)
//                               : defaultRenderCalendarItem(item)}
//                           </div>
//                         ))}
//                       </ScrollArea>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
