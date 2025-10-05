"use client";

import { siteConfig } from "@/config/site";
import Image from "next/image";
import {
  PiChartBarDuotone,
  PiShoppingCartDuotone,
  PiFolderDuotone,
  PiListDuotone,
  PiBriefcaseDuotone,
  PiImagesDuotone,
  PiAddressBookDuotone,
  PiCurrencyBtcDuotone,
} from "react-icons/pi";

import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { NavMain } from "@/layouts/admin/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SimpleBar from "@/components/ui/simplebar";

// This is sample data.
export const sidebarData = {
  navMain: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboards",
          icon: PiChartBarDuotone,
          url: "/admin/dashboard",
        },
      ],
    },
    {
      title: "Ecommerce",
      items: [
        {
          title: "Bookings",
          icon: PiShoppingCartDuotone,
          url: "/admin/bookings",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton
            size="lg"
            className="d-flex hover:bg-transparent focus:bg-transparent active:bg-transparent justify-between"
          >
            <Image
              src="/logo-dark.png"
              width={120}
              height={120}
              alt={siteConfig.title}
              className="select-none pointer-events-none"
              draggable={false}
            />
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SimpleBar className="h-[calc(100%-80px)]">
        <SidebarContent className="scrollbar-hover scrollbar-custom">
          <NavMain items={sidebarData.navMain} />
        </SidebarContent>
      </SimpleBar>
    </Sidebar>
  );
}
