"use client";

import { ClientsDataTable } from "@/app/dashboard/clients/components/clients-data-table";
import { ClientsFilters } from "@/app/dashboard/clients/components/clients-filters";
import { ClientsHeader } from "@/app/dashboard/clients/components/clients-header";
import { ClientsModals } from "@/app/dashboard/clients/components/clients-modals";
import { getClientCookie } from "@/service/api";
import {
  createClient,
  CreateClientData,
} from "@/service/queries/create-client";
import { ClientStatsGeneral } from "@/service/queries/get-clients-general";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export interface ClienteNormalizado {
  id: string;
  nome: string;
  email: string;
  nascimento: string;
  stats: {
    total: number;
    count: number;
    avg: number;
    uniqueDays: number;
  };
  primeiraLetraFaltante: string;
}

type ClientsContentProps = {
  clientsData: ClientStatsGeneral[];
  onClientCreated: () => Promise<void>;
};

export function ClientsContent({
  clientsData,
  onClientCreated,
}: ClientsContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLetra, setFilterLetra] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<
    ClienteNormalizado | undefined
  >();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<
    ClienteNormalizado | undefined
  >();

  const firstLetterMissing = (nome: string): string => {
    const normalName = nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z]/g, "");

    const letrasPresentes = new Set(normalName);

    for (let i = 0; i < 26; i++) {
      const letra = String.fromCharCode(97 + i);
      if (!letrasPresentes.has(letra)) {
        return letra.toUpperCase();
      }
    }

    return "-";
  };

  const normalizedClientes = useMemo(() => {
    return clientsData.map(
      (clientStats): ClienteNormalizado => ({
        id: clientStats.client.id,
        nome: clientStats.client.name,
        email: clientStats.client.email,
        nascimento: clientStats.client.birthday,
        stats: {
          total: clientStats.total,
          count: 1,
          avg: clientStats.average,
          uniqueDays: clientStats.uniqueDays,
        },
        primeiraLetraFaltante: firstLetterMissing(clientStats.client.name),
      })
    );
  }, [clientsData]);

  const filteredClientes = useMemo(() => {
    return normalizedClientes.filter((cliente) => {
      const matchesSearch =
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterLetra === "all" || cliente.primeiraLetraFaltante === filterLetra;

      return matchesSearch && matchesFilter;
    });
  }, [normalizedClientes, searchTerm, filterLetra]);

  const handleCreateCliente = () => {
    setEditingCliente(undefined);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Delete cliente:", clienteToDelete?.id);
    setDeleteDialogOpen(false);
    setClienteToDelete(undefined);
  };

  const handleSaveCliente = async (
    clienteData: Omit<
      ClienteNormalizado,
      "id" | "stats" | "primeiraLetraFaltante"
    >
  ) => {
    try {
      if (!editingCliente) {
        const token = getClientCookie("@toystore.token");
        const createData: CreateClientData = {
          name: clienteData.nome,
          email: clienteData.email,
          birthday: clienteData.nascimento,
        };

        await createClient(createData, token);
        toast.success("Cliente criado com sucesso!");

        await onClientCreated();
      } else {
        toast.success("Cliente atualizado com sucesso!");
      }

      setModalOpen(false);
      setEditingCliente(undefined);
    } catch {
      toast.error("Erro ao salvar cliente. Tente novamente.");
    }
  };

  const uniqueLetras = Array.from(
    new Set(normalizedClientes.map((c) => c.primeiraLetraFaltante))
  ).sort();

  return (
    <div className="space-y-6 animate-slide-up">
      <ClientsHeader onCreateClient={handleCreateCliente} />

      <ClientsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterLetra={filterLetra}
        onFilterChange={setFilterLetra}
        uniqueLetras={uniqueLetras}
      />

      <ClientsDataTable
        clientes={filteredClientes}
        onEditCliente={(cliente) => {
          setEditingCliente(cliente);
          setModalOpen(true);
        }}
        onDeleteCliente={(cliente) => {
          setClienteToDelete(cliente);
          setDeleteDialogOpen(true);
        }}
      />

      <ClientsModals
        modalOpen={modalOpen}
        onModalOpenChange={setModalOpen}
        editingCliente={editingCliente}
        onSaveCliente={handleSaveCliente}
        deleteDialogOpen={deleteDialogOpen}
        onDeleteDialogOpenChange={setDeleteDialogOpen}
        clienteToDelete={clienteToDelete}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
