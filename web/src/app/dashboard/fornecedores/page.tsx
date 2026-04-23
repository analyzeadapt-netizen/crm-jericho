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
import { getFornecedores, addFornecedor } from "@/actions/db-actions";
import { FornecedorRowActions } from "./fornecedor-row-actions";

export default async function FornecedoresPage() {
  const fornecedores = await getFornecedores();

  async function createFornecedor(formData: FormData) {
    "use server";

    await addFornecedor({
      nomeEmpresa: formData.get("nomeEmpresa") as string,
      setor: formData.get("setor") as string,
      descricaoProduto: formData.get("descricaoProduto") as string,
      quantidade: formData.get("quantidade") as string,
      valorProduto: formData.get("valorProduto") as string,
      valorTotal: formData.get("valorTotal") as string,
    });
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-400">Fornecedores</h1>
          <p className="text-muted-foreground">Lista de fornecedores e produtos.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white">
              <Plus size={20} />
              Novo Fornecedor
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f172a] text-white border-white/10 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Fornecedor</DialogTitle>
            </DialogHeader>
            <form action={createFornecedor} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nomeEmpresa">Nome da Empresa *</Label>
                  <Input id="nomeEmpresa" name="nomeEmpresa" required className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="setor">Setor</Label>
                  <Input id="setor" name="setor" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descricaoProduto">Descrição do Produto</Label>
                <Input id="descricaoProduto" name="descricaoProduto" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input id="quantidade" name="quantidade" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="valorProduto">Valor Unitário (€)</Label>
                  <Input id="valorProduto" name="valorProduto" type="number" step="0.01" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="valorTotal">Valor Total (€)</Label>
                  <Input id="valorTotal" name="valorTotal" type="number" step="0.01" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 mt-4">
                Guardar Fornecedor
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="premium-card p-0 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10">
              <TableHead className="text-emerald-400">Empresa</TableHead>
              <TableHead className="text-emerald-400">Setor</TableHead>
              <TableHead className="text-emerald-400">Produto</TableHead>
              <TableHead className="text-emerald-400">Qtd.</TableHead>
              <TableHead className="text-emerald-400">Val. Unit.</TableHead>
              <TableHead className="text-emerald-400">Val. Total</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fornecedores.length === 0 ? (
              <TableRow className="border-white/10">
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  Nenhum fornecedor registado. Adicione o seu primeiro fornecedor.
                </TableCell>
              </TableRow>
            ) : (
              fornecedores.map((fornecedor) => (
                <TableRow key={fornecedor.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-medium">{fornecedor.nomeEmpresa}</TableCell>
                  <TableCell>{fornecedor.setor || "-"}</TableCell>
                  <TableCell>{fornecedor.descricaoProduto || "-"}</TableCell>
                  <TableCell>{fornecedor.quantidade || "-"}</TableCell>
                  <TableCell>{fornecedor.valorProduto ? `€${fornecedor.valorProduto}` : "-"}</TableCell>
                  <TableCell>{fornecedor.valorTotal ? `€${fornecedor.valorTotal}` : "-"}</TableCell>
                  <TableCell>
                    <FornecedorRowActions fornecedor={fornecedor} />
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
