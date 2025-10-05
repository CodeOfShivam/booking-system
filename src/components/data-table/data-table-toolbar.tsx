"use client";

import type { Table } from "@tanstack/react-table";
import { X, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableDateRangeFilter } from "./data-table-date-range-filter";
import { DataTableNumberRangeFilter } from "./data-table-number-range-filter";
import type { FilterMeta } from "./data-table";

interface DataTableToolbarProps<TData> {
  tableHeader: string;
  table: Table<TData>;
  filterMeta?: FilterMeta[];
  searchableColumns?: string[];
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function DataTableToolbar<TData>({
  tableHeader,
  table,
  filterMeta = [],
  searchableColumns = [],
  globalFilter,
  setGlobalFilter,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 || globalFilter !== "";

  // Render the appropriate filter component based on filter type
  const renderFilterComponent = (meta: FilterMeta) => {
    const column = table.getColumn(meta.id);
    if (!column) return null;

    switch (meta.type) {
      case "text":
        return (
          <div key={meta.id} className="flex items-center">
            <Input
              placeholder={meta.placeholder || `Filter ${meta.label}...`}
              value={(column.getFilterValue() as string) ?? ""}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className="h-8 w-[150px] lg:w-[200px]"
            />
          </div>
        );
      case "select":
      case "multi-select":
        return (
          <DataTableFacetedFilter
            key={meta.id}
            column={column}
            title={meta.label}
            options={meta.options || []}
            icon={meta.icon}
          />
        );
      case "date-range":
        return (
          <DataTableDateRangeFilter
            key={meta.id}
            column={column}
            title={meta.label}
          />
        );
      case "number-range":
        return (
          <DataTableNumberRangeFilter
            key={meta.id}
            column={column}
            title={meta.label}
          />
        );
      case "boolean":
        return (
          <DataTableFacetedFilter
            key={meta.id}
            column={column}
            title={meta.label}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
            icon={meta.icon}
          />
        );
      case "custom":
        // if (meta.customComponent) {
        //   const CustomComponent = meta.customComponent
        //   return <CustomComponent key={meta.id} column={column} table={table} filterKey={meta.id} meta={meta} />
        // }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: Table Header */}
      <h2 className="text-lg font-semibold">{tableHeader}</h2>

      {/* Right: Controls */}
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        {searchableColumns.length > 0 && (
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-9 w-full pl-8 sm:w-[250px] md:w-[300px]"
            />
            {globalFilter && (
              <Button
                variant="ghost"
                onClick={() => setGlobalFilter("")}
                className="absolute right-1 top-1.5 h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
        )}

        {/* Filters */}
        {filterMeta.map(renderFilterComponent)}

        {/* Reset Button */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setGlobalFilter("");
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}

        {/* View Options */}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
