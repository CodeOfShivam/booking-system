"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { useDebounce } from "@/hooks/use-debounce";

export type FilterMeta = {
  id: string;
  type:
    | "text"
    | "select"
    | "multi-select"
    | "date-range"
    | "number-range"
    | "boolean"
    | "custom";
  label: string;
  placeholder?: string;
  options?: { label: string; value: string | number | boolean }[];
  icon?: React.ComponentType<{ className?: string }>;
  customComponent?: React.ComponentType<{
    column: string | null;
    table: string | null;
    filterKey: string;
    meta: FilterMeta;
  }>;
};

interface DataTableProps<TData, TValue> {
  tableHeader: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  pageCount?: number;
  manualPagination?: boolean;
  manualFiltering?: boolean;
  onPaginationChange?: (pageIndex: number, pageSize: number) => void;
  onFiltersChange?: (filters: ColumnFiltersState) => void;
  filterMeta?: FilterMeta[];
  initialFilters?: ColumnFiltersState;
  defaultPageSize?: number;
  defaultSorting?: SortingState;
  defaultVisibility?: VisibilityState;
  searchableColumns?: string[];
  refreshTrigger?: number;
  noResults?: React.ReactNode;
  noFilteredResults?: React.ReactNode;
  rowClassName?: (row: TData) => string;
  onRowClick?: (row: TData) => void;
  renderRowSubComponent?: (
    row: import("@tanstack/react-table").Row<TData>
  ) => React.ReactNode;
  enableRowSelection?: boolean;
  enableMultiSort?: boolean;
  enableColumnResizing?: boolean;
  stickyHeader?: boolean;
  className?: string;
}

export function DataTable<TData, TValue>({
  tableHeader,
  columns,
  data,
  isLoading = false,
  pageCount,
  manualPagination = false,
  manualFiltering = false,
  onPaginationChange,
  onFiltersChange,
  filterMeta = [],
  initialFilters = [],
  defaultPageSize = 15,
  defaultSorting = [],
  defaultVisibility = {},
  searchableColumns = [],
  refreshTrigger,
  noResults = "No results found.",
  noFilteredResults = "No results match your filters.",
  rowClassName,
  onRowClick,
  renderRowSubComponent,
  enableRowSelection = true,
  enableMultiSort = true,
  enableColumnResizing = false,
  stickyHeader = false,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialFilters);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(defaultVisibility);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  const debouncedGlobalFilter = useDebounce(globalFilter, 300);
  const debouncedColumnFilters = useDebounce(columnFilters, 300);

  // Custom filter functions
  const dateRangeFilterFn: FilterFn<unknown> = (row, columnId, filterValue) => {
    if (!filterValue || !filterValue.length) return true;
    const [start, end] = filterValue as [
      string | undefined,
      string | undefined
    ];
    if (!start && !end) return true;

    const value = row.getValue(columnId);
    if (
      !(
        typeof value === "string" ||
        typeof value === "number" ||
        value instanceof Date
      )
    )
      return false;
    const date = new Date(value);

    if (start && end) {
      return date >= new Date(start) && date <= new Date(end);
    } else if (start) {
      return date >= new Date(start);
    } else if (end) {
      return date <= new Date(end);
    }

    return true;
  };

  const numberRangeFilterFn: FilterFn<unknown> = (
    row,
    columnId,
    filterValue
  ) => {
    if (!filterValue || !filterValue.length) return true;
    const [min, max] = filterValue as [number | undefined, number | undefined];
    if (min === undefined && max === undefined) return true;

    const value = row.getValue(columnId);

    if (typeof value !== "number") return false;

    if (min !== undefined && max !== undefined) {
      return value >= min && value <= max;
    } else if (min !== undefined) {
      return value >= min;
    } else if (max !== undefined) {
      return value <= max;
    }

    return true;
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters: debouncedColumnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter: debouncedGlobalFilter,
    },
    filterFns: {
      dateRange: dateRangeFilterFn,
      numberRange: numberRangeFilterFn,
    },
    enableRowSelection,
    enableMultiSort,
    enableColumnResizing,
    manualPagination,
    manualFiltering,
    pageCount,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: manualFiltering ? undefined : getFilteredRowModel(),
    getPaginationRowModel: manualPagination
      ? undefined
      : getPaginationRowModel(),
  });

  // Handle manual pagination
  useEffect(() => {
    if (manualPagination && onPaginationChange) {
      onPaginationChange(pagination.pageIndex, pagination.pageSize);
    }
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    manualPagination,
    onPaginationChange,
  ]);

  // Handle manual filtering
  useEffect(() => {
    if (manualFiltering && onFiltersChange) {
      onFiltersChange(debouncedColumnFilters);
    }
  }, [debouncedColumnFilters, manualFiltering, onFiltersChange]);

  // Reset pagination when filters change
  useEffect(() => {
    if (!manualPagination) {
      table.resetPageIndex();
    }
  }, [debouncedColumnFilters, debouncedGlobalFilter, table]);

  // Reset to first page when data changes (e.g., from refreshTrigger)
  useEffect(() => {
    if (refreshTrigger !== undefined) {
      table.resetPageIndex();
    }
  }, [refreshTrigger, table]);

  // Determine if we have filtered results
  const hasFilteredData = table.getFilteredRowModel().rows.length > 0;
  const hasAppliedFilters =
    debouncedColumnFilters.length > 0 || debouncedGlobalFilter !== "";

  // Determine what to show when no results
  const renderEmptyState = () => {
    if (isLoading) return null;
    if (!hasFilteredData && hasAppliedFilters) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            {noFilteredResults}
          </TableCell>
        </TableRow>
      );
    }
    if (!hasFilteredData) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            {noResults}
          </TableCell>
        </TableRow>
      );
    }
    return null;
  };

  return (
    <div className={`space-y-4 ${className || ""}`}>
      <DataTableToolbar
        tableHeader={tableHeader}
        table={table}
        filterMeta={filterMeta}
        searchableColumns={searchableColumns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader
            className={
              stickyHeader
                ? "sticky top-0 bg-background z-10 dark:bg-neutral-900"
                : ""
            }
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={
                      header.column.getCanResize()
                        ? { position: "relative" }
                        : undefined
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none ${
                          header.column.getIsResizing()
                            ? "bg-primary"
                            : "bg-border"
                        }`}
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: pagination.pageSize }).map((_, index) => (
                  <TableRow key={`loading-${index}`}>
                    {Array.from({ length: columns.length }).map(
                      (_, cellIndex) => (
                        <TableCell
                          key={`loading-cell-${cellIndex}`}
                          className="h-16"
                        >
                          <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))
              : table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
                  <>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={
                        rowClassName ? rowClassName(row.original) : undefined
                      }
                      onClick={
                        onRowClick ? () => onRowClick(row.original) : undefined
                      }
                      style={onRowClick ? { cursor: "pointer" } : undefined}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {renderRowSubComponent && row.getIsExpanded() && (
                      <TableRow>
                        <TableCell colSpan={columns.length}>
                          {renderRowSubComponent(row)}
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              : renderEmptyState()}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
