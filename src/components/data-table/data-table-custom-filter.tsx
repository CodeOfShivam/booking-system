"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Column } from "@tanstack/react-table"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface DataTableCustomFilterProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
  renderFilterContent: (column: Column<TData, TValue>, onApply: () => void, onClear: () => void) => React.ReactNode
}

export function DataTableCustomFilter<TData, TValue>({
  column,
  title,
  renderFilterContent,
}: DataTableCustomFilterProps<TData, TValue>) {
  const [hasFilter, setHasFilter] = useState(false)

  // Check if filter is applied
  useEffect(() => {
    setHasFilter(column.getFilterValue() !== undefined)
  }, [column])

  const handleClear = () => {
    column.setFilterValue(undefined)
  }

  const handleApply = () => {
    // This is just a hook for the custom filter to call when it's done
    // The actual filter value should be set by the custom filter component
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <Filter className="mr-2 h-4 w-4" />
          {title}
          {hasFilter && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                Active
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-3" align="start">
        {renderFilterContent(column, handleApply, handleClear)}
      </PopoverContent>
    </Popover>
  )
}
