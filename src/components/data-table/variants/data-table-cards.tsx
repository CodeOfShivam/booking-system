// "use client";

// import React, { useState } from "react";
// import type {
//   ColumnDef,
//   ColumnFiltersState,
//   ColumnFilter,
//   PaginationState,
// } from "@tanstack/react-table";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { DataTableToolbar } from "../data-table-toolbar";
// import { DataTablePagination } from "../data-table-pagination";
// import type { FilterMeta } from "../data-table";
// import { useDebounce } from "@/hooks/use-debounce";

// // It's good practice to define a base type for your table rows
// type DataWithOptionalActions = {
//   actions?: React.ReactNode;
//   [key: string]: unknown;
// };

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface DataTableCardsProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   isLoading?: boolean;
//   filterMeta?: FilterMeta[];
//   searchableColumns?: (keyof TData)[];
//   pageSize?: number;
//   renderCard?: (item: TData, index: number) => React.ReactNode;
//   className?: string;
//   cardClassName?: string;
// }

// interface Table<> {
//   getState: () => {
//     pagination: PaginationState;
//     columnFilters: ColumnFiltersState;
//     globalFilter: string;
//   };
//   setPageIndex: (pageIndex: number) => void;
//   setPageSize: (pageSize: number) => void;
//   getPageCount: () => number;
//   getCanPreviousPage: () => boolean;
//   getCanNextPage: () => boolean;
//   previousPage: () => void;
//   nextPage: () => void;
//   resetColumnFilters: () => void;
//   getColumn: (id: string) =>
//     | {
//         getFilterValue: () => unknown;
//         setFilterValue: (value: unknown) => void;
//       }
//     | undefined;
//   getFilteredSelectedRowModel: () => { rows: { length: number } };
//   getFilteredRowModel: () => { rows: { length: number } };
// }

// export function DataTableCards<TData extends DataWithOptionalActions, TValue>({
//   columns,
//   data,
//   isLoading = false,
//   filterMeta = [],
//   searchableColumns = [],
//   pageSize = 12,
//   renderCard,
//   className,
//   cardClassName,
// }: DataTableCardsProps<TData, TValue>) {
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [pagination, setPagination] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize,
//   });

//   const debouncedGlobalFilter = useDebounce(globalFilter, 300);
//   const debouncedColumnFilters = useDebounce(columnFilters, 300);

//   const filteredData = data.filter((item) => {
//     if (debouncedGlobalFilter) {
//       const lowercasedFilter = debouncedGlobalFilter.toLowerCase();
//       const matchesGlobalFilter = searchableColumns.some((column) => {
//         const value = item[column];
//         return (
//           value != null &&
//           String(value).toLowerCase().includes(lowercasedFilter)
//         );
//       });

//       if (!matchesGlobalFilter) return false;
//     }

//     for (const filter of debouncedColumnFilters) {
//       const { id, value } = filter as ColumnFilter;
//       const key = id as keyof TData;
//       const itemValue = item[key];

//       if (Array.isArray(value)) {
//         if (!value.includes(itemValue)) return false;
//       } else if (typeof value === "string") {
//         if (
//           itemValue == null ||
//           !String(itemValue).toLowerCase().includes(value.toLowerCase())
//         )
//           return false;
//       } else if (value !== undefined && value !== null) {
//         if (itemValue !== value) return false;
//       }
//     }

//     return true;
//   });

//   const pageCount = Math.ceil(filteredData.length / pagination.pageSize);
//   const startIndex = pagination.pageIndex * pagination.pageSize;
//   const endIndex = Math.min(
//     startIndex + pagination.pageSize,
//     filteredData.length
//   );
//   const paginatedData = filteredData.slice(startIndex, endIndex);

//   const table: Table<TData> = {
//     getState: () => ({
//       pagination,
//       columnFilters: debouncedColumnFilters,
//       globalFilter: debouncedGlobalFilter,
//     }),
//     setPageIndex: (pageIndex) =>
//       setPagination((prev) => ({ ...prev, pageIndex })),
//     setPageSize: (pageSize) => setPagination({ pageIndex: 0, pageSize }),
//     getPageCount: () => pageCount,
//     getCanPreviousPage: () => pagination.pageIndex > 0,
//     getCanNextPage: () => pagination.pageIndex < pageCount - 1,
//     previousPage: () =>
//       setPagination((prev) => ({
//         ...prev,
//         pageIndex: Math.max(0, prev.pageIndex - 1),
//       })),
//     nextPage: () =>
//       setPagination((prev) => ({
//         ...prev,
//         pageIndex: Math.min(pageCount - 1, prev.pageIndex + 1),
//       })),
//     resetColumnFilters: () => setColumnFilters([]),
//     getColumn: (id: string) => {
//       const filter = debouncedColumnFilters.find((f) => f.id === id);

