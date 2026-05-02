"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ObraRowActions } from "./obra-row-actions";

type Obra = {
  id: string;
  cliente: string | null;
  clienteNif: string | null;
  cod: string | null;
  tipo: string | null;
  local: string | null;
  duracao: string | null;
  inicio: string | null;
  fim: string | null;
  valor: string | null;
  createdAt: Date | null;
};

interface ObrasClientProps {
  initialObras: Obra[];
}

export function ObrasClient({ initialObras }: ObrasClientProps) {
  const [search, setSearch] = useState("");

  const filteredObras = initialObras.filter((obra) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    const matchCliente = obra.cliente?.toLowerCase().includes(searchLower) ?? false;
    const matchNif = obra.clienteNif?.toLowerCase().includes(searchLower) ?? false;
    return matchCliente || matchNif;
  });

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-emerald-400">
          <Search size={18} />
        </div>
        <Input
          type="text"
          placeholder="Pesquisar por NIF ou Nome do Cliente..."
          className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-emerald-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="premium-card p-0 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10">
              <TableHead className="text-emerald-400">Cód.</TableHead>
              <TableHead className="text-emerald-400">Cliente</TableHead>
              <TableHead className="text-emerald-400">NIF</TableHead>
              <TableHead className="text-emerald-400">Tipo</TableHead>
              <TableHead className="text-emerald-400">Local</TableHead>
              <TableHead className="text-emerald-400">Duração</TableHead>
              <TableHead className="text-emerald-400">Valor</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredObras.length === 0 ? (
              <TableRow className="border-white/10">
                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                  {search ? "Nenhuma obra encontrada para esta pesquisa." : "Nenhuma obra registada. Adicione o seu primeiro projeto."}
                </TableCell>
              </TableRow>
            ) : (
              filteredObras.map((obra) => (
                <TableRow key={obra.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-medium">{obra.cod || "-"}</TableCell>
                  <TableCell>{obra.cliente}</TableCell>
                  <TableCell>{obra.clienteNif || "-"}</TableCell>
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
