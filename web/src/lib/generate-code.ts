import { db } from "@/db";
import { sql } from "drizzle-orm";

type EntityType = "clientes" | "obras" | "fornecedores" | "colaboradores" | "orcamentos";

const prefixes: Record<EntityType, string> = {
  clientes: "CLI",
  obras: "OBR",
  fornecedores: "FOR",
  colaboradores: "COL",
  orcamentos: "ORC",
};

export async function generateAutomaticCode(entity: EntityType): Promise<string> {
  const prefix = prefixes[entity];
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Ex: "04"
  const year = now.getFullYear().toString().slice(-2); // Ex: "26"
  
  const result = await db.execute(sql`SELECT count(*) FROM ${sql.identifier(entity)}`);
  const count = Number(result[0].count);
  
  const sequenceNumber = count + 1;
  const sequence = sequenceNumber.toString().padStart(3, "0");
  
  // Formato Uniforme: CLI-04-26-001
  return `${prefix}-${month}-${year}-${sequence}`;
}
