<p align="center">
  <img src="public/pwa-512x512.png" alt="Controle de Efetivo" width="120" height="120" />
</p>

<h1 align="center">Controle de Efetivo — PWA</h1>

<p align="center">
  <strong>Sistema de gestão de presença, ausências e disponibilidade de efetivo militar</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-BaaS-3FCF8E?logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white" alt="PWA" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/License-Private-red" alt="License" />
</p>

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitetura da Aplicação](#-arquitetura-da-aplicação)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Modelo de Dados](#-modelo-de-dados)
- [Segurança e Autenticação](#-segurança-e-autenticação)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Configuração do Banco de Dados](#-configuração-do-banco-de-dados)
- [Progressive Web App (PWA)](#-progressive-web-app-pwa)
- [Deploy em Produção](#-deploy-em-produção)
- [Testes](#-testes)
- [Solução de Problemas](#-solução-de-problemas)
- [Documentação Complementar](#-documentação-complementar)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🎯 Visão Geral

O **Controle de Efetivo** é uma Progressive Web App (PWA) desenvolvida para a gestão completa de presença e ausências de militares em organizações militares. O sistema permite o acompanhamento em tempo real da disponibilidade do efetivo, com dashboard visual, controle de turnos, validação inteligente de conflitos e alertas de excesso de ausências por categoria.

### Destaques

| Característica | Descrição |
|----------------|-----------|
| 🌐 **Acesso Público** | Qualquer pessoa pode consultar quem está ausente — sem necessidade de login |
| 🔒 **Painel Administrativo** | Apenas administradores autenticados podem cadastrar, editar e excluir registros |
| 📱 **PWA/Offline-First** | Instalável em dispositivos móveis e desktops, com suporte a cache offline |
| ⚡ **Tempo Real** | Dados sincronizados entre todas as abas e dispositivos via Supabase |
| 🧠 **Validação Inteligente** | Detecção automática de conflitos de ausência e avisos de limite por categoria |
| 📊 **Dashboard Visual** | Cards e contadores de efetivo por categoria (Graduados / Cabos e Soldados) |

---

## ✨ Funcionalidades

### Módulo Público (sem autenticação)

- **Dashboard** — Visão geral rápida com contadores de efetivo disponível/ausente
- **Consulta de Ausências** — Cards "Fora Hoje", "Fora Amanhã" e "Próximos 7 Dias"
- **Filtragem Avançada** — Por nome, categoria (Graduado/Cabo-Soldado), motivo e período
- **Badges de Motivo** — Identificação visual por cores do tipo de ausência (Férias, Missão, Dispensa Médica, etc.)
- **Contagem de Efetivo** — Indicadores visuais de pessoal por categoria com nível de disponibilidade

### Módulo Administrativo (autenticado)

- **CRUD de Funcionários** — Cadastro, edição, ativação/desativação e exclusão
- **CRUD de Ausências** — Registro completo com motivo, datas, turno padrão e exceções por dia
- **Validação de Conflitos** — Bloqueio automático de ausências sobrepostas para o mesmo militar
- **Alerta de Excesso** — Aviso quando o limite de graduados (≥3) ou cabos/soldados (≥2) ausentes simultâneos é atingido
- **Exceções por Dia** — Turnos específicos podem ser definidos para dias individuais de uma ausência
- **Alteração de Senha** — Administradores podem alterar suas próprias senhas
- **Funcionalidade "Lembrar-me"** — Persistência opcional de sessão

### Recursos Técnicos

- **PWA Completa** — Service Worker com auto-update, cache estratégico (CacheFirst para fontes) e manifest
- **Responsividade** — Layout adaptado para mobile, tablet e desktop
- **Migração de Dados** — Ferramenta integrada para migração de IndexedDB legado para Supabase
- **IndexedDB de Backup** — Camada local de dados para operações offline (legado)
- **SEO Otimizado** — Meta tags Open Graph, Twitter Cards e `<meta>` semânticos

---

## 🛠 Stack Tecnológico

### Frontend

| Tecnologia | Versão | Função |
|------------|--------|--------|
| [React](https://react.dev) | 18.3 | Biblioteca de UI com componentes declarativos |
| [TypeScript](https://typescriptlang.org) | 5.8 | Tipagem estática e segurança de tipos |
| [Vite](https://vitejs.dev) | 5.4 | Bundler ultrarrápido com HMR |
| [Tailwind CSS](https://tailwindcss.com) | 3.4 | Framework utilitário de CSS |
| [shadcn/ui](https://ui.shadcn.com) | — | Lib de componentes acessíveis (Radix UI) |
| [React Router DOM](https://reactrouter.com) | 6.30 | Roteamento SPA |
| [TanStack React Query](https://tanstack.com/query) | 5.83 | Cache e fetch de dados server-state |
| [React Hook Form](https://react-hook-form.com) | 7.61 | Gerenciamento de formulários de alto desempenho |
| [Zod](https://zod.dev) | 3.25 | Validação e parsing de schemas |
| [Recharts](https://recharts.org) | 2.15 | Gráficos e visualizações |
| [Framer Motion](https://motion.dev) | 12.31 | Animações e transições |
| [date-fns](https://date-fns.org) | 3.6 | Manipulação de datas |
| [Lucide React](https://lucide.dev) | 0.462 | Ícones SVG otimizados |
| [Sonner](https://sonner.emilkowal.ski) | 1.7 | Notificações toast |
| [cmdk](https://cmdk.paco.me) | 1.1 | Command palette |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.3 | Suporte a temas claro/escuro |

### Backend-as-a-Service (BaaS)

| Tecnologia | Função |
|------------|--------|
| [Supabase](https://supabase.com) | Autenticação, banco de dados PostgreSQL, RLS e API REST automática |

### PWA

| Tecnologia | Função |
|------------|--------|
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app) | Geração de Service Worker e Web Manifest |
| [Workbox](https://developer.chrome.com/docs/workbox) | Estratégias de cache (runtime caching) |

### DevTools

| Tecnologia | Versão | Função |
|------------|--------|--------|
| [Vitest](https://vitest.dev) | 3.2 | Framework de testes unitários |
| [Testing Library](https://testing-library.com) | 16.0 | Testes de componentes React |
| [ESLint](https://eslint.org) | 9.32 | Linter para qualidade de código |
| [PostCSS](https://postcss.org) | 8.5 | Processamento de CSS |
| [Autoprefixer](https://autoprefixer.github.io) | 10.4 | Prefixos CSS cross-browser |

### Infraestrutura

| Serviço | Função |
|---------|--------|
| [Vercel](https://vercel.com) | Hospedagem e deploy contínuo |
| [GitHub](https://github.com) | Controle de versão e repositório |

---

## 🏗 Arquitetura da Aplicação

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                        │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │
│  │  React   │  │ React    │  │ React    │  │   Service      │  │
│  │  Router  │→ │ Context  │→ │ Query    │  │   Worker       │  │
│  │  (SPA)   │  │ (Auth +  │  │ (Cache)  │  │   (Offline)    │  │
│  │          │  │  Data)   │  │          │  │                │  │
│  └──────────┘  └────┬─────┘  └──────────┘  └────────────────┘  │
│                     │                                            │
│                     │ API REST (auto-generated)                  │
│                     ▼                                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  IndexedDB (fallback offline)            │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                          │
                          │ HTTPS
                          ▼
┌──────────────────────────────────────────────────────────────────┐
│                     SUPABASE (Backend)                           │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │
│  │  Auth    │  │PostgreSQL│  │   RLS    │  │   REST API     │  │
│  │ (JWT)   │  │   (DB)   │  │(Policies)│  │ (PostgREST)    │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### Padrões Arquiteturais

- **Context API** — Gerenciamento de estado global para autenticação (`AuthContext`) e dados (`DataContext`)
- **Container / Presentational** — Separação entre lógica de negócios (contexts/hooks) e componentes de UI
- **Protected Routes** — HOC `ProtectedRoute` que valida autenticação + papel de administrador
- **Optimistic Updates** — Refresh de dados pós-mutação via `refreshData()`

---

## 📁 Estrutura de Pastas

```
efetivo-pwa/
├── public/                          # Ativos estáticos servidos pela raiz
│   ├── favicon.ico                  # Ícone do navegador
│   ├── pwa-192x192.png              # Ícone PWA (192×192)
│   ├── pwa-512x512.png              # Ícone PWA (512×512)
│   ├── placeholder.svg              # Placeholder genérico
│   └── robots.txt                   # Configuração de crawlers
│
├── src/
│   ├── components/                  # Componentes reutilizáveis
│   │   ├── ui/                      # Componentes shadcn/ui (49 componentes)
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ... (+37 componentes)
│   │   │
│   │   ├── AbsenceCard.tsx          # Card de exibição de ausência individual
│   │   ├── AppLayout.tsx            # Layout principal com navegação
│   │   ├── AusenciaForm.tsx         # Formulário completo de ausência (22KB)
│   │   ├── Badges.tsx               # Badges visuais por motivo de ausência
│   │   ├── ChangePasswordDialog.tsx # Dialog para alteração de senha
│   │   ├── FuncionarioForm.tsx      # Formulário de cadastro de funcionário
│   │   ├── NavLink.tsx              # Link de navegação reutilizável
│   │   ├── Next7DaysCard.tsx        # Card de previsão dos próximos 7 dias
│   │   └── StaffCounter.tsx         # Contador visual de efetivo disponível
│   │
│   ├── contexts/                    # Contextos React (estado global)
│   │   ├── AuthContext.tsx          # Autenticação, login, logout, roles
│   │   └── DataContext.tsx          # CRUD, validações e dados computados
│   │
│   ├── hooks/                       # Custom hooks
│   │   ├── use-mobile.tsx           # Detecção de viewport mobile
│   │   └── use-toast.ts             # Hook para notificações toast
│   │
│   ├── lib/                         # Utilitários e serviços
│   │   ├── database.types.ts        # Tipos auto-gerados do Supabase
│   │   ├── db.ts                    # Camada IndexedDB (legado/offline)
│   │   ├── supabase.ts              # Cliente Supabase configurado
│   │   └── utils.ts                 # Utilitários (cn, classnames)
│   │
│   ├── pages/                       # Páginas/rotas da aplicação
│   │   ├── Admin.tsx                # Painel administrativo (CRUD completo)
│   │   ├── Consulta.tsx             # Página pública de consulta de ausências
│   │   ├── Dashboard.tsx            # Dashboard com contadores e resumos
│   │   ├── Index.tsx                # Página inicial (redirect)
│   │   ├── Install.tsx              # Guia de instalação do PWA
│   │   ├── Login.tsx                # Tela de autenticação
│   │   ├── Migrate.tsx              # Ferramenta de migração IndexedDB → Supabase
│   │   └── NotFound.tsx             # Página 404
│   │
│   ├── test/                        # Configuração e testes
│   │   ├── example.test.ts          # Teste de exemplo
│   │   └── setup.ts                 # Setup do ambiente de testes
│   │
│   ├── types/                       # Definições de tipos TypeScript
│   │   └── index.ts                 # Interfaces, tipos e enums do domínio
│   │
│   ├── App.tsx                      # Componente raiz com providers e rotas
│   ├── App.css                      # Estilos globais do app
│   ├── index.css                    # Design tokens e variáveis CSS
│   ├── main.tsx                     # Entry point React
│   └── vite-env.d.ts                # Declarações de ambiente Vite
│
├── .env                             # Variáveis de ambiente (NÃO versionado)
├── .env.example                     # Template de variáveis de ambiente
├── .gitignore                       # Regras de exclusão do Git
├── components.json                  # Configuração do shadcn/ui
├── create-admin-users.sql           # Script SQL para criação de administradores
├── DEPLOY.md                        # Guia detalhado de deploy no Vercel
├── eslint.config.js                 # Configuração ESLint (flat config)
├── index.html                       # HTML raiz com SEO e meta tags PWA
├── migrar-dados.sql                 # Script de migração de dados
├── package.json                     # Dependências e scripts npm
├── postcss.config.js                # Configuração PostCSS
├── supabase-schema.sql              # Schema completo do banco de dados
├── tailwind.config.ts               # Configuração Tailwind com design tokens
├── TESTES.md                        # Roteiro completo de testes manuais
├── tsconfig.json                    # Configuração base TypeScript
├── tsconfig.app.json                # Config TypeScript para a aplicação
├── tsconfig.node.json               # Config TypeScript para scripts Node
├── vercel.json                      # Configuração de deploy Vercel
├── vite.config.ts                   # Configuração Vite (plugins, PWA, alias)
└── vitest.config.ts                 # Configuração Vitest
```

---

## 🗄 Modelo de Dados

O banco de dados utiliza **PostgreSQL** gerenciado pelo Supabase, com três tabelas principais:

### Entity-Relationship Diagram

```
┌────────────────────┐        ┌────────────────────────┐
│   usuarios_admin   │        │      funcionarios       │
├────────────────────┤        ├────────────────────────┤
│ id (PK, UUID)      │        │ id (PK, UUID)          │
│ email (UNIQUE)     │        │ nome (TEXT)             │
│ user_id (FK→auth)  │        │ graduacao (TEXT)        │
│ created_at         │        │ categoria (TEXT ✓)      │
└────────────────────┘        │ ordem_antiguidade (INT) │
                              │ ativo (BOOLEAN)         │
                              │ created_at              │
                              │ updated_at              │
                              └───────────┬────────────┘
                                          │ 1:N
                                          ▼
                              ┌────────────────────────┐
                              │       ausencias         │
                              ├────────────────────────┤
                              │ id (PK, UUID)          │
                              │ funcionario_id (FK) ◄──┘
                              │ motivo (TEXT)           │
                              │ data_inicio (DATE)     │
                              │ data_fim (DATE)        │
                              │ turno_padrao (TEXT ✓)   │
                              │ excecoes_por_dia (JSONB)│
                              │ observacao (TEXT)       │
                              │ created_at             │
                              │ updated_at             │
                              └────────────────────────┘

✓ = CHECK constraint
```

### Tabela: `funcionarios`

| Coluna | Tipo | Constraint | Descrição |
|--------|------|------------|-----------|
| `id` | `UUID` | PK, DEFAULT `uuid_generate_v4()` | Identificador único |
| `nome` | `TEXT` | NOT NULL | Nome completo do militar |
| `graduacao` | `TEXT` | NOT NULL | Posto/Graduação (SO, 1S, 2S, 3S, CB, S1, S2) |
| `categoria` | `TEXT` | CHECK (`GRADUADO`, `CABO_SOLDADO`) | Categoria hierárquica |
| `ordem_antiguidade` | `INTEGER` | NOT NULL | Ordem de antiguidade (menor = mais antigo) |
| `ativo` | `BOOLEAN` | DEFAULT `true` | Status de atividade |
| `created_at` | `TIMESTAMPTZ` | DEFAULT `NOW()` | Data de criação |
| `updated_at` | `TIMESTAMPTZ` | DEFAULT `NOW()`, auto-trigger | Última atualização |

### Tabela: `ausencias`

| Coluna | Tipo | Constraint | Descrição |
|--------|------|------------|-----------|
| `id` | `UUID` | PK, DEFAULT `uuid_generate_v4()` | Identificador único |
| `funcionario_id` | `UUID` | FK → `funcionarios.id` ON DELETE CASCADE | Militar vinculado |
| `motivo` | `TEXT` | NOT NULL | Motivo da ausência |
| `data_inicio` | `DATE` | NOT NULL | Data de início |
| `data_fim` | `DATE` | NOT NULL, CHECK (`≥ data_inicio`) | Data de término |
| `turno_padrao` | `TEXT` | CHECK (`MATUTINO`, `VESPERTINO`, `INTEGRAL`) | Turno padrão |
| `excecoes_por_dia` | `JSONB` | DEFAULT `[]` | Exceções de turno por data específica |
| `observacao` | `TEXT` | — | Observações opcionais |
| `created_at` | `TIMESTAMPTZ` | DEFAULT `NOW()` | Data de criação |
| `updated_at` | `TIMESTAMPTZ` | DEFAULT `NOW()`, auto-trigger | Última atualização |

### Tabela: `usuarios_admin`

| Coluna | Tipo | Constraint | Descrição |
|--------|------|------------|-----------|
| `id` | `UUID` | PK, DEFAULT `uuid_generate_v4()` | Identificador único |
| `email` | `TEXT` | UNIQUE, NOT NULL | Email do administrador |
| `user_id` | `UUID` | FK → `auth.users.id` ON DELETE CASCADE | Vínculo com auth |
| `created_at` | `TIMESTAMPTZ` | DEFAULT `NOW()` | Data de criação |

### Tipos e Enums do Domínio

```typescript
// Graduações militares (hierarquia)
type Graduacao = 'SO' | '1S' | '2S' | '3S' | 'CB' | 'S1' | 'S2';

// Categorias de pessoal
type Categoria = 'GRADUADO' | 'CABO_SOLDADO';

// Turnos de ausência
type Turno = 'MATUTINO' | 'VESPERTINO' | 'INTEGRAL';

// Motivos de ausência (14 tipos)
type MotivoAusencia =
  | 'Missão'     | 'Comissão'       | 'Serviço'
  | 'Férias'     | 'Dispensa Médica'| 'Dispensado pela chefia'
  | 'Licença Paternidade' | 'Licença Maternidade'
  | 'Licença Luto'        | 'Dispensa de serviço'
  | 'Trânsito'   | 'Instalação'     | 'Licença Núpcias'
  | 'Reunião';
```

---

## 🔒 Segurança e Autenticação

### Autenticação

- **Supabase Auth** com login por email/senha via JWT
- **Auto-refresh** de token habilitado
- **Persistência de sessão** via `localStorage` (com opção "Lembrar-me")
- **Detecção de sessão via URL** para fluxos de redirecionamento

### Controle de Acesso (RBAC)

O sistema implementa dois papéis:

| Papel | Permissões |
|-------|------------|
| **Público** (anônimo) | Leitura de `funcionarios` e `ausencias` |
| **Administrador** | CRUD completo em `funcionarios` e `ausencias` |

A verificação de papel é feita por consulta à tabela `usuarios_admin`:

```
É admin? → SELECT * FROM usuarios_admin WHERE email = <user_email>
```

### Row Level Security (RLS)

Todas as tabelas possuem RLS ativado com as seguintes políticas:

| Tabela | Operação | Política |
|--------|----------|----------|
| `funcionarios` | `SELECT` | ✅ Público — `USING (true)` |
| `funcionarios` | `INSERT/UPDATE/DELETE` | 🔒 Apenas admins — `WHERE user_id = auth.uid()` |
| `ausencias` | `SELECT` | ✅ Público — `USING (true)` |
| `ausencias` | `INSERT/UPDATE/DELETE` | 🔒 Apenas admins — `WHERE user_id = auth.uid()` |
| `usuarios_admin` | `SELECT` | 🔒 Próprio registro — `WHERE user_id = auth.uid()` |

### Headers de Segurança (Vercel)

Configurados via `vercel.json`:

- **`X-Content-Type-Options: nosniff`** — Previne MIME type sniffing
- **`X-Frame-Options: DENY`** — Previne clickjacking
- **`X-XSS-Protection: 1; mode=block`** — Proteção XSS do navegador

---

## 📦 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

| Requisito | Versão Mínima | Link |
|-----------|---------------|------|
| **Node.js** | 18.x ou superior | [nodejs.org](https://nodejs.org) |
| **npm** | 9.x ou superior | Incluído com o Node.js |
| **Git** | 2.x | [git-scm.com](https://git-scm.com) |
| **Conta Supabase** | — | [supabase.com](https://supabase.com) |

> 💡 **Recomendado:** Use o [nvm](https://github.com/nvm-sh/nvm) (Linux/Mac) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) para gerenciar versões do Node.js.

---

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/ghmata/Team_Control.git
cd Team_Control/efetivo-pwa
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o template e preencha com suas credenciais do Supabase:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica-anon-aqui
```

> ⚠️ **Importante:** As variáveis devem ter o prefixo `VITE_` para serem acessíveis no frontend via `import.meta.env`.

Para obter suas credenciais:
1. Acesse o [Supabase Dashboard](https://app.supabase.com)
2. Navegue até **Settings → API**
3. Copie a **Project URL** e a **anon/public key**

### 4. Configure o banco de dados

Execute o schema SQL no Supabase (veja [Configuração do Banco de Dados](#-configuração-do-banco-de-dados)).

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: **`http://localhost:8080`**

---

## 📜 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| **dev** | `npm run dev` | Inicia o servidor de desenvolvimento (porta 8080) |
| **build** | `npm run build` | Gera o build de produção otimizado em `dist/` |
| **build:dev** | `npm run build:dev` | Build em modo desenvolvimento (sem minificação) |
| **preview** | `npm run preview` | Serve o build de produção localmente para preview |
| **lint** | `npm run lint` | Executa o ESLint para análise estática de código |
| **test** | `npm run test` | Executa todos os testes unitários (single run) |
| **test:watch** | `npm run test:watch` | Executa testes em modo watch (re-run ao salvar) |

---

## 🗃 Configuração do Banco de Dados

### Passo 1: Criar as tabelas

1. Acesse o [Supabase Dashboard](https://app.supabase.com) → seu projeto
2. Navegue até **SQL Editor**
3. Cole e execute o conteúdo de [`supabase-schema.sql`](supabase-schema.sql)

Este script criará:
- ✅ Extensão `uuid-ossp`
- ✅ Tabelas `funcionarios`, `ausencias` e `usuarios_admin`
- ✅ Índices para performance
- ✅ Triggers para `updated_at` automático
- ✅ Políticas RLS completas

### Passo 2: Criar usuários administradores

1. No Supabase, vá em **Authentication → Users → Add User**
2. Crie os usuários com email e senha
3. Marque ☑ **Auto Confirm User**
4. No **SQL Editor**, execute o conteúdo de [`create-admin-users.sql`](create-admin-users.sql)

### Passo 3: Inserir dados iniciais (opcional)

O schema inclui dados de exemplo comentados. Para usá-los:
1. Descomente o bloco `INSERT INTO funcionarios` no final de `supabase-schema.sql`
2. Execute no SQL Editor

---

## 📲 Progressive Web App (PWA)

A aplicação é uma PWA completa, configurada via `vite-plugin-pwa`:

### Recursos

| Recurso | Configuração |
|---------|-------------|
| **Tipo de Registro** | `autoUpdate` — Atualiza automaticamente o SW |
| **Display** | `standalone` — Aparência de app nativo |
| **Orientação** | `portrait` — Otimizado para retrato |
| **Theme Color** | `#1e3a5f` — Azul militar escuro |
| **Background Color** | `#f5f7fa` — Cinza claro neutro |

### Estratégias de Cache

| Recurso | Estratégia | Cache Name | TTL |
|---------|------------|------------|-----|
| Arquivos estáticos (JS, CSS, HTML) | Precache | Build hash | Até novo deploy |
| Google Fonts (CSS) | CacheFirst | `google-fonts-cache` | 1 ano |
| Google Fonts (Glyphs) | CacheFirst | `gstatic-fonts-cache` | 1 ano |

### Instalação

1. Acesse a aplicação pelo navegador (Chrome, Edge, Safari)
2. Clique no ícone de instalação na barra de endereço
3. Ou acesse a página `/install` para instruções detalhadas

---

## 🌐 Deploy em Produção

O deploy é feito no **Vercel** com integração contínua via GitHub.

### Quick Start

1. Importe o repositório no [Vercel Dashboard](https://vercel.com)
2. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy automático a cada `git push`

### Configuração do Vercel (`vercel.json`)

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

> 📖 Para o guia completo de deploy, consulte o arquivo [`DEPLOY.md`](DEPLOY.md).

---

## 🧪 Testes

### Framework

- **Vitest** — Runner de testes compatível com Vite
- **Testing Library** — Renderização e interação com componentes React
- **jsdom** — Ambiente DOM simulado para testes

### Executar Testes

```bash
# Single run
npm run test

# Watch mode (re-executa ao salvar)
npm run test:watch
```

### Testes Manuais

O projeto inclui um roteiro completo de testes manuais no arquivo [`TESTES.md`](TESTES.md), cobrindo:

1. ✅ Acesso público (sem login)
2. ✅ Login de administrador
3. ✅ CRUD de funcionários
4. ✅ CRUD de ausências
5. ✅ Validação de conflitos
6. ✅ Alerta de excesso de ausência
7. ✅ Logout e persistência de sessão
8. ✅ Controle de acesso (não-admin)

---

## 🐛 Solução de Problemas

### Aplicação não carrega

| Verificação | Comando/Ação |
|-------------|-------------|
| Console do navegador | `F12` → Aba **Console** |
| Variáveis de ambiente | Conferir `.env` com prefixo `VITE_` |
| Servidor rodando? | `npm run dev` deve mostrar a URL |

### Login falha

| Verificação | Ação |
|-------------|------|
| Email correto? | Usar email completo, case-sensitive |
| Usuário existe? | Verificar em Supabase → Authentication → Users |
| É admin? | Verificar em `SQL Editor`: `SELECT * FROM usuarios_admin;` |
| CORS? | Verificar Settings → API → CORS no Supabase |

### Dados não aparecem

| Verificação | Ação |
|-------------|------|
| Erros no console? | `F12` → Console |
| Dados existem? | Verificar no Supabase Table Editor |
| RLS ativado? | Verificar se as políticas estão criadas |

### Erro de build

```bash
# Teste o build localmente antes de fazer push
npm run build
```

---

## 📖 Documentação Complementar

| Arquivo | Descrição |
|---------|-----------|
| [`DEPLOY.md`](DEPLOY.md) | Tutorial completo de deploy no Vercel (dashboard + CLI) |
| [`TESTES.md`](TESTES.md) | Roteiro detalhado de testes manuais com checklist |
| [`supabase-schema.sql`](supabase-schema.sql) | Schema completo do banco de dados PostgreSQL |
| [`create-admin-users.sql`](create-admin-users.sql) | Script para criação de usuários administradores |
| [`migrar-dados.sql`](migrar-dados.sql) | Script de migração de dados legados |

---

## 🤝 Contribuição

### Fluxo de Trabalho

1. Crie uma branch a partir de `main`:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
2. Implemente suas alterações seguindo os padrões do projeto
3. Rode os testes e o linter:
   ```bash
   npm run lint
   npm run test
   ```
4. Faça commit com mensagens descritivas:
   ```bash
   git commit -m "feat: adiciona novo motivo de ausência"
   ```
5. Abra um Pull Request para `main`

### Padrões de Código

- **TypeScript** estrito — evite `any` e use interfaces/types explícitos
- **Componentes** — máximo ~250 linhas; separe lógica de apresentação
- **Hooks** — extraia lógica complexa para custom hooks
- **CSS** — use classes Tailwind; design tokens em `index.css`
- **Commits** — siga [Conventional Commits](https://www.conventionalcommits.org/pt-br/)

---

## 📄 Licença

Este projeto é **privado** e de uso restrito. Todos os direitos reservados.

---

<p align="center">
  <sub>Desenvolvido com profissionalismo para a gestão eficiente de efetivo militar</sub>
</p>
