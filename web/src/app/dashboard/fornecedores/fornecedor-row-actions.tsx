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
import { updateFornecedor, deleteFornecedor } from "@/actions/db-actions";

type Fornecedor = {
  id: string;
  nomeEmpresa: string;
  setor: string | null;
  descricaoProduto: string | null;
  quantidade: string | null;
  valorProduto: string | null;
  valorTotal: string | null;
  createdAt: Date | null;
};

export function FornecedorRowActions({ fornecedor }: { fornecedor: Fornecedor }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleEdit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await updateFornecedor(fornecedor.id, {
        nomeEmpresa: formData.get("nomeEmpresa") as string,
        setor: formData.get("setor") as string,
        descricaoProduto: formData.get("descricaoProduto") as string,
        quantidade: formData.get("quantidade") as string,
        valorProduto: formData.get("valorProduto") as string,
        valorTotal: formData.get("valorTotal") as string,
      });
      setIsEditDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    setIsSubmitting(true);
    try {
      await deleteFornecedor(fornecedor.id);
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
            <DialogTitle>Editar Fornecedor</DialogTitle>
          </DialogHeader>
          <form action={handleEdit} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nomeEmpresa">Nome da Empresa *</Label>
                <Input id="nomeEmpresa" name="nomeEmpresa" defaultValue={fornecedor.nomeEmpresa} required className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="setor">Setor</Label>
                <Input id="setor" name="setor" defaultValue={fornecedor.setor || ""} className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descricaoProduto">Descrição do Produto</Label>
              <Input id="descricaoProduto" name="descricaoProduto" defaultValue={fornecedor.descricaoProduto || ""} className="bg-white/5 border-white/10 text-white" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input id="quantidade" name="quantidade" defaultValue={fornecedor.quantidade || ""} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="valorProduto">Valor Unitário (€)</Label>
                <Input id="valorProduto" name="valorProduto" type="number" step="0.01" defaultValue={fornecedor.valorProduto || ""} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="valorTotal">Valor Total (€)</Label>
                <Input id="valorTotal" name="valorTotal" type="number" step="0.01" defaultValue={fornecedor.valorTotal || ""} className="bg-white/5 border-white/10 text-white" />
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
              Esta ação não pode ser desfeita. Isto irá eliminar permanentemente o fornecedor
              <strong className="text-white"> {fornecedor.nomeEmpresa}</strong> e remover os seus dados.
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
              {isSubmitting ? "A eliminar..." : "Eliminar Fornecedor"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
