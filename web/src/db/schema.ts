import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk ID
  email: text("email").notNull().unique(),
  name: text("name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const clientes = pgTable("clientes", {
  id: uuid("id").defaultRandom().primaryKey(),
  cod: text("cod").unique(),
  nome: text("nome").notNull(),
  nif: text("nif"),
  morada: text("morada"),
  telefone: text("telefone"),
  setor: text("setor"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orcamentos = pgTable("orcamentos", {
  id: uuid("id").defaultRandom().primaryKey(),
  cod: text("cod"),
  valorInicial: text("valor_inicial"),
  valorAtual: text("valor_atual"),
  estado: text("estado").default("Aberto"), // Aberto, Fechado, Andamento
  observacoes: text("observacoes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const fornecedores = pgTable("fornecedores", {
  id: uuid("id").defaultRandom().primaryKey(),
  cod: text("cod").unique(),
  nomeEmpresa: text("nome_empresa").notNull(),
  setor: text("setor"),
  descricaoProduto: text("descricao_produto"),
  quantidade: text("quantidade"),
  valorProduto: text("valor_produto"),
  valorTotal: text("valor_total"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const colaboradores = pgTable("colaboradores", {
  id: uuid("id").defaultRandom().primaryKey(),
  cod: text("cod").unique(),
  nome: text("nome").notNull(),
  nif: text("nif"),
  telemovel: text("telemovel"),
  funcao: text("funcao"),
  endereco: text("endereco"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const obras = pgTable("obras", {
  id: uuid("id").defaultRandom().primaryKey(),
  cliente: text("cliente"),
  clienteNif: text("cliente_nif"),
  cod: text("cod"),
  tipo: text("tipo"),
  local: text("local"),
  duracao: text("duracao"),
  inicio: text("inicio"),
  fim: text("fim"),
  valor: text("valor"),
  createdAt: timestamp("created_at").defaultNow(),
});
