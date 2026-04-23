"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCliente, deleteCliente } from "@/actions/db-actions";

type Cliente = {
  id: string;
  nome: string;
  cod: string | null;
  nif: string | null;
  morada: string | null;
  telefone: string | null;
  setor: string | null;
  createdAt: Date | null;
};

export function ClienteRowActions({ cliente }: { cliente: Cliente }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleEdit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await updateCliente(cliente.id, {
        nome: formData.get("nome") as string,
        nif: formData.get("nif") as string,
        cod: formData.get("cod") as string,
        morada: formData.get("morada") as string,
        telefone: formData.get("telefone") as string,
        setor: formData.get("setor") as string,
      });
      setIsEditDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    setIsSubmitting(true);
    try {
      await deleteCliente(cliente.id);
      setIsDeleteDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-white">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#0f172a] border-white/10 text-white">
          <DropdownMenuItem 
            onClick={() => setIsEditDialogOpen(true)}
            className="focus:bg-white/10 focus:text-white cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-red-400 focus:bg-red-400/10 focus:text-red-400 cursor-pointer"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#0f172a] text-white border-white/10 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>
          <form action={handleEdit} className="space-y-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input id="nome" name="nome" defaultValue={cliente.nome} required className="bg-white/5 border-white/10 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nif">NIF</Label>
                <Input id="nif" name="nif" defaultValue={cliente.nif || ""} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cod">Cód. Interno</Label>
                <Input id="cod" name="cod" defaultValue={cliente.cod || ""} className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="morada">Morada</Label>
              <Input id="morada" name="morada" defaultValue={cliente.morada || ""} className="bg-white/5 border-white/10 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" name="telefone" defaultValue={cliente.telefone || ""} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="setor">Setor</Label>
                <Input id="setor" name="setor" defaultValue={cliente.setor || ""} className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-500 mt-4">
              {isSubmitting ? "A guardar..." : "Guardar Alterações"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#0f172a] text-white border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Esta ação não pode ser desfeita. Isto irá eliminar permanentemente o cliente
              <strong className="text-white"> {cliente.nome}</strong> e remover os seus dados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isSubmitting ? "A eliminar..." : "Eliminar Cliente"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
