# Technical Specifications - CRM JERICO (Ref. CRM Easy)

## Frontend
- **Framework:** Next.js 14/15 (App Router)
- **Styling:** Tailwind CSS (Nota: O utilizador solicitou Vanilla CSS anteriormente, mas este doc refere Tailwind)
- **Components:** Radix UI / Shadcn UI
- **Icons:** Lucide React

## Backend & Database
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma or Drizzle
- **Auth:** Clerk or Supabase Auth

## Infrastructure
- **Hosting:** Vercel
- **Storage:** Supabase Storage
- **Emails:** Resend / SendGrid

## Features
1. **Multi-tenant Architecture:** Isolação de dados por empresa.
2. **Dashboard Dinâmico:** Gráficos e indicadores de performance.
3. **Pipeline de Vendas:** Drag and drop para gestão de oportunidades.
4. **Sistema de Tarefas:** Integração com calendário e lembretes.
