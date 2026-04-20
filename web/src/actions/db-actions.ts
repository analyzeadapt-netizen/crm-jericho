"use server";

import { db } from "@/db";
import { 
  clientes, 
  orcamentos, 
  fornecedores, 
  colaboradores 
} from "@/db/schema";
import { revalidatePath } from "next/cache";

// --- CLIENTES ---
export async function getClientes() {
  return await db.select().from(clientes).orderBy(clientes.createdAt);
}

export async function addCliente(data: typeof clientes.$inferInsert) {
  await db.insert(clientes).values(data);
  revalidatePath("/dashboard/clientes");
}

// --- ORÇAMENTOS ---
export async function getOrcamentos() {
  return await db.select().from(orcamentos).orderBy(orcamentos.createdAt);
}

export async function addOrcamento(data: typeof orcamentos.$inferInsert) {
  await db.insert(orcamentos).values(data);
  revalidatePath("/dashboard/orcamentos");
}

// --- FORNECEDORES ---
export async function getFornecedores() {
  return await db.select().from(fornecedores).orderBy(fornecedores.createdAt);
}

export async function addFornecedor(data: typeof fornecedores.$inferInsert) {
  await db.insert(fornecedores).values(data);
  revalidatePath("/dashboard/fornecedores");
}

// --- COLABORADORES ---
export async function getColaboradores() {
  return await db.select().from(colaboradores).orderBy(colaboradores.createdAt);
}

export async function addColaborador(data: typeof colaboradores.$inferInsert) {
  await db.insert(colaboradores).values(data);
  revalidatePath("/dashboard/colaboradores");
}
