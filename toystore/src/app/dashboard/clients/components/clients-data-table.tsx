"use client";

import { ClienteNormalizado } from "@/app/dashboard/clients/components/clients-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/format-currency";
import { formatDateWithYear } from "@/utils/format-date";
import { Edit, SortAsc, SortDesc, Trash2, Users } from "lucide-react";
import { useMemo, useState } from "react";

type ClientsDataTableProps = {
  clientes: ClienteNormalizado[];
  onEditCliente: (cliente: ClienteNormalizado) => void;
  onDeleteCliente: (cliente: ClienteNormalizado) => void;
};

export function ClientsDataTable({
  clientes,
  onEditCliente,
  onDeleteCliente,
}: ClientsDataTableProps) {
  const [sortField, setSortField] = useState<
    "nome" | "total" | "avg" | "uniqueDays"
  >("nome");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedClientes = useMemo(() => {
    const sorted = [...clientes];

    sorted.sort((a, b) => {
      let aValue;
      let bValue;

      switch (sortField) {
        case "nome":
          aValue = a.nome.toLowerCase();
          bValue = b.nome.toLowerCase();
          break;
        case "total":
          aValue = a.stats.total;
          bValue = b.stats.total;
          break;
        case "avg":
          aValue = a.stats.avg;
          bValue = b.stats.avg;
          break;
        case "uniqueDays":
          aValue = a.stats.uniqueDays;
          bValue = b.stats.uniqueDays;
          break;
        default:
          return 0;
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return sorted;
  }, [clientes, sortField, sortDirection]);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: typeof sortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <SortAsc className="w-4 h-4" />
    ) : (
      <SortDesc className="w-4 h-4" />
    );
  };

  return (
    <Card className="card-glow rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Lista de Clientes</CardTitle>
            <CardDescription>
              {sortedClientes.length} cliente(s) encontrado(s)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {sortedClientes.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Nenhum cliente encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              Não há clientes que correspondam aos seus critérios de busca.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead
                    className="cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort("nome")}
                  >
                    <div className="flex items-center gap-2">
                      Nome {getSortIcon("nome")}
                    </div>
                  </TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Nascimento</TableHead>
                  <TableHead className="text-center">Vendas</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/70 transition-colors text-right"
                    onClick={() => handleSort("total")}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Total {getSortIcon("total")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/70 transition-colors text-right"
                    onClick={() => handleSort("avg")}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Média {getSortIcon("avg")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/70 transition-colors text-center"
                    onClick={() => handleSort("uniqueDays")}
                  >
                    <div className="flex items-center justify-center gap-2">
                      Frequência {getSortIcon("uniqueDays")}
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    1ª Letra Faltante
                  </TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedClientes.map((cliente) => (
                  <TableRow
                    key={cliente.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {cliente.nome}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {cliente.email}
                    </TableCell>
                    <TableCell>
                      {formatDateWithYear(cliente.nascimento)}
                    </TableCell>
                    <TableCell className="text-center">
                      {cliente.stats.count}
                    </TableCell>
                    <TableCell className="text-right font-medium text-success">
                      {formatCurrency(cliente.stats.total)}
                    </TableCell>
                    <TableCell className="text-right text-primary">
                      {formatCurrency(cliente.stats.avg)}
                    </TableCell>
                    <TableCell className="text-center text-secondary font-medium">
                      {cliente.stats.uniqueDays} dias
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          cliente.primeiraLetraFaltante === "-"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {cliente.primeiraLetraFaltante}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditCliente(cliente)}
                          className="rounded-xl"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeleteCliente(cliente)}
                          className="rounded-xl text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
