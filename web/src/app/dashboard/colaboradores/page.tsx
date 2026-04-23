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
import { getColaboradores, addColaborador } from "@/actions/db-actions";
import { ColaboradorRowActions } from "./colaborador-row-actions";

export default async function ColaboradoresPage() {
  const colaboradores = await getColaboradores();

  async function createColaborador(formData: FormData) {
    "use server";

    await addColaborador({
      nome: formData.get("nome") as string,
      nif: formData.get("nif") as string,
      telemovel: formData.get("telemovel") as string,
      funcao: formData.get("funcao") as string,
      endereco: formData.get("endereco") as string,
    });
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-400">Colaboradores</h1>
          <p className="text-muted-foreground">Gira a sua equipa e os seus acessos.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white">
              <Plus size={20} />
              Novo Colaborador
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f172a] text-white border-white/10 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Colaborador</DialogTitle>
            </DialogHeader>
            <form action={createColaborador} className="space-y-4 pt-4">
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
                  <Label htmlFor="telemovel">Telemóvel</Label>
                  <Input id="telemovel" name="telemovel" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="funcao">Função</Label>
                <Input id="funcao" name="funcao" placeholder="Ex: Pedreiro, Eletricista" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input id="endereco" name="endereco" className="bg-white/5 border-white/10 text-white" />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 mt-4">
                Guardar Colaborador
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="premium-card p-0 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10">
              <TableHead className="text-emerald-400">Nome</TableHead>
              <TableHead className="text-emerald-400">NIF</TableHead>
              <TableHead className="text-emerald-400">Telemóvel</TableHead>
              <TableHead className="text-emerald-400">Função</TableHead>
              <TableHead className="text-emerald-400">Endereço</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colaboradores.length === 0 ? (
              <TableRow className="border-white/10">
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  Nenhum colaborador registado. Adicione o seu primeiro colaborador.
                </TableCell>
              </TableRow>
            ) : (
              colaboradores.map((colaborador) => (
                <TableRow key={colaborador.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-medium">{colaborador.nome}</TableCell>
                  <TableCell>{colaborador.nif || "-"}</TableCell>
                  <TableCell>{colaborador.telemovel || "-"}</TableCell>
                  <TableCell>{colaborador.funcao || "-"}</TableCell>
                  <TableCell>{colaborador.endereco || "-"}</TableCell>
                  <TableCell>
                    <ColaboradorRowActions colaborador={colaborador} />
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
