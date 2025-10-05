// "use client";

// import type React from "react";
// import { useState, useMemo } from "react";
// import { format, isValid, differenceInDays } from "date-fns";
// import { Calendar } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { DataTableToolbar } from "../data-table-toolbar";
// import type { FilterMeta } from "../data-table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// interface TimelineItem {
//   id: string | number;
//   title?: string;
//   startDate: string | Date;
//   endDate?: string | Date;
//   status?: string;
//   category?: string;
//   [key: string]: string | number | Date | undefined;
// }

// interface DataTableTimelineProps<TData extends TimelineItem> {
//   data: TData[];
//   isLoading?: boolean;
//   filterMeta?: FilterMeta[];
//   searchableColumns?: string[];
//   dateField?: keyof TData;
//   titleField?: keyof TData;
//   categoryField?: keyof TData;
//   statusField?: keyof TData;
//   className?: string;
//   timelineClassName?: string;
//   renderTimelineItem?: (item: TData) => React.ReactNode;
// }

// interface MockTable {
//   getState: () => { columnFilters: unknown[]; globalFilter: string };
//   resetColumnFilters: () => void;
// }

// export function DataTableTimeline<TData extends TimelineItem>({
//   data,
//   isLoading = false,
//   filterMeta = [],
//   searchableColumns = [],
//   dateField = "startDate" as keyof TData,
//   titleField = "title" as keyof TData,
//   categoryField = "category" as keyof TData,
//   statusField = "status" as keyof TData,
//   className,
//   timelineClassName,
//   renderTimelineItem,
// }: DataTableTimelineProps<TData>) {
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

//   const filteredData = useMemo(() => {
//     if (!globalFilter) return data;

//     const lowercasedFilter = globalFilter.toLowerCase();
//     return data.filter((item) =>
//       searchableColumns.some((column) => {
//         const value = item[column as keyof TData];
//         return value && String(value).toLowerCase().includes(lowercasedFilter);
//       })
//     );
//   }, [data, globalFilter, searchableColumns]);

//   const sortedData = useMemo(() => {
//     return [...filteredData].sort((a, b) => {
//       const dateA = new Date(a[dateField] as string | Date).getTime();
//       const dateB = new Date(b[dateField] as string | Date).getTime();
//       return dateA - dateB;
//     });
//   }, [filteredData, dateField]);

//   const { startDate, endDate, dateLabels } = useMemo(() => {
//     if (sortedData.length === 0) {
//       const today = new Date();
//       const oneMonthLater = new Date();
//       oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

//       return {
//         startDate: today,
//         endDate: oneMonthLater,
//         dateLabels: [],
//       };
//     }

//     let minDate = new Date(sortedData[0][dateField] as string | Date);
//     let maxDate = minDate;

//     sortedData.forEach((item) => {
//       const startDate = new Date(item[dateField] as string | Date);
//       const endDate = item.endDate ? new Date(item.endDate) : startDate;

//       if (startDate < minDate) minDate = startDate;
//       if (endDate > maxDate) maxDate = endDate;
//     });

//     if (differenceInDays(maxDate, minDate) < 30) {
//       maxDate = new Date(minDate);
//       maxDate.setMonth(maxDate.getMonth() + 1);
//     }

//     const labels = [];
//     const currentDate = new Date(minDate);

//     while (currentDate <= maxDate) {
//       labels.push({
//         date: new Date(currentDate),
//         label: format(
//           currentDate,
//           viewMode === "day"
//             ? "MMM d"
//             : viewMode === "week"
//             ? "MMM d"
//             : "MMM yyyy"
//         ),
//       });

//       if (viewMode === "day") {
//         currentDate.setDate(currentDate.getDate() + 1);
//       } else if (viewMode === "week") {
//         currentDate.setDate(currentDate.getDate() + 7);
//       } else {
//         currentDate.setMonth(currentDate.getMonth() + 1);
//       }
//     }

//     return {
//       startDate: minDate,
//       endDate: maxDate,
//       dateLabels: labels,
//     };
//   }, [sortedData, dateField, viewMode]);

//   const getTimelineItemStyle = (item: TData) => {
//     const itemStartDate = new Date(item[dateField] as string | Date);
//     const itemEndDate = item.endDate
//       ? new Date(item.endDate)
//       : new Date(itemStartDate);

//     const timelineDuration = endDate.getTime() - startDate.getTime();
//     const startPosition = Math.max(
//       0,
//       ((itemStartDate.getTime() - startDate.getTime()) / timelineDuration) * 100
//     );
//     const endPosition = Math.min(
//       100,
//       ((itemEndDate.getTime() - startDate.getTime()) / timelineDuration) * 100
//     );
//     const width = endPosition - startPosition;

//     return {
//       left: `${startPosition}%`,
//       width: `${Math.max(width, 2)}%`,
//     };
//   };

