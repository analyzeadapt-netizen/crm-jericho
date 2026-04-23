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
import { updateOrcamento, deleteOrcamento } from "@/actions/db-actions";

type Orcamento = {
  id: string;
  cod: string | null;
  valorInicial: string | null;
  valorAtual: string | null;
  estado: string | null;
  observacoes: string | null;
  createdAt: Date | null;
};

export function OrcamentoRowActions({ orcamento }: { orcamento: Orcamento }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleEdit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await updateOrcamento(orcamento.id, {
        cod: formData.get("cod") as string,
        valorInicial: formData.get("valorInicial") as string,
        valorAtual: formData.get("valorAtual") as string,
        estado: formData.get("estado") as string,
        observacoes: formData.get("observacoes") as string,
      });
      setIsEditDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    setIsSubmitting(true);
    try {
      await deleteOrcamento(orcamento.id);
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
            <DialogTitle>Editar Orçamento</DialogTitle>
          </DialogHeader>
          <form action={handleEdit} className="space-y-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="cod">Código *</Label>
              <Input id="cod" name="cod" defaultValue={orcamento.cod || ""} required className="bg-white/5 border-white/10 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="valorInicial">Valor Inicial (€)</Label>
                <Input id="valorInicial" name="valorInicial" type="number" step="0.01" defaultValue={orcamento.valorInicial || ""} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="valorAtual">Valor Atual (€)</Label>
                <Input id="valorAtual" name="valorAtual" type="number" step="0.01" defaultValue={orcamento.valorAtual || ""} className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="estado">Estado</Label>
              <select
                id="estado"
                name="estado"
                defaultValue={orcamento.estado || "Aberto"}
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-white/5 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Aberto" className="bg-[#0f172a]">Aberto</option>
                <option value="Andamento" className="bg-[#0f172a]">Em Andamento</option>
                <option value="Fechado" className="bg-[#0f172a]">Fechado</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Input id="observacoes" name="observacoes" defaultValue={orcamento.observacoes || ""} className="bg-white/5 border-white/10 text-white" />
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
              Esta ação não pode ser desfeita. Isto irá eliminar permanentemente o orçamento
              <strong className="text-white"> {orcamento.cod || "sem código"}</strong> e remover os seus dados.
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
              {isSubmitting ? "A eliminar..." : "Eliminar Orçamento"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
