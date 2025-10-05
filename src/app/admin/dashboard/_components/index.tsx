import { StatsCards } from "@/app/admin/dashboard/_components/stats-cards";
import BrowserUsage from "@/app/admin/dashboard/_components/browser-usage";
import TotalRevenue from "@/app/admin/dashboard/_components/total-revenue";
import UpcomingSales from "@/app/admin/dashboard/_components/upcoming-sales";
import RevenueChannels from "@/app/admin/dashboard/_components/revenue-channels";
import CategoriesBySales from "@/app/admin/dashboard/_components/categories-by-sales";
import RecentTransactions from "@/app/admin/dashboard/_components/recent-transactions";
import AudienceLocations from "@/app/admin/dashboard/_components/audience-locations";
import RecentOrdersPage from "@/app/admin/dashboard/_components/recent-orders";

export default function DashboardPage() {
  return (
    <>
      {/* <div className="grid grid-cols-1"> 
        <div className="grid grid-cols-1 lg:grid-cols-6 2xl:grid-cols-6"> 
          <div className="col-span-1 lg:col-span-6 2xl:col-span-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 2xl:grid-cols-8">
              <div className="col-span-1 md:col-span-1 lg:col-span-8 2xl:col-span-8">
                <TotalRevenue />
              </div> 
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-4">
                <UpcomingSales />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-4">
                <RecentTransactions />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-8">
                <RecentOrdersPage />
              </div>
            </div>
          </div>  
        </div>
      </div> */}
    </>
  );
}
