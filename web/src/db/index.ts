import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Desativar SSL se necessário para desenvolvimento local, mas Supabase geralmente exige
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
