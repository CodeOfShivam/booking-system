"use client"

import { useState, useEffect } from "react"
import type { Column } from "@tanstack/react-table"
import { SlidersHorizontal, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface DataTableNumberRangeFilterProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableNumberRangeFilter<TData, TValue>({
  column,
  title,
}: DataTableNumberRangeFilterProps<TData, TValue>) {
  const [min, setMin] = useState<string>("")
  const [max, setMax] = useState<string>("")

  // Sync with column filter value
  useEffect(() => {
    const filterValue = column.getFilterValue() as [number | undefined, number | undefined] | undefined

    if (!filterValue) {
      setMin("")
      setMax("")
      return
    }

    const [minVal, maxVal] = filterValue
    setMin(minVal !== undefined ? String(minVal) : "")
    setMax(maxVal !== undefined ? String(maxVal) : "")
  }, [column])

  // Update filter when number range changes
  const handleApply = () => {
    const minVal = min ? Number.parseFloat(min) : undefined
    const maxVal = max ? Number.parseFloat(max) : undefined

    if (minVal === undefined && maxVal === undefined) {
      column.setFilterValue(undefined)
    } else {
      column.setFilterValue([minVal, maxVal])
    }
  }

  const handleClear = () => {
    setMin("")
    setMax("")
    column.setFilterValue(undefined)
  }

  const hasValue = min || max

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {title}
          {hasValue && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                {min && max ? `${min} - ${max}` : min ? `≥ ${min}` : `≤ ${max}`}
              </Badge>
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
                className="ml-1 h-6 w-6 p-0 rounded-full"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Clear number range</span>
              </Button>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-3" align="start">
        <div className="space-y-3">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Number Range</h4>
            <p className="text-xs text-muted-foreground">Filter by number range</p>
          </div>
          <div className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="min" className="text-xs font-medium">
                Min
              </label>
              <Input
                id="min"
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="Minimum value"
                className="h-8"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="max" className="text-xs font-medium">
                Max
              </label>
              <Input
                id="max"
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="Maximum value"
                className="h-8"
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear
            </Button>
            <Button size="sm" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
