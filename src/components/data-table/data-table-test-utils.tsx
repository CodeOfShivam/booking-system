"use client";

import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "./data-table";
import type { ColumnDef } from "@tanstack/react-table";

interface TestDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterMeta?: number | string[];
  searchableColumns?: string[];
}

export function renderDataTable<TData, TValue>({
  columns,
  data,
  searchableColumns = [],
}: TestDataTableProps<TData, TValue>) {
  return render(
    <DataTable
      tableHeader="Test Data Table"
      columns={columns}
      data={data}
      searchableColumns={searchableColumns}
    />
  );
}

export async function testPagination() {
  // Test next page
  const nextButton = screen.getByRole("button", { name: /go to next page/i });
  await userEvent.click(nextButton);

  // Test previous page
  const prevButton = screen.getByRole("button", {
    name: /go to previous page/i,
  });
  await userEvent.click(prevButton);

  // Test page size
  const pageSizeSelect = screen.getByRole("combobox", {
    name: /rows per page/i,
  });
  await userEvent.click(pageSizeSelect);
  const option = screen.getByRole("option", { name: "20" });
  await userEvent.click(option);

  // Test direct page input
  const pageInput = screen.getByRole("spinbutton");
  await userEvent.clear(pageInput);
  await userEvent.type(pageInput, "2");
  await userEvent.tab(); // Trigger blur event
}

export async function testColumnVisibility() {
  // Open view options
  const viewButton = screen.getByRole("button", { name: /view/i });
  await userEvent.click(viewButton);

  // Toggle a column
  const columnCheckbox = screen.getByRole("menuitemcheckbox", {
    name: /name/i,
  });
  await userEvent.click(columnCheckbox);

  // Toggle it back
  await userEvent.click(columnCheckbox);
}

export async function testSorting() {
  // Find a sortable column header
  const headers = screen.getAllByRole("columnheader");
  const sortableHeader = Array.from(headers).find((header) =>
    within(header).queryByRole("button")
  );

  if (sortableHeader) {
    const button = within(sortableHeader).getByRole("button");

    // Sort ascending
    await userEvent.click(button);

    // Sort descending
    await userEvent.click(button);

    // Reset sorting
    await userEvent.click(button);
  }
}

export async function testFiltering(
  filterableColumnId: string,
  filterValue: string
) {
  // Find filter input
  const filterInput = screen.getByPlaceholderText(
    new RegExp(`filter.*${filterableColumnId}`, "i")
  );

  // Apply filter
  await userEvent.type(filterInput, filterValue);

  // Wait for filtering to complete
  await waitFor(() => {
    // Check that filtering has been applied
    // This will depend on your implementation
  });

  // Clear filter
  await userEvent.clear(filterInput);
}

export async function testRowSelection() {
  // Find checkboxes
  const checkboxes = screen.getAllByRole("checkbox");

  if (checkboxes.length > 1) {
    // Select a row
    await userEvent.click(checkboxes[1]); // First row checkbox

    // Select all rows
    await userEvent.click(checkboxes[0]); // Header checkbox

    // Deselect all rows
    await userEvent.click(checkboxes[0]);
  }
}

export async function testSearch(searchTerm: string) {
  // Find search input
  const searchInput = screen.getByPlaceholderText(/search/i);

  // Enter search term
  await userEvent.type(searchInput, searchTerm);

  // Wait for search to complete
  await waitFor(() => {
    // Check that search has been applied
    // This will depend on your implementation
  });

  // Clear search
  await userEvent.clear(searchInput);
}
