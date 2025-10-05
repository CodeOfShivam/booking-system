// "use client";

// import type React from "react";
// import { useState, useMemo, useEffect } from "react";
// import type { ColumnDef } from "@tanstack/react-table";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "@hello-pangea/dnd";
// import { cn } from "@/lib/utils";
// import { DataTableToolbar } from "../data-table-toolbar";
// import type { FilterMeta } from "../data-table";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// interface KanbanItem extends Record<string, unknown> {
//   id: string | number;
//   title?: string;
//   status: string;
//   order?: number;
//   actions?: React.ReactNode;
// }

// interface DataTableKanbanProps<TData extends KanbanItem, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   isLoading?: boolean;
//   filterMeta?: FilterMeta[];
//   searchableColumns?: string[];
//   statusField?: keyof TData;
//   statusOptions?: { value: string; label: string; color?: string }[];
//   onItemMove?: (
//     itemId: string | number,
//     sourceStatus: string,
//     destinationStatus: string,
//     newOrder: number
//   ) => void;
//   className?: string;
//   renderCard?: (item: TData) => React.ReactNode;
// }

// type MockTable = {
//   getState: () => { columnFilters: unknown[]; globalFilter: string };
//   resetColumnFilters: () => void;
// };

// export function DataTableKanban<TData extends KanbanItem, TValue>({
//   columns,
//   data,
//   isLoading = false,
//   filterMeta = [],
//   searchableColumns = [],
//   statusField = "status" as keyof TData,
//   statusOptions = [
//     { value: "todo", label: "To Do" },
//     { value: "in-progress", label: "In Progress" },
//     { value: "review", label: "Review" },
//     { value: "done", label: "Done" },
//   ],
//   onItemMove,
//   className,
//   renderCard,
// }: DataTableKanbanProps<TData, TValue>) {
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [items, setItems] = useState<TData[]>(data);

//   useEffect(() => {
//     setItems(data);
//   }, [data]);

//   const filteredItems = useMemo(() => {
//     if (!globalFilter) return items;
//     const lowercasedFilter = globalFilter.toLowerCase();

//     return items.filter((item) =>
//       searchableColumns.some((column) => {
//         const value = item[column as keyof TData];
//         return value && String(value).toLowerCase().includes(lowercasedFilter);
//       })
//     );
//   }, [items, globalFilter, searchableColumns]);

//   const groupedItems = useMemo(() => {
//     const groups: Record<string, TData[]> = {};
//     statusOptions.forEach((status) => {
//       groups[status.value] = [];
//     });

//     filteredItems.forEach((item) => {
//       const status = item[statusField] as string;
//       if (groups[status]) {
//         groups[status].push(item);
//       } else {
//         if (!groups["other"]) groups["other"] = [];
//         groups["other"].push(item);
//       }
//     });

//     Object.keys(groups).forEach((status) => {
//       groups[status].sort((a, b) =>
//         a.order !== undefined && b.order !== undefined ? a.order - b.order : 0
//       );
//     });

//     return groups;
//   }, [filteredItems, statusField, statusOptions]);

//   const handleDragEnd = (result: DropResult) => {
//     const { destination, source, draggableId } = result;

//     if (!destination) return;
//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     )
//       return;

//     setItems((prevItems) => {
//       const newItems = [...prevItems];
//       const movedItemIndex = newItems.findIndex(
//         (item) => String(item.id) === draggableId
//       );

//       if (movedItemIndex !== -1) {
//         const movedItem = { ...newItems[movedItemIndex] };
//         const destinationStatus = destination.droppableId;

//         movedItem[statusField] = destinationStatus as TData[keyof TData];
//         newItems.splice(movedItemIndex, 1);

//         // Find where to insert
//         const destinationIndexes = newItems.reduce<number[]>(
//           (acc, curr, idx) => {
//             if (curr[statusField] === destinationStatus) acc.push(idx);
//             return acc;
//           },
//           []
//         );
//         const insertIndex =
//           destinationIndexes.length > 0
//             ? destinationIndexes[0] + destination.index
//             : newItems.length;

//         newItems.splice(insertIndex, 0, movedItem);

//         if (movedItem.order !== undefined) {
//           const itemsToUpdate = newItems.filter(
//             (item) => item[statusField] === destinationStatus
//           );
//           itemsToUpdate.forEach((item, index) => {
//             item.order = index;
//           });
//         }

