"use client";

import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";

type ClientsHeaderProps = {
  onCreateClient: () => void;
};

export function ClientsHeader({ onCreateClient }: ClientsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gradient flex items-center gap-2">
          <Users className="w-8 h-8" />
          Clientes
        </h1>
        <p className="text-muted-foreground">
          Gerencie seus clientes e acompanhe suas vendas
        </p>
      </div>

      <Button onClick={onCreateClient} className="btn-hero rounded-2xl gap-2">
        <Plus className="w-4 h-4" />
        Novo Cliente
      </Button>
    </div>
  );
}
