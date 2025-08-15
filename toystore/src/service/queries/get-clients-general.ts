import { ClientProps } from "@/interface/client";
import { api } from "@/service/api";

export interface ClientStatsGeneral {
  client: ClientProps;
  total: number;
  average: number;
  uniqueDays: number;
}

export async function getClientsGeneral(
  token?: string
): Promise<ClientStatsGeneral[]> {
  const response = await api.get("/sales/client-stats/general", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  console.log("Clientes gerais:", response.data);
  return response.data;
}