//         if (onItemMove) {
//           onItemMove(
//             movedItem.id,
//             source.droppableId,
//             destination.droppableId,
//             destination.index
//           );
//         }
//       }

//       return newItems;
//     });
//   };

//   const defaultRenderCard = (item: TData) => {
//     const title = item.title || `Item ${item.id}`;

//     return (
//       <Card className="mb-2">
//         <CardHeader className="p-3 pb-0">
//           <CardTitle className="text-sm font-medium">{title}</CardTitle>
//         </CardHeader>
//         <CardContent className="p-3 pt-2 space-y-2">
//           {columns
//             .filter(
//               (col) =>
//                 col.id !== "actions" &&
//                 col.id !== "select" &&
//                 col.accessorKey !== statusField &&
//                 col.accessorKey !== "title"
//             )
//             .slice(0, 3)
//             .map((column, colIndex) => {
//               const id = column.id || (column.accessorKey as string);
//               if (!id) return null;

//               const value = item[id as keyof TData];
//               if (value === undefined) return null;

//               let displayValue = value;
//               if (typeof value === "boolean")
//                 displayValue = value ? "Yes" : "No";

//               if (
//                 value instanceof Date ||
//                 (typeof value === "string" && !isNaN(Date.parse(value)))
//               ) {
//                 try {
//                   displayValue = new Date(value).toLocaleDateString();
//                 } catch {}
//               }

//               return (
//                 <div
//                   key={colIndex}
//                   className="flex items-center justify-between text-xs"
//                 >
//                   <span className="text-muted-foreground">{id}:</span>
//                   <span className="font-medium truncate max-w-[150px]">
//                     {String(displayValue)}
//                   </span>
//                 </div>
//               );
//             })}
//         </CardContent>
//         {item.actions && (
//           <CardFooter className="p-2 pt-0 flex justify-end">
//             {item.actions}
//           </CardFooter>
//         )}
//       </Card>
//     );
//   };

//   const table: MockTable = {
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

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {statusOptions.map((status) => (
//             <div key={status.value} className="flex flex-col">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-medium flex items-center">
//                   {status.label}
//                   <Badge variant="outline" className="ml-2">
//                     {groupedItems[status.value]?.length || 0}
//                   </Badge>
//                 </h3>
//                 <Badge className={cn(status.color && `bg-${status.color}-500`)}>
//                   {status.label}
//                 </Badge>
//               </div>

//               <Droppable droppableId={status.value}>
//                 {(provided, snapshot) => (
//                   <div
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                     className={cn(
//                       "flex-1 p-2 rounded-md min-h-[200px]",
//                       snapshot.isDraggingOver ? "bg-muted" : "bg-muted/50"
//                     )}
//                   >
//                     {isLoading ? (
//                       Array.from({ length: 3 }).map((_, index) => (
//                         <Card key={`skeleton-${index}`} className="mb-2">
//                           <CardHeader className="p-3 pb-0">
//                             <div className="h-4 w-2/3 animate-pulse rounded bg-muted"></div>
//                           </CardHeader>
//                           <CardContent className="p-3 pt-2 space-y-2">
//                             {Array.from({ length: 2 }).map((_, i) => (
//                               <div
//                                 key={i}
//                                 className="flex items-center justify-between"
//                               >
//                                 <div className="h-3 w-1/3 animate-pulse rounded bg-muted"></div>
//                                 <div className="h-3 w-1/3 animate-pulse rounded bg-muted"></div>
//                               </div>
//                             ))}
//                           </CardContent>
//                         </Card>
//                       ))
//                     ) : groupedItems[status.value]?.length > 0 ? (
//                       groupedItems[status.value].map((item, index) => (
//                         <Draggable
//                           key={String(item.id)}
//                           draggableId={String(item.id)}
//                           index={index}
//                         >
//                           {(provided, snapshot) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className={cn(
//                                 snapshot.isDragging && "opacity-70"
//                               )}
//                             >
//                               {renderCard
//                                 ? renderCard(item)
//                                 : defaultRenderCard(item)}
//                             </div>
//                           )}
//                         </Draggable>
//                       ))
//                     ) : (
//                       <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
//                         No items
//                       </div>
//                     )}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// }