//   const defaultRenderTimelineItem = (item: TData) => {
//     const title = (item[titleField] as string) || "Untitled";
//     const status = item[statusField] as string;
//     const category = item[categoryField] as string;
//     const itemStartDate = new Date(item[dateField] as string | Date);
//     const formattedDate = isValid(itemStartDate)
//       ? format(itemStartDate, "MMM d, yyyy")
//       : "Invalid date";

//     return (
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger asChild={true}>
//             <div
//               className={cn(
//                 "absolute h-8 rounded-md px-2 py-1 text-xs font-medium text-white flex items-center overflow-hidden",
//                 status === "completed" || status === "success"
//                   ? "bg-green-600"
//                   : status === "in-progress" || status === "processing"
//                   ? "bg-blue-600"
//                   : status === "pending"
//                   ? "bg-yellow-600"
//                   : status === "cancelled" || status === "failed"
//                   ? "bg-red-600"
//                   : "bg-slate-600"
//               )}
//               style={getTimelineItemStyle(item)}
//             >
//               <span className="truncate">{title}</span>
//             </div>
//           </TooltipTrigger>
//           <TooltipContent side="top" className="max-w-sm">
//             <div className="space-y-2">
//               <p className="font-medium">{title}</p>
//               <div className="flex items-center text-xs text-muted-foreground">
//                 <Calendar className="mr-1 h-3 w-3" />
//                 {formattedDate}
//               </div>
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
//               {category && (
//                 <div className="text-xs text-muted-foreground">
//                   Category: {category}
//                 </div>
//               )}
//             </div>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//     );
//   };

//   const table: MockTable = {
//     getState: () => ({ columnFilters: [], globalFilter }),
//     resetColumnFilters: () => {},
//   };

//   return (
//     <div className={cn("space-y-4", className)}>
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <DataTableToolbar
//           table={table}
//           filterMeta={filterMeta}
//           searchableColumns={searchableColumns}
//           globalFilter={globalFilter}
//           setGlobalFilter={setGlobalFilter}
//         />
//         <div className="flex items-center space-x-2">
//           <Button
//             variant={viewMode === "day" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setViewMode("day")}
//           >
//             Day
//           </Button>
//           <Button
//             variant={viewMode === "week" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setViewMode("week")}
//           >
//             Week
//           </Button>
//           <Button
//             variant={viewMode === "month" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setViewMode("month")}
//           >
//             Month
//           </Button>
//         </div>
//       </div>

//       <Card className={cn("overflow-hidden", timelineClassName)}>
//         <CardHeader className="pb-2">
//           <CardTitle className="text-lg flex items-center">
//             <Calendar className="mr-2 h-5 w-5" />
//             Timeline
//             <span className="ml-2 text-sm font-normal text-muted-foreground">
//               {format(startDate, "MMM d, yyyy")} -{" "}
//               {format(endDate, "MMM d, yyyy")}
//             </span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-0">
//           <ScrollArea className="h-[500px]">
//             {isLoading ? (
//               <div className="p-8 text-center">Loading timeline...</div>
//             ) : sortedData.length > 0 ? (
//               <div className="relative">
//                 <div className="sticky top-0 z-10 bg-background border-b flex h-10">
//                   {dateLabels.map((label, index) => (
//                     <div
//                       key={index}
//                       className="flex-1 text-xs text-center py-2 font-medium border-r last:border-r-0"
//                     >
//                       {label.label}
//                     </div>
//                   ))}
//                 </div>

//                 {categoryField ? (
//                   (() => {
//                     const categories = new Set<string>();
//                     sortedData.forEach((item) => {
//                       const category = item[categoryField] as string;
//                       if (category) categories.add(category);
//                     });

//                     return Array.from(categories).map((category) => (
//                       <div
//                         key={category}
//                         className="relative border-b last:border-b-0"
//                       >
//                         <div className="sticky left-0 bg-muted/30 px-4 py-2 font-medium text-sm border-r">
//                           {category}
//                         </div>
//                         <div className="relative h-12 ml-[100px]">
//                           {sortedData
//                             .filter((item) => item[categoryField] === category)
//                             .map((item) => (
//                               <div
//                                 key={String(item.id)}
//                                 className="absolute top-2"
//                               >
//                                 {renderTimelineItem
//                                   ? renderTimelineItem(item)
//                                   : defaultRenderTimelineItem(item)}
//                               </div>
//                             ))}
//                         </div>
//                       </div>
//                     ));
//                   })()
//                 ) : (
//                   <div className="relative h-[400px] pt-4">
//                     {sortedData.map((item, index) => (
//                       <div
//                         key={String(item.id)}
//                         className="absolute"
//                         style={{ top: `${index * 40 + 10}px` }}
//                       >
//                         {renderTimelineItem
//                           ? renderTimelineItem(item)
//                           : defaultRenderTimelineItem(item)}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="p-8 text-center text-muted-foreground">
//                 No timeline data available.
//               </div>
//             )}
//             <ScrollBar orientation="horizontal" />
//           </ScrollArea>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
