"use server";

import { db } from "@/db";
import { 
  clientes, 
  orcamentos, 
  fornecedores, 
  colaboradores,
  obras
} from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

// --- CLIENTES ---
export async function getClientes() {
  return await db.select().from(clientes).orderBy(clientes.createdAt);
}

export async function addCliente(data: typeof clientes.$inferInsert) {
  await db.insert(clientes).values(data);
  revalidatePath("/dashboard/clientes");
}

export async function updateCliente(id: string, data: Partial<typeof clientes.$inferInsert>) {
  await db.update(clientes).set(data).where(eq(clientes.id, id));
  revalidatePath("/dashboard/clientes");
}

export async function deleteCliente(id: string) {
  await db.delete(clientes).where(eq(clientes.id, id));
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

export async function updateOrcamento(id: string, data: Partial<typeof orcamentos.$inferInsert>) {
  await db.update(orcamentos).set(data).where(eq(orcamentos.id, id));
  revalidatePath("/dashboard/orcamentos");
}

export async function deleteOrcamento(id: string) {
  await db.delete(orcamentos).where(eq(orcamentos.id, id));
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

export async function updateFornecedor(id: string, data: Partial<typeof fornecedores.$inferInsert>) {
  await db.update(fornecedores).set(data).where(eq(fornecedores.id, id));
  revalidatePath("/dashboard/fornecedores");
}

export async function deleteFornecedor(id: string) {
  await db.delete(fornecedores).where(eq(fornecedores.id, id));
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

export async function updateColaborador(id: string, data: Partial<typeof colaboradores.$inferInsert>) {
  await db.update(colaboradores).set(data).where(eq(colaboradores.id, id));
  revalidatePath("/dashboard/colaboradores");
}

export async function deleteColaborador(id: string) {
  await db.delete(colaboradores).where(eq(colaboradores.id, id));
  revalidatePath("/dashboard/colaboradores");
}

// --- OBRAS ---
export async function getObras() {
  return await db.select().from(obras).orderBy(obras.createdAt);
}

export async function addObra(data: typeof obras.$inferInsert) {
  await db.insert(obras).values(data);
  revalidatePath("/dashboard/obras");
}

export async function updateObra(id: string, data: Partial<typeof obras.$inferInsert>) {
  await db.update(obras).set(data).where(eq(obras.id, id));
  revalidatePath("/dashboard/obras");
}

export async function deleteObra(id: string) {
  await db.delete(obras).where(eq(obras.id, id));
  revalidatePath("/dashboard/obras");
}
