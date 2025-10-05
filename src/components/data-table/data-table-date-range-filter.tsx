"use client"

import { useState, useEffect } from "react"
import type { Column } from "@tanstack/react-table"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface DataTableDateRangeFilterProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableDateRangeFilter<TData, TValue>({
  column,
  title,
}: DataTableDateRangeFilterProps<TData, TValue>) {
  const [value, setValue] = useState<[Date | undefined, Date | undefined]>([undefined, undefined])

  // Sync with column filter value
  useEffect(() => {
    const filterValue = column.getFilterValue() as [string, string] | undefined

    if (!filterValue) {
      setValue([undefined, undefined])
      return
    }

    const [start, end] = filterValue
    setValue([start ? new Date(start) : undefined, end ? new Date(end) : undefined])
  }, [column])

  // Update filter when date range changes
  const handleDateRangeChange = (newValue: [Date | undefined, Date | undefined]) => {
    setValue(newValue)

    const [start, end] = newValue
    column.setFilterValue([start ? start.toISOString() : undefined, end ? end.toISOString() : undefined])
  }

  const handleClear = () => {
    setValue([undefined, undefined])
    column.setFilterValue(undefined)
  }

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "LLL dd, y") : ""
  }

  const hasValue = value[0] || value[1]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {title}
          {hasValue && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                {value[0] && value[1]
                  ? `${formatDate(value[0])} - ${formatDate(value[1])}`
                  : value[0]
                    ? `From ${formatDate(value[0])}`
                    : `Until ${formatDate(value[1])}`}
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
                <span className="sr-only">Clear date range</span>
              </Button>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-3">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Date Range</h4>
            <p className="text-xs text-muted-foreground">Filter items by date range</p>
          </div>
          <div className="flex gap-2">
            <div>
              <div className="text-xs font-medium mb-1">Start Date</div>
              <Calendar
                mode="single"
                selected={value[0]}
                onSelect={(date) => handleDateRangeChange([date, value[1]])}
                initialFocus
              />
            </div>
            <div>
              <div className="text-xs font-medium mb-1">End Date</div>
              <Calendar
                mode="single"
                selected={value[1]}
                onSelect={(date) => handleDateRangeChange([value[0], date])}
                initialFocus
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear
            </Button>
            <Button size="sm" onClick={() => document.body.click()}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
