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
import { getClientes, addCliente } from "@/actions/db-actions";

export default async function ClientesPage() {
  const clientes = await getClientes();

  async function createCliente(formData: FormData) {
    "use server";
    
    await addCliente({
      nome: formData.get("nome") as string,
      nif: formData.get("nif") as string,
      cod: formData.get("cod") as string,
      morada: formData.get("morada") as string,
      telefone: formData.get("telefone") as string,
      setor: formData.get("setor") as string,
    });
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-400">Clientes</h1>
          <p className="text-muted-foreground">Faça a gestão da sua carteira de clientes.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white">
              <Plus size={20} />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f172a] text-white border-white/10 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Cliente</DialogTitle>
            </DialogHeader>
            <form action={createCliente} className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input id="nome" name="nome" required className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nif">NIF</Label>
                  <Input id="nif" name="nif" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cod">Cód. Interno</Label>
                  <Input id="cod" name="cod" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="morada">Morada</Label>
                <Input id="morada" name="morada" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" name="telefone" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="setor">Setor</Label>
                  <Input id="setor" name="setor" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 mt-4">
                Guardar Cliente
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
              <TableHead className="text-emerald-400">Nome</TableHead>
              <TableHead className="text-emerald-400">NIF</TableHead>
              <TableHead className="text-emerald-400">Telefone</TableHead>
              <TableHead className="text-emerald-400">Setor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.length === 0 ? (
              <TableRow className="border-white/10">
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  Nenhum cliente encontrado. Adicione o seu primeiro cliente.
                </TableCell>
              </TableRow>
            ) : (
              clientes.map((cliente) => (
                <TableRow key={cliente.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-medium">{cliente.cod || "-"}</TableCell>
                  <TableCell>{cliente.nome}</TableCell>
                  <TableCell>{cliente.nif || "-"}</TableCell>
                  <TableCell>{cliente.telefone || "-"}</TableCell>
                  <TableCell>{cliente.setor || "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
