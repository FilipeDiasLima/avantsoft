import { ClientProps } from "@/interface/client";
import { api } from "@/service/api";

interface Response {
  highestVolume: {
    clientId: string;
    total: number;
    client: ClientProps;
  };
  highestAverage: {
    clientId: string;
    average: number;
    client: ClientProps;
  };
  mostUniqueDays: {
    clientId: string;
    days: number;
    client: ClientProps;
  };
}

export async function getHighlights(token?: string): Promise<Response> {
  const response = await api.get("/sales/client-stats", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
}
