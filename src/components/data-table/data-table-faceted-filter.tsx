"use client"

import type React from "react"

import { useCallback, useEffect, useState } from "react"
import type { Column } from "@tanstack/react-table"
import { Check, PlusCircle, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string | number | boolean
    icon?: React.ComponentType<{ className?: string }>
    description?: string
  }[]
  icon?: React.ComponentType<{ className?: string }>
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  icon: Icon,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const [selectedValues, setSelectedValues] = useState<Set<string | number | boolean>>(new Set())
  const [searchTerm, setSearchTerm] = useState("")

  // Sync with column filter value
  useEffect(() => {
    const filterValue = column?.getFilterValue() as (string | number | boolean)[] | undefined

    if (!filterValue) {
      setSelectedValues(new Set())
      return
    }

    setSelectedValues(new Set(filterValue))
  }, [column])

  // Update filter when selection changes
  const handleSelect = useCallback(
    (value: string | number | boolean) => {
      const newSelectedValues = new Set(selectedValues)

      if (newSelectedValues.has(value)) {
        newSelectedValues.delete(value)
      } else {
        newSelectedValues.add(value)
      }

      setSelectedValues(newSelectedValues)

      const filterValues = Array.from(newSelectedValues)
      column?.setFilterValue(filterValues.length ? filterValues : undefined)
    },
    [column, selectedValues],
  )

  const handleClear = useCallback(() => {
    setSelectedValues(new Set())
    column?.setFilterValue(undefined)
  }, [column])

  // Filter options based on search term
  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          {Icon && <Icon className="mr-2 h-4 w-4" />}
          {!Icon && <PlusCircle className="mr-2 h-4 w-4" />}
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                {selectedValues.size}
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
                <span className="sr-only">Clear filter</span>
              </Button>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${title}...`} value={searchTerm} onValueChange={setSearchTerm} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem key={String(option.value)} onSelect={() => handleSelect(option.value)}>
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{option.label}</span>
                    {option.description && (
                      <span className="ml-2 text-xs text-muted-foreground">{option.description}</span>
                    )}
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={handleClear} className="justify-center text-center">
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
