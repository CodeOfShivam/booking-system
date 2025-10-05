"use client";

import { type IconType } from "react-icons";
import { PiCaretRightBold } from "react-icons/pi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

type MenuItem = {
  title: string;
  url?: string;
  icon?: IconType;
  isActive?: boolean;
  items?: MenuItem[];
};

export function NavMain({
  items,
}: {
  items: {
    title: string;
    items: MenuItem[];
  }[];
}) {
  const pathname = usePathname();
  const activeItemRef = useRef<HTMLButtonElement>(null);

  const isActive = (url: string | undefined) => {
    if (!url) return false;
    // return pathname.startsWith(url);
    return pathname === url;
  };

  const isParentActive = (item: MenuItem) => {
    if (isActive(item.url)) return true;
    if (item.items) {
      return item.items.some((subItem) => isActive(subItem.url));
    }
    return false;
  };

  return (
    <>
      {items.map((section) => (
        <SidebarGroup key={section.title}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) =>
              item.items && item.items.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isParentActive(item)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={`group flex items-center pl-0 ${
                          isParentActive(item) ? "font-semibold" : ""
                        }`}
                        ref={isActive(item.url) ? activeItemRef : undefined}
                      >
                        <div
                          className={`h-5 w-1 rounded-tr-md rounded-br-md ${
                            isParentActive(item)
                              ? "bg-primary"
                              : "bg-transparent"
                          }`}
                        />
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                        <span>{item.title}</span>
                        <PiCaretRightBold className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="CollapsibleContent">
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={`group flex items-center  ${
                                isActive(subItem.url) ? " font-medium" : ""
                              }`}
                              ref={
                                isActive(subItem.url) &&
                                !subItem.url?.startsWith("#")
                                  ? (activeItemRef as React.Ref<HTMLAnchorElement>)
                                  : undefined
                              }
                            >
                              <Link
                                href={subItem.url || "#"}
                                className="flex items-center"
                              >
                                <div
                                  className={`h-1.5 w-1.5 rounded-sm transition-colors duration-200 ${
                                    isActive(subItem.url)
                                      ? "bg-primary"
                                      : "bg-transparent"
                                  }`}
                                />
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`group flex items-center ${
                      isActive(item.url) ? "font-semibold" : ""
                    }`}
                    ref={isActive(item.url) ? activeItemRef : undefined}
                  >
                    <Link
                      href={item.url || "#"}
                      className="flex items-center pl-0"
                    >
                      <div
                        className={`h-5 w-1 rounded-tr-md rounded-br-md ${
                          isActive(item.url) ? "bg-primary" : "bg-transparent"
                        }`}
                      />
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
