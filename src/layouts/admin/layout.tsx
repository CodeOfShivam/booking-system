import { AppSidebar } from "@/layouts/admin/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="@container/main flex flex-1 flex-col bg-background dark:bg-neutral-800 dark:shadow-none overflow-hidden p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
