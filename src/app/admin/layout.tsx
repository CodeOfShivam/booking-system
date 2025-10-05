"use client";

import { Toaster } from "react-hot-toast";
import { useIsMounted } from "@/hooks/use-is-mounted";
import AdminLayout from "@/layouts/admin/layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }
  return (
    <AdminLayout>
      {children}
      <Toaster />
    </AdminLayout>
  );
}
