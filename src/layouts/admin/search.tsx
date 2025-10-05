"use client";

import * as React from "react";
import { Search, FileText } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { sidebarData } from "./app-sidebar";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Handle Ctrl+K or Cmd+K to open dialog
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isShortcut =
        (isMac && e.metaKey && e.key.toLowerCase() === "k") ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === "k");

      if (isShortcut) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Detect Mac or Windows
  const isMac =
    typeof window !== "undefined" &&
    navigator.platform.toUpperCase().includes("MAC");

  return (
    <>
      <div className="relative w-full max-w-[550px]">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search or jump to..."
          className="h-9 w-full pl-8 sm:w-[250px] md:w-[300px]"
          onClick={() => setOpen(true)}
          readOnly
        />
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 select-none text-xs text-muted-foreground hidden sm:block">
          <kbd>{isMac ? "⌘" : "Ctrl"}</kbd>
          <kbd>K</kbd>
        </span>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {sidebarData.navMain.map((section, sectionIndex) => (
            <React.Fragment key={section.title}>
              <CommandGroup heading={section.title}>
                {section.items.map((item) => {
                  if (item.items) {
                    return item.items.map((subItem) => (
                      <Link
                        href={subItem.url ?? "#"}
                        key={subItem.title}
                        passHref
                      >
                        <CommandItem
                          onSelect={() => setOpen(false)}
                          className="flex items-center justify-between gap-2 px-4 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{subItem.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                            {subItem.url}
                          </span>
                        </CommandItem>
                      </Link>
                    ));
                  }

                  return (
                    <Link href={item.url ?? "#"} key={item.title} passHref>
                      <CommandItem
                        onSelect={() => setOpen(false)}
                        className="flex items-center justify-between gap-2 px-4 py-2"
                      >
                        <div className="flex items-center gap-2">
                          {item.icon && (
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-sm">{item.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                          {item.url}
                        </span>
                      </CommandItem>
                    </Link>
                  );
                })}
              </CommandGroup>

              {sectionIndex < sidebarData.navMain.length - 1 && (
                <CommandSeparator />
              )}
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