//       return {
//         getFilterValue: () => filter?.value,
//         setFilterValue: (value: unknown) => {
//           setColumnFilters((prev) => {
//             const existingIndex = prev.findIndex((f) => f.id === id);
//             if (existingIndex >= 0) {
//               const newFilters = [...prev];
//               if (value === undefined || value === null || value === "") {
//                 newFilters.splice(existingIndex, 1);
//               } else {
//                 newFilters[existingIndex] = { id, value };
//               }
//               return newFilters;
//             }
//             return value !== undefined && value !== null && value !== ""
//               ? [...prev, { id, value }]
//               : prev;
//           });
//         },
//       };
//     },
//     getFilteredSelectedRowModel: () => ({ rows: { length: 0 } }),
//     getFilteredRowModel: () => ({ rows: { length: filteredData.length } }),
//   };

//   const defaultRenderCard = (item: TData, index: number) => {
//     const nameKey = "name" as keyof TData;
//     const titleKey = "title" as keyof TData;

//     const displayTitle =
//       (item[nameKey] as string | undefined) ||
//       (item[titleKey] as string | undefined) ||
//       `Item ${index + 1}`;

//     return (
//       <Card key={index} className={cn("h-full", cardClassName)}>
//         <CardHeader>
//           <CardTitle className="line-clamp-1 text-lg">{displayTitle}</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {columns
//             .filter((col) => col.id !== "actions" && col.id !== "select")
//             .slice(0, 5)
//             .map((column, colIndex) => {
//               const id =
//                 column.id || (column.accessorKey as string | undefined);
//               if (!id) return null;

//               const key = id as keyof TData;
//               const value = item[key];
//               if (value === undefined || value === null) return null;

//               let displayValue: React.ReactNode = String(value);

//               if (
//                 typeof value === "string" &&
//                 (id === "status" || id.includes("status"))
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
//                   displayValue = String(value);
//                 }
//               }

//               return (
//                 <div
//                   key={colIndex}
//                   className="flex items-center justify-between"
//                 >
//                   <span className="text-sm text-muted-foreground">{id}:</span>
//                   <span className="font-medium truncate max-w-[150px]">
//                     {displayValue}
//                   </span>
//                 </div>
//               );
//             })}
//         </CardContent>
//         {"actions" in item && item.actions && (
//           <CardFooter className="flex justify-end">{item.actions}</CardFooter>
//         )}
//       </Card>
//     );
//   };

//   return (
//     <div className={cn("space-y-4", className)}>
//       <DataTableToolbar
//         table={table}
//         filterMeta={filterMeta}
//         searchableColumns={searchableColumns.map(String)}
//         globalFilter={globalFilter}
//         setGlobalFilter={setGlobalFilter}
//       />

//       {isLoading ? (
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {Array.from({ length: pagination.pageSize }).map((_, index) => (
//             <Card
//               key={`skeleton-${index}`}
//               className={cn("h-full", cardClassName)}
//             >
//               <CardHeader>
//                 <div className="h-6 w-2/3 animate-pulse rounded bg-muted"></div>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 {Array.from({ length: 4 }).map((_, i) => (
//                   <div key={i} className="flex items-center justify-between">
//                     <div className="h-4 w-1/3 animate-pulse rounded bg-muted"></div>
//                     <div className="h-4 w-1/3 animate-pulse rounded bg-muted"></div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       ) : paginatedData.length > 0 ? (
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {paginatedData.map((item, index) =>
//             renderCard
//               ? renderCard(item, index)
//               : defaultRenderCard(item, index)
//           )}
//         </div>
//       ) : (
//         <div className="flex w-full items-center justify-center rounded-md border border-dashed p-8 text-center">
//           <div className="space-y-2">
//             <p className="text-lg font-medium">No results found</p>
//             <p className="text-sm text-muted-foreground">
//               Try adjusting your search or filters to find what you&apos;re
//               looking for.
//             </p>
//             {(debouncedGlobalFilter || debouncedColumnFilters.length > 0) && (
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   setGlobalFilter("");
//                   setColumnFilters([]);
//                 }}
//               >
//                 Reset filters
//               </Button>
//             )}
//           </div>
//         </div>
//       )}

//       <DataTablePagination table={table} />
//     </div>
//   );
// }
