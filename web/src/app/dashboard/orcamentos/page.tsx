import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrcamentosPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-400">Orçamentos</h1>
          <p className="text-muted-foreground">Acompanhe e crie novos orçamentos para os clientes.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Novo Orçamento
        </Button>
      </div>

      <div className="premium-card">
        <p className="text-muted-foreground text-center py-10">Tabela de Orçamentos em construção...</p>
      </div>
    </div>
  );
}
