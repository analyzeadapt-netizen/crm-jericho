import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ObrasClient } from "./obras-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getObras, addObra } from "@/actions/db-actions";

export default async function ObrasPage() {
  const obras = await getObras();

  async function createObra(formData: FormData) {
    "use server";
    
    await addObra({
      cliente: formData.get("cliente") as string,
      clienteNif: formData.get("clienteNif") as string,
      cod: formData.get("cod") as string,
      tipo: formData.get("tipo") as string,
      local: formData.get("local") as string,
      duracao: formData.get("duracao") as string,
      inicio: formData.get("inicio") as string,
      fim: formData.get("fim") as string,
      valor: formData.get("valor") as string,
    });
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-400">Obras</h1>
          <p className="text-muted-foreground">Faça a gestão dos seus projetos e obras em curso.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white">
              <Plus size={20} />
              Nova Obra
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f172a] text-white border-white/10 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Obra</DialogTitle>
            </DialogHeader>
            <form action={createObra} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cliente">Cliente *</Label>
                  <Input id="cliente" name="cliente" required className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clienteNif">NIF do Cliente</Label>
                  <Input id="clienteNif" name="clienteNif" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cod">Cód. Obra (Automático)</Label>
                <Input id="cod" name="cod" placeholder="OBR-04-26-001" className="bg-white/5 border-white/10 text-white" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tipo">Tipo de Obra</Label>
                  <Input id="tipo" name="tipo" placeholder="Ex: Construção, Remodelação" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="local">Local da Obra</Label>
                  <Input id="local" name="local" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duracao">Duração</Label>
                  <Input id="duracao" name="duracao" placeholder="Ex: 6 meses" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="inicio">Data Início</Label>
                  <Input id="inicio" name="inicio" type="date" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fim">Data Fim</Label>
                  <Input id="fim" name="fim" type="date" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="valor">Valor Total (€)</Label>
                <Input id="valor" name="valor" type="number" step="0.01" className="bg-white/5 border-white/10 text-white" />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 mt-4">
                Guardar Obra
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <ObrasClient initialObras={obras} />
    </div>
  );
}
