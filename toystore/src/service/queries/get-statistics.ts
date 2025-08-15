import { api } from "@/service/api";

export interface SalesStatistics {
  date: string;
  total: number;
}

export async function getStatistics(
  days: number,
  token?: string
): Promise<SalesStatistics[]> {
  const response = await api.get(`/sales/statistics?days=${days}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
}
