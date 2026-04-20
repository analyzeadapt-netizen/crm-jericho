import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function main() {
  await sql`DROP TABLE IF EXISTS "clientes" CASCADE`;
  await sql`DROP TABLE IF EXISTS "contacts" CASCADE`;
  console.log('Tables dropped');
  process.exit(0);
}
main();
