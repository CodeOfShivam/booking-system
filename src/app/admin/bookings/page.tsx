import PageHeader from "@/app/shared/page-header";
import { metaObject } from "@/config/site";
import CRMContactsPage from "@/app/admin/bookings/_components";

export const metadata = {
  ...metaObject("Ecommerce Bookings - Manage and view all ecommerce bookings."),
};

export default function CRMContactsView() {
  const pageHeader = {
    title: "Ecommerce Bookings -Manage and view all ecommerce bookings.",
    breadcrumb: [
      {
        name: "Dashboard",
        href: "/admin",
      },
      {
        name: "Ecommerce Bookings - Manage and view all ecommerce bookings.",
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CRMContactsPage />
    </>
  );
}
