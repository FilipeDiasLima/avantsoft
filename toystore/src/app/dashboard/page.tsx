import { DashboardChart } from "@/app/dashboard/components/dashboard-chart";
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header";
import { DashboardHightlights } from "@/app/dashboard/components/dashboard-highlights";
import { DashboardStats } from "@/app/dashboard/components/dashboard-stats";
import { getHighlights } from "@/service/queries/get-highlights";
import {
  getStatistics,
  SalesStatistics,
} from "@/service/queries/get-statistics";
import { getStats } from "@/service/queries/get-stats";
import { cookies } from "next/headers";

const Dashboard = async () => {
  let stats = {
    clients: 0,
    daysWithSales: 0,
    salesPerDay: 0,
    totalSalesValue: 0,
  };

  let highlights = null;
  let statistics: SalesStatistics[] = [];
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("@toystore.token")?.value;
    stats = await getStats(token);
    highlights = await getHighlights(token);
    statistics = await getStatistics(15, token);
  } catch (error) {
    console.error(
      "Erro ao fazer prefetch dos indicadores, highlights ou statistics:",
      error
    );
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <DashboardHeader />

      <DashboardStats
        clients={stats.clients}
        daysWithSales={stats.daysWithSales}
        salesPerDay={stats.salesPerDay}
        totalSalesValue={stats.totalSalesValue}
      />

      <DashboardChart statistics={[...statistics].reverse()} />

      <DashboardHightlights highlights={highlights} />
    </div>
  );
};

export default Dashboard;
