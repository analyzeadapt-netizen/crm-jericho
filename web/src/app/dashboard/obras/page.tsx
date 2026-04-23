import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { ObraRowActions } from "./obra-row-actions";

export default async function ObrasPage() {
  const obras = await getObras();

  async function createObra(formData: FormData) {
    "use server";
    
    await addObra({
      cliente: formData.get("cliente") as string,
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
                  <Label htmlFor="cod">Cód. Obra *</Label>
                  <Input id="cod" name="cod" required className="bg-white/5 border-white/10 text-white" />
                </div>
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

      <div className="premium-card p-0 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10">
              <TableHead className="text-emerald-400">Cód.</TableHead>
              <TableHead className="text-emerald-400">Cliente</TableHead>
              <TableHead className="text-emerald-400">Tipo</TableHead>
              <TableHead className="text-emerald-400">Local</TableHead>
              <TableHead className="text-emerald-400">Duração</TableHead>
              <TableHead className="text-emerald-400">Valor</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {obras.length === 0 ? (
              <TableRow className="border-white/10">
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  Nenhuma obra registada. Adicione o seu primeiro projeto.
                </TableCell>
              </TableRow>
            ) : (
              obras.map((obra) => (
                <TableRow key={obra.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-medium">{obra.cod || "-"}</TableCell>
                  <TableCell>{obra.cliente}</TableCell>
                  <TableCell>{obra.tipo || "-"}</TableCell>
                  <TableCell>{obra.local || "-"}</TableCell>
                  <TableCell>
                    {obra.duracao || "-"} 
                    {obra.inicio && obra.fim && ` (${obra.inicio} a ${obra.fim})`}
                  </TableCell>
                  <TableCell>{obra.valor ? `€${obra.valor}` : "-"}</TableCell>
                  <TableCell>
                    <ObraRowActions obra={obra} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
