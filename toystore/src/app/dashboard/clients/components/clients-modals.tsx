"use client";

import ClientModal from "@/app/dashboard/clients/components/client-modal";
import { ClienteNormalizado } from "@/app/dashboard/clients/components/clients-content";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type ClientsModalsProps = {
  modalOpen: boolean;
  onModalOpenChange: (open: boolean) => void;
  editingCliente: ClienteNormalizado | undefined;
  onSaveCliente: (
    clienteData: Omit<
      ClienteNormalizado,
      "id" | "stats" | "primeiraLetraFaltante"
    >
  ) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  clienteToDelete: ClienteNormalizado | undefined;
  onConfirmDelete: () => void;
};

export function ClientsModals({
  modalOpen,
  onModalOpenChange,
  editingCliente,
  onSaveCliente,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  clienteToDelete,
  onConfirmDelete,
}: ClientsModalsProps) {
  const handleConfirmDelete = () => {
    onConfirmDelete();
    toast.success("Cliente removido!");
  };

  return (
    <>
      <ClientModal
        open={modalOpen}
        onOpenChange={onModalOpenChange}
        cliente={editingCliente}
        onSave={onSaveCliente}
      />

      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o cliente{" "}
              <strong>{clienteToDelete?.nome}</strong>? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="rounded-2xl bg-destructive hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
