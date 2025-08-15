"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

type ClientsFiltersProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterLetra: string;
  onFilterChange: (value: string) => void;
  uniqueLetras: string[];
};

export function ClientsFilters({
  searchTerm,
  onSearchChange,
  filterLetra,
  onFilterChange,
  uniqueLetras,
}: ClientsFiltersProps) {
  return (
    <Card className="card-glow rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtros e Busca
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 rounded-2xl"
              />
            </div>
          </div>

          <Select value={filterLetra} onValueChange={onFilterChange}>
            <SelectTrigger className="w-48 rounded-2xl">
              <SelectValue placeholder="Filtrar por letra" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as letras</SelectItem>
              <SelectItem value="complete">Alfabeto completo (-)</SelectItem>
              {uniqueLetras
                .filter((l) => l !== "-")
                .map((letra) => (
                  <SelectItem key={letra} value={letra}>
                    Primeira faltante: {letra}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
