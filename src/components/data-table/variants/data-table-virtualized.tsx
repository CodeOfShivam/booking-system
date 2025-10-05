// "use client";

// import { useState, useRef, useEffect } from "react";
// import type {
//   ColumnDef,
//   ColumnFiltersState,
//   Row,
//   Table as TanstackTable,
//   HeaderContext,
// } from "@tanstack/react-table";
// import { useVirtualizer } from "@tanstack/react-virtual";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { cn } from "@/lib/utils";
// import { DataTableToolbar } from "../data-table-toolbar";
// import { DataTablePagination } from "../data-table-pagination";
// import type { FilterMeta } from "../data-table";
// import { useDebounce } from "@/hooks/use-debounce";

// interface DataTableVirtualizedProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   isLoading?: boolean;
//   filterMeta?: FilterMeta[];
//   searchableColumns?: (keyof TData)[];
//   pageSize?: number;
//   estimateSize?: number;
//   className?: string;
// }

// export function DataTableVirtualized<TData extends object, TValue>({
//   columns,
//   data,
//   isLoading = false,
//   filterMeta = [],
//   searchableColumns = [],
//   pageSize = 50,
//   estimateSize = 35,
//   className,
// }: DataTableVirtualizedProps<TData, TValue>) {
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize,
//   });
//   const tableContainerRef = useRef<HTMLDivElement>(null);

//   const debouncedGlobalFilter = useDebounce(globalFilter, 300);
//   const debouncedColumnFilters = useDebounce(columnFilters, 300);

//   const filteredData = data.filter((item) => {
//     if (debouncedGlobalFilter) {
//       const lowercasedFilter = debouncedGlobalFilter.toLowerCase();
//       const matchesGlobalFilter = searchableColumns.some((column) => {
//         const value = item[column];
//         return value && String(value).toLowerCase().includes(lowercasedFilter);
//       });

//       if (!matchesGlobalFilter) return false;
//     }

//     for (const filter of debouncedColumnFilters) {
//       const { id, value } = filter;
//       const itemValue = (item as Record<keyof TData, unknown>)[
//         id as keyof TData
//       ];

//       if (Array.isArray(value)) {
//         if (!value.includes(itemValue)) return false;
//       } else if (typeof value === "string") {
//         if (!String(itemValue).toLowerCase().includes(value.toLowerCase()))
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

//   const rowVirtualizer = useVirtualizer({
//     count: paginatedData.length,
//     getScrollElement: () => tableContainerRef.current,
//     estimateSize: () => estimateSize,
//     overscan: 10,
//   });

//   useEffect(() => {
//     if (tableContainerRef.current) {
//       tableContainerRef.current.scrollTop = 0;
//     }
//   }, [pagination.pageIndex]);

//   const table = {
//     getState: () => ({
//       pagination,
//       columnFilters: debouncedColumnFilters,
//       globalFilter: debouncedGlobalFilter,
//     }),
//     setPageIndex: (pageIndex: number) =>
//       setPagination((prev) => ({ ...prev, pageIndex })),
//     setPageSize: (pageSize: number) =>
//       setPagination({ pageIndex: 0, pageSize }),
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
//     getColumn: (id: string) => ({
//       getFilterValue: () =>
//         debouncedColumnFilters.find((f) => f.id === id)?.value,
//       setFilterValue: (value: unknown) => {
//         setColumnFilters((prev) => {
//           const existingIndex = prev.findIndex((f) => f.id === id);
//           if (existingIndex >= 0) {
//             const newFilters = [...prev];
//             if (value === undefined) {
//               newFilters.splice(existingIndex, 1);
//             } else {
//               newFilters[existingIndex] = { id, value };
//             }
//             return newFilters;
//           }
//           return value !== undefined ? [...prev, { id, value }] : prev;
//         });
//       },
//     }),
//     getFilteredSelectedRowModel: () => ({ rows: { length: 0 } }),
//     getFilteredRowModel: () => ({ rows: { length: filteredData.length } }),
//   } as unknown as TanstackTable<TData>;

//   const virtualRows = rowVirtualizer.getVirtualItems();
//   const totalSize = rowVirtualizer.getTotalSize();
//   const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
//   const paddingBottom =
//     virtualRows.length > 0
//       ? totalSize - virtualRows[virtualRows.length - 1].end
//       : 0;

//   return (
//     <div className={cn("space-y-4", className)}>
//       <DataTableToolbar
//         table={table}
//         filterMeta={filterMeta}
//         searchableColumns={searchableColumns.map(String)}
//         globalFilter={globalFilter}
//         setGlobalFilter={setGlobalFilter}
//       />

//       <div className="rounded-md border">
//         <div
//           ref={tableContainerRef}
//           className="relative max-h-[600px] overflow-auto"
//         >
//           <Table>
//             <TableHeader className="sticky top-0 z-10 bg-background">
//               <TableRow>
//                 {columns.map((column, index) => (
//                   <TableHead key={index}>
//                     {typeof column.header === "function"
//                       ? column.header({ column, table } as HeaderContext<
//                           TData,
//                           TValue
//                         >)
//                       : column.header || (column.accessorKey as string)}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {isLoading ? (
//                 Array.from({ length: 10 }).map((_, index) => (
//                   <TableRow key={`skeleton-${index}`}>
//                     {columns.map((_, colIndex) => (
//                       <TableCell key={colIndex}>
//                         <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : paginatedData.length > 0 ? (
//                 <>
//                   {paddingTop > 0 && (
//                     <tr>
//                       <td
//                         style={{ height: `${paddingTop}px` }}
//                         colSpan={columns.length}
//                       />
//                     </tr>
//                   )}
//                   {virtualRows.map((virtualRow) => {
//                     const row = paginatedData[virtualRow.index];
//                     const fakeRow = { original: row } as Row<TData>;

//                     return (
//                       <TableRow
//                         key={virtualRow.index}
//                         data-index={virtualRow.index}
//                       >
//                         {columns.map((column, colIndex) => {
//                           const id =
//                             column.id || (column.accessorKey as string);
//                           const value =
//                             id && Object.prototype.hasOwnProperty.call(row, id)
//                               ? row[id as keyof TData]
//                               : undefined;

//                           return (
//                             <TableCell key={colIndex}>
//                               {column.cell
//                                 ? column.cell({
//                                     row: fakeRow,
//                                     getValue: () => value,
//                                   })
//                                 : value !== undefined
//                                 ? String(value)
//                                 : null}
//                             </TableCell>
//                           );
//                         })}
//                       </TableRow>
//                     );
//                   })}
//                   {paddingBottom > 0 && (
//                     <tr>
//                       <td
//                         style={{ height: `${paddingBottom}px` }}
//                         colSpan={columns.length}
//                       />
//                     </tr>
//                   )}
//                 </>
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="h-24 text-center"
//                   >
//                     No results found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//       <DataTablePagination table={table} />
//     </div>
//   );
// }
