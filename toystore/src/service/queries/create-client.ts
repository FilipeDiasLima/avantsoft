import { ClientProps } from "@/interface/client";
import { api } from "@/service/api";

export interface CreateClientData {
  name: string;
  email: string;
  birthday: string;
}

export async function createClient(
  clientData: CreateClientData,
  token?: string
): Promise<ClientProps> {
  const response = await api.post("/clients", clientData, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  console.log("Cliente criado:", response.data);
  return response.data;
}
