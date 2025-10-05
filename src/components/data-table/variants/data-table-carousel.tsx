// "use client";

// import type React from "react";
// import { useState, useRef, useEffect } from "react";
// import type { ColumnDef } from "@tanstack/react-table";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import { DataTableToolbar } from "../data-table-toolbar";
// import type { FilterMeta } from "../data-table";

// interface DataTableCarouselProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   isLoading?: boolean;
//   filterMeta?: FilterMeta[];
//   searchableColumns?: (keyof TData)[];
//   title?: string;
//   itemsPerView?: number;
//   renderItem?: (item: TData, index: number) => React.ReactNode;
//   className?: string;
//   cardClassName?: string;
// }

// export function DataTableCarousel<TData, TValue>({
//   columns,
//   data,
//   isLoading = false,
//   filterMeta = [],
//   searchableColumns = [],
//   title,
//   itemsPerView = 3,
//   renderItem,
//   className,
//   cardClassName,
// }: DataTableCarouselProps<TData, TValue>) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [visibleItems, setVisibleItems] = useState<TData[]>([]);
//   const [filteredData, setFilteredData] = useState<TData[]>(data);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     setFilteredData(data);
//   }, [data]);

//   useEffect(() => {
//     const actualItemsPerView = isMobile ? 1 : itemsPerView;
//     const endIndex = Math.min(
//       currentIndex + actualItemsPerView,
//       filteredData.length
//     );
//     setVisibleItems(filteredData.slice(currentIndex, endIndex));
//   }, [currentIndex, filteredData, itemsPerView, isMobile]);

//   const handleNext = () => {
//     const actualItemsPerView = isMobile ? 1 : itemsPerView;
//     const nextIndex = Math.min(
//       currentIndex + actualItemsPerView,
//       filteredData.length - actualItemsPerView
//     );
//     setCurrentIndex(nextIndex);
//   };

//   const handlePrevious = () => {
//     const actualItemsPerView = isMobile ? 1 : itemsPerView;
//     const prevIndex = Math.max(currentIndex - actualItemsPerView, 0);
//     setCurrentIndex(prevIndex);
//   };

//   const handleFiltersChange = () => {
//     let result = [...data];

//     if (globalFilter && searchableColumns.length > 0) {
//       const lowercasedFilter = globalFilter.toLowerCase();
//       result = result.filter((item) => {
//         return searchableColumns.some((columnKey) => {
//           const value = item[columnKey];
//           return (
//             value && String(value).toLowerCase().includes(lowercasedFilter)
//           );
//         });
//       });
//     }

//     setCurrentIndex(0);
//     setFilteredData(result);
//   };

