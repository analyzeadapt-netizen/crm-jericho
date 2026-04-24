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
import { getOrcamentos, addOrcamento } from "@/actions/db-actions";
import { OrcamentoRowActions } from "./orcamento-row-actions";

export default async function OrcamentosPage() {
  const orcamentos = await getOrcamentos();

  async function createOrcamento(formData: FormData) {
    "use server";

    await addOrcamento({
      cod: formData.get("cod") as string,
      valorInicial: formData.get("valorInicial") as string,
      valorAtual: formData.get("valorAtual") as string,
      estado: formData.get("estado") as string,
      observacoes: formData.get("observacoes") as string,
    });
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-400">Orçamentos</h1>
          <p className="text-muted-foreground">Acompanhe e crie novos orçamentos para os clientes.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white">
              <Plus size={20} />
              Novo Orçamento
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f172a] text-white border-white/10 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Orçamento</DialogTitle>
            </DialogHeader>
            <form action={createOrcamento} className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="cod">Código (Automático)</Label>
                <Input id="cod" name="cod" placeholder="ORC-04-26-001" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="valorInicial">Valor Inicial (€)</Label>
                  <Input id="valorInicial" name="valorInicial" type="number" step="0.01" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="valorAtual">Valor Atual (€)</Label>
                  <Input id="valorAtual" name="valorAtual" type="number" step="0.01" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estado">Estado</Label>
                <select
                  id="estado"
                  name="estado"
                  defaultValue="Aberto"
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-white/5 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Aberto" className="bg-[#0f172a]">Aberto</option>
                  <option value="Andamento" className="bg-[#0f172a]">Em Andamento</option>
                  <option value="Fechado" className="bg-[#0f172a]">Fechado</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Input id="observacoes" name="observacoes" className="bg-white/5 border-white/10 text-white" />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 mt-4">
                Guardar Orçamento
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
              <TableHead className="text-emerald-400">Valor Inicial</TableHead>
              <TableHead className="text-emerald-400">Valor Atual</TableHead>
              <TableHead className="text-emerald-400">Estado</TableHead>
              <TableHead className="text-emerald-400">Observações</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orcamentos.length === 0 ? (
              <TableRow className="border-white/10">
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  Nenhum orçamento registado. Crie o seu primeiro orçamento.
                </TableCell>
              </TableRow>
            ) : (
              orcamentos.map((orcamento) => (
                <TableRow key={orcamento.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-medium">{orcamento.cod || "-"}</TableCell>
                  <TableCell>{orcamento.valorInicial ? `€${orcamento.valorInicial}` : "-"}</TableCell>
                  <TableCell>{orcamento.valorAtual ? `€${orcamento.valorAtual}` : "-"}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      orcamento.estado === "Fechado"
                        ? "bg-red-400/10 text-red-400"
                        : orcamento.estado === "Andamento"
                        ? "bg-yellow-400/10 text-yellow-400"
                        : "bg-emerald-400/10 text-emerald-400"
                    }`}>
                      {orcamento.estado || "Aberto"}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{orcamento.observacoes || "-"}</TableCell>
                  <TableCell>
                    <OrcamentoRowActions orcamento={orcamento} />
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
