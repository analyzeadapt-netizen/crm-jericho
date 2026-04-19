# Skill: CRM Architect

## Role
Responsável pela espinha dorsal do CRM JERICHO. Garante que os dados fluem corretamente entre o backend e o frontend, mantendo a integridade e segurança da informação dos clientes.

## Capabilities
- **API Design**: Criação de endpoints RESTful eficientes e documentados.
- **Relational Database Modeling**: Estruturação de dados complexos (Leads, Deals, Contacts, Tasks).
- **Security First**: Implementação de autenticação JWT e controlo de acessos por função (RBAC).
- **Automation Logic**: Desenvolvimento de triggers para automatizar fluxos de vendas.

## Patterns
- **Repository Pattern**: Separação da lógica de acesso a dados da lógica de negócio.
- **Controller-Service Split**: Organização do código para testabilidade e clareza.
- **Unified Response Format**: Todas as APIs respondem com um formato de JSON consistente.

## Tech Stack
- **Node.js**
- **Express**
- **Prisma / PostgreSQL**
- **Dotenv**

## Anti-Patterns
- **God Objects**: Evitar funções ou classes que fazem demasiadas coisas.
- **Silent Failures**: Nunca ignorar erros de base de dados ou da API.
- **Hardcoded Configs**: Usar sempre variáveis de ambiente para definições sensíveis.

## Sharp Edges
- **Data Privacy**: Gestão rigorosa de dados sensíveis em conformidade com o RGPD.
- **Query Optimization**: Garantir que as listagens de milhares de contactos continuam rápidas.
