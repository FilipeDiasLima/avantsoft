"use client";

import { ClienteNormalizado } from "@/app/dashboard/clients/components/clients-content";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Mail, User } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cliente?: ClienteNormalizado;
  onSave: (
    cliente: Omit<ClienteNormalizado, "id" | "stats" | "primeiraLetraFaltante">
  ) => void;
}

const ClientModal = ({
  open,
  onOpenChange,
  cliente,
  onSave,
}: ClientModalProps) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!cliente;

  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome);
      setEmail(cliente.email);
      setNascimento(cliente.nascimento);
    } else {
      setNome("");
      setEmail("");
      setNascimento("");
    }
  }, [cliente, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSave({ nome, email, nascimento });
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNome("");
    setEmail("");
    setNascimento("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            {isEditing ? "Editar Cliente" : "Novo Cliente"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize as informações do cliente abaixo."
              : "Preencha os dados do novo cliente."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="nome"
                  type="text"
                  placeholder="Digite o nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="pl-10 rounded-2xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 rounded-2xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nascimento">Data de nascimento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="nascimento"
                  type="date"
                  value={nascimento}
                  onChange={(e) => setNascimento(e.target.value)}
                  className="pl-10 rounded-2xl"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 rounded-2xl"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 btn-hero rounded-2xl"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientModal;
