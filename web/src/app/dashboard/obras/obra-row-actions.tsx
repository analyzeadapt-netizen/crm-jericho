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
import { updateObra, deleteObra } from "@/actions/db-actions";

type Obra = {
  id: string;
  cliente: string | null;
  cod: string | null;
  tipo: string | null;
  local: string | null;
  duracao: string | null;
  inicio: string | null;
  fim: string | null;
  valor: string | null;
  createdAt: Date | null;
};

export function ObraRowActions({ obra }: { obra: Obra }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleEdit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await updateObra(obra.id, {
        cliente: formData.get("cliente") as string,
        cod: formData.get("cod") as string,
        tipo: formData.get("tipo") as string,
        local: formData.get("local") as string,
        duracao: formData.get("duracao") as string,
        inicio: formData.get("inicio") as string,
        fim: formData.get("fim") as string,
        valor: formData.get("valor") as string,
      });
      setIsEditDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    setIsSubmitting(true);
    try {
      await deleteObra(obra.id);
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
        <DialogContent className="bg-[#0f172a] text-white border-white/10 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Obra</DialogTitle>
          </DialogHeader>
          <form action={handleEdit} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cliente">Cliente *</Label>
                <Input id="cliente" name="cliente" defaultValue={obra.cliente || ""} required className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cod">Cód. Obra *</Label>
                <Input id="cod" name="cod" defaultValue={obra.cod || ""} required className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo de Obra</Label>
                <Input id="tipo" name="tipo" defaultValue={obra.tipo || ""} placeholder="Ex: Construção, Remodelação" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="local">Local da Obra</Label>
                <Input id="local" name="local" defaultValue={obra.local || ""} className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="duracao">Duração</Label>
                <Input id="duracao" name="duracao" defaultValue={obra.duracao || ""} placeholder="Ex: 6 meses" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="inicio">Data Início</Label>
                <Input id="inicio" name="inicio" type="date" defaultValue={obra.inicio || ""} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fim">Data Fim</Label>
                <Input id="fim" name="fim" type="date" defaultValue={obra.fim || ""} className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="valor">Valor Total (€)</Label>
              <Input id="valor" name="valor" type="number" step="0.01" defaultValue={obra.valor || ""} className="bg-white/5 border-white/10 text-white" />
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
              Esta ação não pode ser desfeita. Isto irá eliminar permanentemente a obra 
              <strong className="text-white"> {obra.cod || "sem código"}</strong> e remover os dados da base de dados.
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
              {isSubmitting ? "A eliminar..." : "Eliminar Obra"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
