import { api } from "@/service/api";

export async function getStats(token?: string): Promise<{
  clients: number;
  daysWithSales: number;
  salesPerDay: number;
  totalSalesValue: number;
}> {
  const response = await api.get("/sales/indicators", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  console.log("Indicadores:", response.data);
  return response.data;
}
