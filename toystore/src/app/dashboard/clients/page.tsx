"use client";

import { ClientsContent } from "@/app/dashboard/clients/components/clients-content";
import { getClientCookie } from "@/service/api";
import {
  ClientStatsGeneral,
  getClientsGeneral,
} from "@/service/queries/get-clients-general";
import { useEffect, useState } from "react";

export default function Clients() {
  const [clientsData, setClientsData] = useState<ClientStatsGeneral[]>([]);
  const [loading, setLoading] = useState(true);

  const loadClientsData = async () => {
    try {
      setLoading(true);
      const token = getClientCookie("@toystore.token");
      const data = await getClientsGeneral(token);
      setClientsData(data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClientsData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando clientes...</p>
        </div>
      </div>
    );
  }

  return (
    <ClientsContent
      clientsData={clientsData}
      onClientCreated={loadClientsData}
    />
  );
}
