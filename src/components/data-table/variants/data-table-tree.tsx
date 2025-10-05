// "use client";

// import { useState, useCallback } from "react";
// import type { ColumnDef, Row as TableRowType } from "@tanstack/react-table";
// import { ChevronRight, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
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
// import type { FilterMeta } from "../data-table";

// interface TreeNode {
//   id: string | number;
//   children?: TreeNode[];
//   parentId?: string | number | null;
//   level?: number;
//   isExpanded?: boolean;
//   [key: string]: unknown;
// }

// interface DataTableTreeProps<TData extends TreeNode, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   isLoading?: boolean;
//   filterMeta?: FilterMeta[];
//   searchableColumns?: (keyof TData)[];
//   getRowId?: (row: TData) => string;
//   getParentId?: (row: TData) => string | number | null | undefined;
//   className?: string;
//   expandedByDefault?: boolean;
// }

// export function DataTableTree<TData extends TreeNode, TValue>({
//   columns,
//   data,
//   isLoading = false,
//   filterMeta = [],
//   searchableColumns = [],
//   getRowId = (row) => String(row.id),
//   getParentId = (row) => row.parentId,
//   className,
//   expandedByDefault = false,
// }: DataTableTreeProps<TData, TValue>) {
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

//   const buildTree = useCallback(
//     (
//       items: TData[],
//       parentId: string | number | null = null,
//       level = 0
//     ): TData[] => {
//       return items
//         .filter((item) => getParentId(item) === parentId)
//         .map((item) => {
//           const id = getRowId(item);
//           const isExpanded = expandedRows[id] ?? expandedByDefault;
//           const children = buildTree(items, item.id, level + 1);

//           return {
//             ...item,
//             level,
//             isExpanded,
//             children: children.length > 0 ? children : undefined,
//           };
//         });
//     },
//     [expandedRows, expandedByDefault, getRowId, getParentId]
//   );

//   const flattenTree = useCallback((tree: TData[]): TData[] => {
//     return tree.reduce<TData[]>((acc, node) => {
//       acc.push(node);
//       if (node.isExpanded && node.children?.length) {
//         acc.push(...flattenTree(node.children));
//       }
//       return acc;
//     }, []);
//   }, []);

//   const filterTree = useCallback(
//     (items: TData[]): TData[] => {
//       if (!globalFilter) return items;
//       const lowercasedFilter = globalFilter.toLowerCase();

//       const nodeMatches = (node: TData): boolean => {
//         const matches = searchableColumns.some((column) => {
//           const value = node[column];
//           return (
//             value && String(value).toLowerCase().includes(lowercasedFilter)
//           );
//         });

//         if (matches) return true;

//         return node.children?.some(nodeMatches) ?? false;
//       };

//       return items.filter(nodeMatches);
//     },
//     [globalFilter, searchableColumns]
//   );

//   const treeData = buildTree(data);
//   const filteredTreeData = filterTree(treeData);
//   const displayData = flattenTree(filteredTreeData);

//   const toggleRowExpanded = (id: string) => {
//     setExpandedRows((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const table = {
//     getState: () => ({ columnFilters: [], globalFilter }),
//     resetColumnFilters: () => {},
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

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[40px]" />
//               {columns.map((column, index) => (
//                 <TableHead key={index}>
//                   {typeof column.header === "function"
//                     ? column.header({
//                         column,
//                         table: {} as never, // Replace with real table if needed
//                       })
//                     : column.header || (column.accessorKey as string)}
//                 </TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {isLoading ? (
//               Array.from({ length: 5 }).map((_, index) => (
//                 <TableRow key={`skeleton-${index}`}>
//                   <TableCell className="w-[40px]">
//                     <div className="h-4 w-4 animate-pulse rounded bg-muted" />
//                   </TableCell>
//                   {columns.map((_, colIndex) => (
//                     <TableCell key={colIndex}>
//                       <div className="h-4 w-full animate-pulse rounded bg-muted" />
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : displayData.length > 0 ? (
//               displayData.map((row) => {
//                 const rowId = getRowId(row);
//                 const hasChildren = Boolean(row.children?.length);
//                 const level = row.level || 0;

//                 return (
//                   <TableRow
//                     key={rowId}
//                     className={cn(level > 0 && "bg-muted/30")}
//                   >
//                     <TableCell className="w-[40px] p-2">
//                       <div
//                         style={{ paddingLeft: `${level * 12}px` }}
//                         className="flex items-center"
//                       >
//                         {hasChildren ? (
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => toggleRowExpanded(rowId)}
//                           >
//                             {row.isExpanded ? (
//                               <ChevronDown className="h-4 w-4" />
//                             ) : (
//                               <ChevronRight className="h-4 w-4" />
//                             )}
//                           </Button>
//                         ) : (
//                           <div className="h-6 w-6" />
//                         )}
//                       </div>
//                     </TableCell>
//                     {columns.map((column, colIndex) => {
//                       const id = column.id || (column.accessorKey as string);
//                       const value =
//                         id && Object.prototype.hasOwnProperty.call(row, id)
//                           ? row[id]
//                           : undefined;

//                       return (
//                         <TableCell key={colIndex}>
//                           {column.cell
//                             ? column.cell({
//                                 row: { original: row } as TableRowType<TData>,
//                                 getValue: () => value,
//                               })
//                             : value !== undefined
//                             ? String(value)
//                             : null}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length + 1}
//                   className="h-24 text-center"
//                 >
//                   No results found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-end space-x-2">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => {
//             const expanded: Record<string, boolean> = {};
//             const expandAll = (items: TData[]) => {
//               items.forEach((item) => {
//                 const id = getRowId(item);
//                 expanded[id] = true;
//                 if (item.children?.length) {
//                   expandAll(item.children);
//                 }
//               });
//             };
//             expandAll(treeData);
//             setExpandedRows(expanded);
//           }}
//         >
//           Expand all
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => {
//             setExpandedRows({});
//           }}
//         >
//           Collapse all
//         </Button>
//       </div>
//     </div>
//   );
// }
