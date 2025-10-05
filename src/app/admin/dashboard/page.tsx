import { metaObject } from "@/config/site";
import DashboardPage from "@/app/admin/dashboard/_components";

export const metadata = {
  ...metaObject("Dashboard"),
};

export default function DashboardView() {
  return <DashboardPage />;
}