//   const defaultRenderItem = (item: TData, index: number) => {
//     return (
//       <Card key={index} className={cn("min-w-[300px] h-full", cardClassName)}>
//         <CardHeader>
//           <CardTitle className="text-lg">
//             {(item as Record<string, unknown>).name ||
//               (item as Record<string, unknown>).title ||
//               `Item ${index + 1}`}
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {columns
//             .filter((col) => col.id !== "actions" && col.id !== "select")
//             .map((column, colIndex) => {
//               const id =
//                 column.id || (column.accessorKey as keyof TData | undefined);
//               if (!id) return null;

//               const value = item[id];
//               if (value === undefined) return null;

//               let displayValue = value;

//               if (
//                 id === "status" ||
//                 (typeof id === "string" && id.includes("status"))
//               ) {
//                 return (
//                   <div
//                     key={colIndex}
//                     className="flex items-center justify-between"
//                   >
//                     <span className="text-sm text-muted-foreground">{id}:</span>
//                     <Badge
//                       variant={
//                         value === "success" ||
//                         value === "active" ||
//                         value === "completed"
//                           ? "success"
//                           : value === "pending" || value === "processing"
//                           ? "secondary"
//                           : value === "failed" || value === "error"
//                           ? "destructive"
//                           : "outline"
//                       }
//                     >
//                       {String(value)}
//                     </Badge>
//                   </div>
//                 );
//               }

//               if (typeof value === "boolean") {
//                 displayValue = value ? "Yes" : "No";
//               }

//               if (
//                 value instanceof Date ||
//                 (typeof value === "string" && !isNaN(Date.parse(value)))
//               ) {
//                 try {
//                   displayValue = new Date(value).toLocaleDateString();
//                 } catch {
//                   // keep as is
//                 }
//               }

//               return (
//                 <div
//                   key={colIndex}
//                   className="flex items-center justify-between"
//                 >
//                   <span className="text-sm text-muted-foreground">
//                     {String(id)}:
//                   </span>
//                   <span className="font-medium">{String(displayValue)}</span>
//                 </div>
//               );
//             })}
//         </CardContent>

//         {"actions" in item && (
//           <CardFooter className="flex justify-end">
//             {(item as Record<string, React.ReactNode>).actions}
//           </CardFooter>
//         )}
//       </Card>
//     );
//   };

//   const actualItemsPerView = isMobile ? 1 : itemsPerView;
//   const hasNext = currentIndex < filteredData.length - actualItemsPerView;
//   const hasPrevious = currentIndex > 0;

//   return (
//     <div className={cn("space-y-4", className)}>
//       <DataTableToolbar
//         table={{
//           getState: () => ({ columnFilters: [] }),
//           resetColumnFilters: () => {},
//         }}
//         filterMeta={filterMeta}
//         searchableColumns={searchableColumns as string[]}
//         globalFilter={globalFilter}
//         setGlobalFilter={(value: string) => {
//           setGlobalFilter(value);
//           handleFiltersChange();
//         }}
//       />

//       {title && <h3 className="text-lg font-medium">{title}</h3>}

//       <div className="relative">
//         <div ref={containerRef} className="flex gap-4 overflow-hidden py-4">
//           {isLoading ? (
//             Array.from({ length: actualItemsPerView }).map((_, index) => (
//               <Card
//                 key={`skeleton-${index}`}
//                 className={cn("min-w-[300px] h-full", cardClassName)}
//               >
//                 <CardHeader>
//                   <div className="h-6 w-2/3 animate-pulse rounded bg-muted"></div>
//                 </CardHeader>
//                 <CardContent className="space-y-2">
//                   {Array.from({ length: 4 }).map((_, i) => (
//                     <div key={i} className="flex items-center justify-between">
//                       <div className="h-4 w-1/3 animate-pulse rounded bg-muted"></div>
//                       <div className="h-4 w-1/3 animate-pulse rounded bg-muted"></div>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             ))
//           ) : visibleItems.length > 0 ? (
//             visibleItems.map((item, index) =>
//               renderItem
//                 ? renderItem(item, index)
//                 : defaultRenderItem(item, index)
//             )
//           ) : (
//             <div className="flex w-full items-center justify-center p-8 text-center">
//               <p className="text-muted-foreground">No items found.</p>
//             </div>
//           )}
//         </div>

//         {hasPrevious && (
//           <Button
//             variant="outline"
//             size="icon"
//             className="absolute left-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-md"
//             onClick={handlePrevious}
//           >
//             <ChevronLeft className="h-4 w-4" />
//             <span className="sr-only">Previous</span>
//           </Button>
//         )}

//         {hasNext && (
//           <Button
//             variant="outline"
//             size="icon"
//             className="absolute right-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-md"
//             onClick={handleNext}
//           >
//             <ChevronRight className="h-4 w-4" />
//             <span className="sr-only">Next</span>
//           </Button>
//         )}
//       </div>

//       <div className="flex justify-center gap-1 pt-2">
//         {Array.from({
//           length: Math.ceil(filteredData.length / actualItemsPerView),
//         }).map((_, index) => {
//           const isActive = index * actualItemsPerView === currentIndex;
//           return (
//             <Button
//               key={index}
//               variant="ghost"
//               size="icon"
//               className={cn(
//                 "h-2 w-2 rounded-full p-0",
//                 isActive ? "bg-primary" : "bg-muted"
//               )}
//               onClick={() => setCurrentIndex(index * actualItemsPerView)}
//             >
//               <span className="sr-only">Page {index + 1}</span>
//             </Button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
