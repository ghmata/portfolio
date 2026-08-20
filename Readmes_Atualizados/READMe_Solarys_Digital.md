<p align="center">
  <img src="https://img.shields.io/badge/Status-Em%20Produção-brightgreen?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-Proprietário-red?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/Python-3.12-blue?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-0.111+-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</p>

# ☀️ Solarys Digital

**Plataforma SaaS B2B2C Multi-Tenant para Simulação e Gestão de Energia Solar**

O **Solarys Digital** é um ecossistema completo projetado para empresas de instalação solar gerenciarem leads, simularem sistemas fotovoltaicos personalizados e gerarem propostas comerciais automatizadas — tudo sob a marca da empresa (White Label). A plataforma integra captação inteligente, simulação técnica baseada em parâmetros configuráveis por empresa, disparo automático de propostas em PDF via e-mail, gestão financeira com instituições parceiras, cobrança via Stripe e cadastro self-service com verificação de e-mail.

---

## 📑 Sumário

- [Arquitetura](#-arquitetura-do-sistema)
- [Stack Tecnológica](#-stack-tecnológica)
- [Features Principais](#-features-principais)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Rotas da API](#-rotas-da-api)
- [Banco de Dados](#-banco-de-dados)
- [Motor de Cálculo Solar](#-motor-de-cálculo-solar)
- [Segurança](#-segurança)
- [Integrações Externas](#-integrações-externas)
- [Testes](#-testes)
- [Deploy](#-deploy)
- [Autores](#-autores)

---

## 🏗️ Arquitetura do Sistema

A arquitetura segue o modelo **monorepo** com separação clara entre frontend e backend, comunicação via REST API, e banco de dados blindado por **Row-Level Security (RLS)** para isolamento total entre empresas.

```
┌──────────────────────────────────────────────────────────────────┐
│                        FRONTEND (SPA)                            │
│          React 19 · Vite 7 · TailwindCSS 4 · shadcn/ui          │
│    ┌─────────────┬──────────────────┬──────────────────────┐     │
│    │  Landing    │  Painel Empresa  │   Painel Master      │     │
│    │  Page +     │  Dashboard, CRM  │   Multi-Tenant       │     │
│    │  Simulador  │  Leads, Kits     │   Admin Global       │     │
│    │  Registro   │  Configurações   │   Empresas, Billing  │     │
│    └─────────────┴──────────────────┴──────────────────────┘     │
└──────────────────────────┬───────────────────────────────────────┘
                           │ REST API (JWT + Session Tracking)
┌──────────────────────────▼───────────────────────────────────────┐
│                        BACKEND (API)                             │
│             FastAPI · Python 3.12 · Pydantic v2                  │
│    ┌───────────┬───────────┬───────────┬───────────────────┐     │
│    │  Routers  │ Services  │  Models   │   Middleware       │     │
│    │ 12 módulos│ 14 módulos│ 16 schemas│  JWT + CORS + RL   │     │
│    └───────────┴───────────┴───────────┴───────────────────┘     │
│    ┌───────────────────────────────────────────────────────┐     │
│    │ Integrações: Resend · Stripe · ReportLab · Supabase   │     │
│    │ Segurança: Rate Limit · Audit Log · Session Manager   │     │
│    └───────────────────────────────────────────────────────┘     │
└──────────────────────────┬───────────────────────────────────────┘
                           │ asyncpg (Connection Pool)
┌──────────────────────────▼───────────────────────────────────────┐
│                   SUPABASE (PostgreSQL 15+)                       │
│     RLS Multi-Tenant · Auth · Storage (Logos) · Migrations       │
└──────────────────────────────────────────────────────────────────┘
```

### Princípios Arquiteturais

| Princípio | Implementação |
|-----------|---------------|
| **Multi-Tenancy** | Isolamento via RLS — cada empresa só acessa seus próprios dados |
| **Cascata de Configuração** | Empresa > Global — empresa herda config global e pode sobrescrever |
| **White Label** | Cor primária, secundária e logo dinâmicos por empresa via CSS Variables |
| **Segurança** | JWT com roles (master / empresa / gestor / vendedor), CORS dinâmico, rate limiting in-memory, audit log, controle de sessões concorrentes (FIFO) |
| **Performance** | asyncpg com connection pool, geração de PDF em memória (BytesIO), lazy cleanup de sessões expiradas |
| **Onboarding** | Cadastro self-service com verificação de e-mail, reCAPTCHA v3, trial automático de 7 dias |

---

## 🛠️ Stack Tecnológica

### Frontend

| Tecnologia | Versão | Função |
|:-----------|:------:|:-------|
| React | 19.2 | Biblioteca UI reativa |
| Vite | 7.3 | Build tool e dev server |
| TypeScript | 5.9 | Tipagem estática |
| TailwindCSS | 4.1 | Framework CSS utility-first |
| shadcn/ui | — | Componentes acessíveis (Radix UI) |
| React Router DOM | 7.13 | Roteamento SPA |
| React Hook Form | 7.71 | Gestão de formulários |
| Zod | 4.3 | Validação de schemas |
| Recharts | 3.7 | Gráficos e dashboards |
| Axios | 1.13 | Cliente HTTP |
| Lucide React | 0.574 | Ícones SVG |
| Sonner + React Hot Toast | — | Notificações toast |
| date-fns | 4.1 | Manipulação de datas |
| Playwright | 1.58 | Testes E2E |
| Vitest | 4.0 | Testes unitários frontend |

### Backend

| Tecnologia | Versão | Função |
|:-----------|:------:|:-------|
| Python | 3.12 | Linguagem principal |
| FastAPI | 0.111+ | Framework web async |
| Pydantic | 2.7+ | Validação e serialização |
| asyncpg | 0.29+ | Driver PostgreSQL assíncrono |
| Uvicorn | 0.24 | Servidor ASGI |
| python-jose | 3.3 | JWT encoding/decoding |
| passlib + bcrypt | — | Hash de senhas |
| ReportLab | 4.0 | Geração de PDF server-side |
| Resend | 2.10 | Envio de e-mails transacionais |
| Stripe | 8.0+ | Gateway de pagamento e billing |
| httpx | 0.25 | Cliente HTTP assíncrono (reCAPTCHA, APIs externas) |
| openpyxl | 3.1+ | Exportação Excel |
| pytest + pytest-asyncio | — | Testes unitários assíncronos |

### Infraestrutura

| Tecnologia | Função |
|:-----------|:-------|
| Supabase | PostgreSQL gerenciado + Auth + Storage |
| Railway | Deploy do backend (Procfile) |
| Vercel / Netlify | Deploy do frontend (Vite build) |
| Google reCAPTCHA v3 | Proteção anti-bot no cadastro self-service |

---

## ✨ Features Principais

### 🏢 Painel Master (Administrador Global)

- **Gestão de Empresas** — CRUD completo de empresas com upload de logo, cores customizáveis, modo de simulador (kits vs cálculo automático), endereço e CEP, e-mail comercial separado do e-mail de login
- **Configurações Globais** — Parâmetros de cálculo padrão (eficiência, potência de placa, faixas de preço/kWp, tarifas por estado, HSP)
- **Dashboard Master** — Visão consolidada de todas as empresas, leads e métricas com cards de status por empresa
- **Gestão de Leads Global** — Visualização de leads de todas as empresas com filtros avançados
- **Sistema de Suporte** — Tickets e comunicação bidirecional com empresas
- **Desempenho de Vendedores** — Métricas e ranking cross-empresa
- **Planos e Billing** — Integração Stripe com trials, assinaturas, controle de vencimento e gestores adicionais
- **Aprovação de Registros** — Visualização de registros pendentes de self-service

### 🏪 Painel da Empresa

- **Dashboard Gráfico** — Métricas de leads com gráficos Recharts, sparklines semanais/mensais, KPIs de conversão e dashboard essencial para planos simplificados
- **Dashboard Sem Plano** — Tela específica para empresas sem plano ativo com call-to-action de assinatura
- **CRM de Leads** — Listagem, filtros por status (dropdown com motivo de perda), busca, paginação e exportação Excel
- **Detalhes do Lead** — Histórico completo, recálculo de simulação, seleção de kit, envio de proposta
- **Simulador Interno** — Recálculo com orientação do telhado, inclinação, geração desejada, seleção de instituição financeira e entrada condicional (kWh ou valor monetário)
- **Proposta Comercial** — Revisão completa e envio de PDF profissional via e-mail com identidade visual da empresa
- **Gestão de Kits** — CRUD de kits fotovoltaicos com potência, geração, número de placas e preço (modal interativo)
- **Gestão de Usuários** — Criação de gestores e vendedores com Role-Based Access Control, seleção de vendedores por modal
- **Instituições Financeiras** — Cadastro de bancos parceiros com taxas de juros, parcelas e carência
- **Configurações de Cálculo** — 14 parâmetros configuráveis por empresa com cascata empresa > global
- **Dados Institucionais** — CNPJ, razão social, endereço, CEP, telefones e e-mail comercial editáveis
- **Estados e Tarifas** — Override de tarifa (R$/kWh) e HSP por estado para a empresa
- **Suporte** — Criação de tickets para comunicação com o administrador
- **Planos** — Visualização do plano atual, upgrade, trial countdown e gestão de assinatura Stripe
- **Termos de Uso** — Aceite obrigatório de termos para novos gestores

### 🌐 Landing Page Pública (White Label)

- **Simulador Solar** — Formulário responsivo com campos: nome, WhatsApp, e-mail, cidade, estado, valor da conta, consumo opcional
- **Resultado Interativo** — Página de resultado com dimensionamento do sistema, economia mensal estimada, parcelamento e opção de recalcular
- **Identidade Visual Dinâmica** — Logo, cores e nome da empresa carregados via CSS Variables em tempo real
- **Captura de Leads** — Salvamento automático com atribuição Round-Robin entre vendedores
- **Envio Automático** — Geração e envio da proposta em PDF via e-mail ao salvar lead

### 📝 Cadastro Self-Service de Empresa

- **Formulário Multi-Step** — 3 etapas (Empresa → Administrador → Confirmação) com stepper animado e transições suaves
- **Validação Completa** — Zod + React Hook Form com validação inline (e-mail/CNPJ disponível em tempo real)
- **Segurança** — reCAPTCHA v3, rate limiting (5 tentativas/15min por IP), verificação de unicidade de e-mail e CNPJ
- **Verificação de E-mail** — Token seguro (48h) enviado via Resend, empresa criada apenas após confirmação
- **Trial Automático** — 7 dias no plano Start concedidos automaticamente na criação
- **Stripe Customer** — Criação automática fire-and-forget ao confirmar e-mail
- **LGPD** — Aceites obrigatórios de Termos de Uso e Política de Privacidade registrados com IP e User-Agent
- **Reenvio de Verificação** — Endpoint de reenvio com rate limit (3/hora)
- **Password Strength** — Indicador visual de força da senha com 4 níveis

### 🔑 Autenticação e Segurança

- **Login/Registro** — JWT com refresh token, roles hierárquicos
- **Sessões Concorrentes** — Máximo de 2 sessões ativas por usuário (evicção FIFO)
- **Reset de Senha** — Fluxo self-service: solicita link → e-mail com template profissional → redefine com token (1h de validade)
- **Rate Limiting** — Sliding window in-memory por IP, sem dependência externa
- **Audit Log** — Registro de ações críticas (quem, o quê, quando, de onde) — falhas nunca bloqueiam o fluxo
- **Gate de Assinatura** — Bloqueio de acesso ao painel para empresas sem plano ativo
- **Alteração de Senha** — Modal in-app para troca de senha autenticada

### 📄 Proposta Comercial em PDF

- **Layout Profissional** — Gerado server-side via ReportLab com identidade visual da empresa (logo, cores, endereço, contatos)
- **Seções** — Capa com dados da empresa, dados do cliente, resumo da simulação, tabela de parcelamento Price, disclaimer legal, rodapé com contatos
- **E-mail Comercial** — Exibição do e-mail comercial (separado do e-mail de login) no PDF e nos e-mails
- **Geração em Memória** — BytesIO sem gravação em disco, otimizado para performance
- **Envio via E-mail** — Anexo base64 via Resend API com template HTML customizado

---

## 📁 Estrutura do Projeto

```
solarys-digital/
├── backend/                          # API FastAPI
│   ├── app/
│   │   ├── main.py                   # Entry point + CORS + lifespan
│   │   ├── config.py                 # Settings (Pydantic BaseSettings)
│   │   ├── database.py               # Connection pool asyncpg
│   │   ├── middleware/
│   │   │   ├── auth.py               # JWT decode + role guards + session validation
│   │   │   └── rate_limit.py         # Sliding window rate limiter in-memory
│   │   ├── models/                   # Pydantic schemas (16 módulos)
│   │   │   ├── configuracoes.py      # Config empresa/estado
│   │   │   ├── configuracao.py       # Config global
│   │   │   ├── empresa.py            # Schemas de empresa
│   │   │   ├── empresa_config.py     # Config institucional de empresa
│   │   │   ├── lead.py               # SimulacaoPayload, SimulacaoResult
│   │   │   ├── painel.py             # Schemas do painel da empresa
│   │   │   ├── instituicao.py        # Instituições financeiras
│   │   │   ├── kits.py               # Kits fotovoltaicos
│   │   │   ├── planos.py             # Planos de assinatura
│   │   │   ├── registro.py           # Schemas de registro self-service
│   │   │   ├── parcelamento.py       # Parcelas e financiamento
│   │   │   ├── trial.py              # Trial e períodos de teste
│   │   │   ├── usuarios.py           # Gestão de usuários
│   │   │   ├── user.py               # Schema base de user
│   │   │   └── auth.py               # Schemas de autenticação
│   │   ├── routers/                  # Endpoints (12 módulos)
│   │   │   ├── auth.py               # Login, registro, refresh, logout
│   │   │   ├── password_reset.py     # Forgot/reset password (self-service)
│   │   │   ├── registro.py           # Cadastro self-service de empresa
│   │   │   ├── leads.py              # Simulação pública + CRM
│   │   │   ├── master.py             # Admin global
│   │   │   ├── painel.py             # Painel da empresa
│   │   │   ├── painel_configuracoes.py # Config de cálculo
│   │   │   ├── instituicoes.py       # Bancos parceiros
│   │   │   ├── painel_kits.py        # CRUD de kits
│   │   │   ├── stripe_billing.py     # Checkout e webhooks
│   │   │   ├── suporte.py            # Tickets de suporte
│   │   │   └── empresas.py           # Dados públicos da empresa
│   │   └── services/                 # Lógica de negócio (14 módulos)
│   │       ├── calculo.py            # Motor de cálculo solar
│   │       ├── config_resolver.py    # Cascata empresa > global
│   │       ├── kits.py               # Seleção de kits
│   │       ├── pdf.py                # Geração de PDF ReportLab (93KB)
│   │       ├── email.py              # Templates e envio Resend
│   │       ├── parcelamento.py       # Tabela Price por instituição
│   │       ├── stripe_service.py     # Checkout, webhooks, trials
│   │       ├── exportacao.py         # Exportação Excel (openpyxl)
│   │       ├── round_robin.py        # Atribuição de leads
│   │       ├── trial_service.py      # Controle de período trial
│   │       ├── registro_service.py   # Cadastro self-service + reCAPTCHA
│   │       ├── session_service.py    # Sessões concorrentes (FIFO)
│   │       ├── audit.py              # Audit log de ações críticas
│   │       └── tasks.py              # Cron jobs (verificar trials)
│   ├── tests/                        # Testes unitários (pytest)
│   ├── migrations/                   # Scripts SQL de migração
│   ├── requirements.txt              # Dependências Python
│   ├── Procfile                      # Deploy Railway
│   └── runtime.txt                   # Python 3.12.3
│
├── frontend/                         # SPA React
│   ├── src/
│   │   ├── App.tsx                   # Root component
│   │   ├── main.tsx                  # Entry point
│   │   ├── routes/
│   │   │   └── AppRouter.tsx         # Roteamento com guards
│   │   ├── context/
│   │   │   ├── AuthContext.tsx        # Autenticação global
│   │   │   └── SimulacaoContext.tsx   # Estado da simulação
│   │   ├── schemas/
│   │   │   └── registroSchema.ts     # Validação Zod do registro (masks)
│   │   ├── hooks/                    # Custom hooks (9)
│   │   │   ├── useCompany.ts         # Dados da empresa logada
│   │   │   ├── useConfigEmpresa.ts   # Config de cálculo
│   │   │   ├── useKits.ts            # CRUD de kits
│   │   │   ├── useUsuarios.ts        # Gestão de usuários
│   │   │   ├── useExportacao.ts      # Export Excel
│   │   │   ├── useConfig.ts          # Config global
│   │   │   ├── useDebounce.ts        # Debounce utility
│   │   │   ├── useParentResize.ts    # Resize observer
│   │   │   └── useTrialCountdown.ts  # Countdown de trial
│   │   ├── services/                 # API clients (13 módulos)
│   │   │   ├── api.ts                # Axios instance + interceptors
│   │   │   ├── authService.ts        # Login/registro
│   │   │   ├── registroService.ts    # Cadastro self-service
│   │   │   ├── simuladorService.ts   # Simulação pública
│   │   │   ├── painelService.ts      # Operações do painel
│   │   │   ├── masterService.ts      # Operações do master
│   │   │   ├── configCalculoService.ts # Configurações
│   │   │   ├── instituicaoService.ts # Instituições
│   │   │   ├── leadService.ts        # Leads
│   │   │   ├── stripeService.ts      # Billing
│   │   │   ├── empresaService.ts     # Dados de empresa
│   │   │   ├── usuarioService.ts     # Gestão de usuários
│   │   │   └── suporteService.ts     # Suporte/tickets
│   │   ├── utils/                    # Utilitários (3 módulos)
│   │   │   ├── constants.ts          # Constantes globais
│   │   │   ├── formatters.ts         # Formatadores (moeda, data, etc.)
│   │   │   └── errorHandler.ts       # Handler de erros Axios
│   │   ├── pages/
│   │   │   ├── public/               # 11 páginas
│   │   │   │   ├── LandingPage.tsx       # Landing + Simulador
│   │   │   │   ├── ResultadoPage.tsx     # Resultado da simulação
│   │   │   │   ├── ResultadoSimulacao.tsx # Detalhes do resultado
│   │   │   │   ├── Confirmacao.tsx       # Confirmação pós-simulação
│   │   │   │   ├── LoginPage.tsx         # Login
│   │   │   │   ├── RegistroEmpresa.tsx   # Cadastro self-service (multi-step)
│   │   │   │   ├── VerificarEmail.tsx    # Verificação de e-mail
│   │   │   │   ├── EsqueciSenha.tsx      # Solicitar reset de senha
│   │   │   │   ├── RedefinirSenha.tsx    # Redefinir senha com token
│   │   │   │   ├── AssinaturaGate.tsx    # Gate de assinatura
│   │   │   │   └── ForbiddenPage.tsx     # Página 403
│   │   │   ├── painel/               # 13 páginas
│   │   │   │   ├── PainelDashboard.tsx       # Dashboard principal
│   │   │   │   ├── EssencialDashboard.tsx    # Dashboard essencial
│   │   │   │   ├── SemPlanoDashboard.tsx     # Dashboard sem plano
│   │   │   │   ├── LeadsList.tsx             # Listagem de leads
│   │   │   │   ├── LeadDetail.tsx            # Detalhes do lead
│   │   │   │   ├── SimuladorInterno.tsx      # Simulador interno
│   │   │   │   ├── PropostaRevisao.tsx       # Revisão de proposta
│   │   │   │   ├── PainelConfiguracoes.tsx   # Configurações completas
│   │   │   │   ├── KitsList.tsx              # Lista de kits
│   │   │   │   ├── UsuariosList.tsx          # Lista de usuários
│   │   │   │   ├── PainelSuporte.tsx         # Suporte/tickets
│   │   │   │   ├── Planos.tsx                # Planos e billing
│   │   │   │   └── TermosGestor.tsx          # Aceite de termos
│   │   │   └── master/               # 7 páginas
│   │   │       ├── MasterDashboard.tsx       # Dashboard consolidado
│   │   │       ├── EmpresasList.tsx          # Gestão de empresas
│   │   │       ├── EmpresaDetail.tsx         # Detalhes da empresa
│   │   │       ├── MasterLeadsList.tsx       # Leads globais
│   │   │       ├── ConfiguracoesGlobais.tsx  # Config global
│   │   │       ├── MasterSuporte.tsx         # Suporte global
│   │   │       └── MasterDesempenhoVendedores.tsx # Ranking
│   │   └── components/               # Componentes reutilizáveis
│   │       ├── ui/                   # shadcn/ui primitives
│   │       ├── layout/               # PainelLayout, MasterLayout, Sidebar, Header, ProtectedRoute
│   │       ├── forms/                # EmpresaForm, LeadForm, SelectEstado
│   │       ├── cards/                # Cards visuais
│   │       ├── leads/                # LeadHistorico
│   │       ├── configuracoes/        # InstituicoesConfig
│   │       ├── painel/               # KitModal, StatusDropdown, ModalMotivoPerde
│   │       ├── master/               # EmpresaStatusCards, ConfigEstadosTable, TrialModal
│   │       ├── sections/             # Seções de landing
│   │       └── ...                   # AlterarSenha, LeadStatusBadge, UsuarioModal, etc.
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

---

## 📋 Pré-requisitos

| Ferramenta | Versão Mínima | Uso |
|:-----------|:-------------:|:----|
| **Node.js** | 18+ | Frontend build e dev server |
| **npm** | 9+ | Gerenciador de pacotes frontend |
| **Python** | 3.12+ | Backend API |
| **pip** | 23+ | Gerenciador de pacotes backend |
| **PostgreSQL** | 15+ | Banco de dados (ou Supabase cloud) |
| **Git** | 2.40+ | Controle de versão |

---

## 🚀 Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/ghmata/Solarys_Digital.git
cd Solarys_Digital
```

### 2. Backend (API)

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar o ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
# Copie .env.example para .env e preencha as credenciais
cp .env.example .env

# Iniciar o servidor de desenvolvimento
python -m uvicorn app.main:app --reload --port 8000
```

> A API estará disponível em `http://localhost:8000`  
> Documentação Swagger: `http://localhost:8000/docs`  
> Health check: `http://localhost:8000/health`

### 3. Frontend (SPA)

```bash
cd frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
echo "VITE_API_URL=http://localhost:8000" > .env.local

# Iniciar o servidor de desenvolvimento
npm run dev
```

> O frontend estará disponível em `http://localhost:5173`

### 4. Build de Produção (Frontend)

```bash
cd frontend
npm run build    # TypeScript check + Vite build
npm run preview  # Prévia local do build
```

---

## 🔐 Variáveis de Ambiente

### Backend (`backend/.env`)

```env
# ─── Banco de Dados (obrigatório) ───
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres

# ─── Autenticação JWT (obrigatório) ───
JWT_SECRET=sua_chave_secreta_forte_aqui
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=43200

# ─── Supabase (obrigatório para Storage) ───
SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...

# ─── Resend — E-mails (obrigatório para propostas) ───
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=suporte@seudominio.com.br

# ─── Stripe — Billing (obrigatório para planos) ───
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxx

# ─── reCAPTCHA v3 (opcional, recomendado em produção) ───
RECAPTCHA_SECRET_KEY=6Le...xxx

# ─── Frontend URL (obrigatório para links em e-mails) ───
FRONTEND_URL=https://seudominio.com.br

# ─── CORS ───
ALLOWED_ORIGINS=http://localhost:5173,https://seudominio.com.br
```

### Frontend (`frontend/.env.local`)

```env
VITE_API_URL=http://localhost:8000
VITE_RECAPTCHA_SITE_KEY=6Le...xxx  # Opcional em dev
```

---

## 🌐 Rotas da API

### Autenticação (`/api/auth`)

| Método | Rota | Descrição | Acesso |
|:------:|:-----|:----------|:------:|
| `POST` | `/login` | Login com e-mail e senha | Público |
| `POST` | `/register` | Registro de nova empresa (admin) | Público |
| `POST` | `/refresh` | Renovar token JWT | Autenticado |
| `POST` | `/logout` | Logout (revoga sessão) | Autenticado |
| `POST` | `/forgot-password` | Solicitar link de reset de senha | Público |
| `POST` | `/reset-password` | Redefinir senha com token | Público |

### Registro Self-Service (`/api/registro`)

| Método | Rota | Descrição | Acesso |
|:------:|:-----|:----------|:------:|
| `POST` | `/registrar` | Cadastro de nova empresa (multi-step) | Público |
| `GET` | `/verificar-email` | Confirma token e cria empresa | Público |
| `GET` | `/verificar-disponibilidade` | Verifica e-mail/CNPJ em tempo real | Público |
| `POST` | `/reenviar-verificacao` | Reenvia link de verificação | Público |

### Leads — Simulação Pública (`/api/leads`)

| Método | Rota | Descrição | Acesso |
|:------:|:-----|:----------|:------:|
| `POST` | `/calcular` | Simulação solar completa | Público |
| `POST` | `/recalcular` | Recalcular com geração desejada | Público |
| `POST` | `/salvar-parcial` | Salvar lead parcial (formulário) | Público |
| `POST` | `/salvar` | Salvar lead completo + envio de e-mail | Público |

### Empresas — Dados Públicos (`/api/empresas`)

| Método | Rota | Descrição | Acesso |
|:------:|:-----|:----------|:------:|
| `GET` | `/:slug` | Dados públicos da empresa (logo, cores) | Público |

### Painel da Empresa (`/api/painel`)

| Método | Rota | Descrição | Acesso |
|:------:|:-----|:----------|:------:|
| `GET` | `/dashboard/stats` | Estatísticas do dashboard | Vendedor+ |
| `GET` | `/leads` | Listar leads da empresa | Vendedor+ |
| `GET` | `/leads/:id` | Detalhes de um lead | Vendedor+ |
| `PUT` | `/leads/:id/status` | Atualizar status do lead | Vendedor+ |
| `PUT` | `/leads/:id/recalcular` | Recálculo interno do simulador | Gestor+ |
| `GET` | `/leads/:id/pdf` | Download do PDF da proposta | Vendedor+ |
| `POST` | `/leads/:id/enviar-proposta` | Envio de proposta por e-mail | Vendedor+ |
| `GET` | `/minha-empresa` | Dados da empresa logada | Vendedor+ |
| `PUT` | `/minha-empresa` | Atualizar dados da empresa | Gestor+ |
| `GET` | `/usuarios` | Listar usuários da empresa | Gestor+ |
| `POST` | `/usuarios` | Criar usuário | Gestor+ |
| `GET` | `/leads/exportar` | Exportar leads em Excel | Gestor+ |

### Configurações de Cálculo (`/api/painel/configuracoes`)

| Método | Rota | Descrição | Acesso |
|:------:|:-----|:----------|:------:|
| `GET` | `/` | Config resolvida (empresa > global) | Vendedor+ |
| `PUT` | `/` | Salvar parâmetros de cálculo | Gestor+ |
| `GET` | `/estados` | Listar 27 estados com overrides | Vendedor+ |
| `PUT` | `/estados/:uf` | Override tarifa/HSP por estado | Vendedor+ |
| `DELETE` | `/estados/:uf` | Remover override (volta ao global) | Vendedor+ |
| `GET` | `/modo-simulador` | Modo simulador (kits/cálculo) | Gestor+ |
| `PUT` | `/modo-simulador` | Alterar modo simulador | Gestor+ |
| `GET` | `/institucional` | Dados institucionais da empresa | Gestor+ |
| `PUT` | `/institucional` | Salvar dados institucionais | Gestor+ |

### Instituições Financeiras (`/api/painel/instituicoes`)

| Método | Rota | Descrição | Acesso |
|:------:|:-----|:----------|:------:|
| `GET` | `/` | Listar instituições da empresa | Vendedor+ |
| `POST` | `/` | Criar instituição parceira | Gestor+ |
| `PUT` | `/:id` | Atualizar instituição | Gestor+ |
| `DELETE` | `/:id` | Remover instituição | Gestor+ |

### Kits Fotovoltaicos (`/api/painel/kits`)

| Método | Rota | Descrição | Acesso |
|:------:|:-----|:----------|:------:|
| `GET` | `/` | Listar kits da empresa | Vendedor+ |
| `POST` | `/` | Criar kit | Gestor+ |
| `PUT` | `/:id` | Atualizar kit | Gestor+ |
| `DELETE` | `/:id` | Remover kit | Gestor+ |

### Admin Master (`/api/master`)

| Método | Rota | Descrição | Acesso |
|:------:|:-----|:----------|:------:|
| `GET` | `/empresas` | Listar todas as empresas | Master |
| `POST` | `/empresas` | Criar empresa | Master |
| `PUT` | `/empresas/:id` | Atualizar empresa | Master |
| `GET` | `/dashboard` | Dashboard consolidado | Master |
| `GET` | `/leads` | Leads de todas as empresas | Master |
| `GET` | `/configuracoes-globais` | Config global de cálculo | Master |
| `PUT` | `/configuracoes-globais` | Atualizar config global | Master |

### Stripe Billing (`/api/billing`)

| Método | Rota | Descrição | Acesso |
|:------:|:-----|:----------|:------:|
| `POST` | `/create-checkout-session` | Criar sessão de checkout | Gestor+ |
| `POST` | `/webhook` | Webhook do Stripe | Stripe |
| `GET` | `/portal` | Portal de gerenciamento Stripe | Gestor+ |

### Suporte (`/api/suporte`)

| Método | Rota | Descrição | Acesso |
|:------:|:-----|:----------|:------:|
| `GET` | `/tickets` | Listar tickets | Autenticado |
| `POST` | `/tickets` | Criar ticket | Autenticado |
| `GET` | `/tickets/:id` | Detalhes do ticket | Autenticado |
| `POST` | `/tickets/:id/mensagens` | Enviar mensagem | Autenticado |

---

## 🗄️ Banco de Dados

### Modelo de Dados

O banco PostgreSQL (via Supabase) utiliza as seguintes tabelas principais:

| Tabela | Descrição |
|:-------|:----------|
| `empresas` | Cadastro de empresas + config White Label (logo, cores, slug, endereço, CEP, CNPJ, e-mail comercial) |
| `usuarios` / `users` | Usuários com roles: master, empresa, gestor, vendedor |
| `leads` | Leads capturados com dados de simulação e status CRM |
| `configuracoes_globais` | Parâmetros de cálculo globais (1 registro) |
| `configuracoes_empresa` | Overrides de cálculo por empresa |
| `configuracoes_estado` | Tarifa kWh e HSP médio por estado (27 registros) |
| `configuracoes_estado_empresa` | Override de tarifa/HSP por empresa×estado |
| `instituicoes` | Instituições financeiras parceiras |
| `kits` | Kits fotovoltaicos por empresa |
| `tickets` | Tickets de suporte empresa↔master |
| `ticket_mensagens` | Mensagens dentro de tickets |
| `planos` | Planos de assinatura com limites |
| `registros_pendentes` | Cadastros self-service aguardando verificação de e-mail |
| `registro_tentativas` | Audit log de tentativas de cadastro (rate limit) |
| `tokens_reset_senha` | Tokens de redefinição de senha (hash SHA-256) |
| `user_sessions` | Sessões ativas por usuário (controle de concorrência) |
| `aceites_lgpd` | Registro de aceites de termos/privacidade com IP e timestamp |
| `audit_log` | Log de ações críticas (actor, action, target, IP) |

### Row-Level Security (RLS)

Todas as tabelas sensíveis possuem políticas RLS ativas:

```sql
-- Exemplo: cada empresa só vê seus próprios leads
CREATE POLICY "empresa_own_leads" ON leads
  FOR ALL
  USING (empresa_id::text = current_setting('app.empresa_id', true));
```

O contexto RLS é configurado automaticamente pelo backend em cada request:

```python
await set_rls_context(conn, user_id=user["user_id"], role=user["role"], empresa_id=user["empresa_id"])
```

---

## ⚡ Motor de Cálculo Solar

### Pipeline de Cálculo (`calculo.py → calcular_tudo()`)

```
 1. Consumo (kWh)     ← valor_conta ÷ tarifa_kwh  (ou consumo informado)
 2. Sistema (kWp)     ← consumo ÷ (HSP × 30 × eficiência%)
 3. Qtd. Placas       ← ceil(kWp × 1000 ÷ potência_placa_wp)
 4. Área (m²)         ← qtd_placas × área_por_placa_m2
 5. Preço por kWp     ← tabela de 6 faixas escalonadas
 6. Valor Sistema     ← kWp × preço_por_kwp (R$)
 7. Economia Mensal   ← consumo × tarifa × percentual_compensação%
 8. Geração Mensal    ← kWp × HSP × 30 × eficiência% × fatores(orientação, inclinação)
 9. Entrada           ← modo fixo (R$) ou percentual (% do valor)
10. Valor à Vista     ← valor_sistema × (1 - desconto_avista%)
```

### 14 Parâmetros Configuráveis (por Empresa)

| # | Parâmetro | Tipo | Descrição |
|:-:|:----------|:----:|:----------|
| 1 | `eficiencia_percentual` | `float` | Eficiência do sistema (0–100%) |
| 2 | `potencia_placa_wp` | `int` | Potência da placa em Wp (ex: 550) |
| 3 | `percentual_compensacao` | `float` | % da conta compensado (0–100%) |
| 4 | `entrada_modo` | `enum` | `fixo` (R$) ou `percentual` (%) |
| 5 | `entrada_padrao` | `float` | Valor fixo de entrada (R$) |
| 6 | `entrada_percentual` | `float` | Percentual de entrada (0–100%) |
| 7 | `desconto_avista` | `float` | Desconto à vista (0–100%) |
| 8 | `area_por_placa_m2` | `float` | Área por placa (m²) |
| 9–14 | `preco_kwp_*` | `float` | 6 faixas de preço R$/kWp |

### Cascata de Configuração (`config_resolver.py`)

```
Empresa tem config → Usa config da empresa
Empresa sem config → Herda config global
Nenhuma              → RuntimeError (config global obrigatória)
```

---

## 🛡️ Segurança

### Autenticação e Autorização

| Camada | Mecanismo | Descrição |
|:-------|:----------|:----------|
| **JWT** | python-jose (HS256) | Tokens com claims: user_id, email, nome, role, empresa_id |
| **Roles** | Hierárquico | `master > empresa > gestor > vendedor` — cada nível herda permissões inferiores |
| **RLS** | PostgreSQL | Contexto `app.empresa_id` setado em cada request para isolamento de dados |
| **CORS** | Regex dinâmico | Origins configuráveis via variável de ambiente |

### Controle de Sessões Concorrentes

| Aspecto | Implementação |
|:--------|:--------------|
| **Limite** | Máximo 2 sessões ativas por usuário |
| **Evicção** | FIFO — sessão mais antiga é removida ao exceder limite |
| **Armazenamento** | Tabela `user_sessions` com hash SHA-256 do token |
| **Validação** | Middleware verifica existência da sessão em cada request autenticado |
| **Cleanup** | Lazy cleanup de sessões expiradas no momento do login |

### Rate Limiting

| Recurso | Limites |
|:--------|:--------|
| **Login** | Sliding window por IP (in-memory, sem Redis) |
| **Registro** | 5 tentativas/15min por IP/e-mail |
| **Reset de Senha** | 3 requests/hora por e-mail |
| **Reenvio de Verificação** | 3 reenvios/hora por e-mail |

### Audit Log

Ações críticas são registradas na tabela `audit_log`:
- **Campos**: actor_id, actor_email, actor_role, action, target_type, target_id, details (JSONB), ip_address
- **Resiliência**: Exceções no audit nunca propagam — log and move on
- **Exemplos de ações**: `empresa.create`, `config.update_global`, `lead.status_change`

### Proteções no Cadastro Self-Service

| Proteção | Implementação |
|:---------|:--------------|
| **reCAPTCHA v3** | Score ≥ 0.5, bypass automático em dev se key não configurada |
| **Unicidade** | Verificação de e-mail e CNPJ em users + registros_pendentes |
| **Token de Verificação** | `secrets.token_urlsafe(48)`, expira em 48h |
| **Hashing de Senhas** | bcrypt via passlib antes de armazenar |
| **LGPD** | Aceites registrados com IP e User-Agent |

---

## 🔗 Integrações Externas

### Supabase

| Recurso | Uso |
|:--------|:----|
| **PostgreSQL** | Banco de dados principal com RLS |
| **Storage** | Upload e servir logos de empresas (bucket público) |
| **Auth** | Base de autenticação para RLS (service role key) |

### Resend

| Recurso | Uso |
|:--------|:----|
| **Proposta Comercial** | PDF como anexo em e-mail com template HTML customizado |
| **Verificação de E-mail** | Link de ativação para registro self-service |
| **Reset de Senha** | Link de redefinição com template profissional |
| **Notificação Interna** | Alerta de novo lead para a empresa |
| **Boas-Vindas** | E-mail de onboarding ao confirmar e-mail |

### Stripe

| Recurso | Uso |
|:--------|:----|
| **Checkout Sessions** | Pagamento de planos de assinatura |
| **Webhooks** | Atualização automática de status do plano |
| **Customer Portal** | Auto-gerenciamento de assinatura pelo cliente |
| **Trial Management** | Controle de período de teste (7 dias auto) com cron |
| **Customer Auto-Create** | Criação de Stripe Customer no registro self-service |

### ReportLab

| Recurso | Uso |
|:--------|:----|
| **Geração de PDF** | Proposta comercial profissional em memória (BytesIO, ~93KB de lógica) |
| **Brand Dinâmica** | Logo, cores, endereço, telefone e dados da empresa no PDF |
| **Tabela Price** | Parcelamento financeiro com juros compostos |
| **Capa** | Cover page com identidade visual completa da empresa |

### Google reCAPTCHA v3

| Recurso | Uso |
|:--------|:----|
| **Verificação Anti-Bot** | Score-based validation no cadastro self-service |
| **Dev Mode** | Bypass automático quando `RECAPTCHA_SECRET_KEY` não configurada |

---

## 🧪 Testes

### Backend (pytest)

```bash
cd backend
python -m pytest tests/ -v
```

| Arquivo | Escopo |
|:--------|:-------|
| `test_calculo.py` | Motor de cálculo solar (14 cenários) |
| `test_kits.py` | Seleção e resultado de kits |
| `test_simulacao_publica.py` | Endpoint público `/calcular` |
| `test_leads_permissoes.py` | RBAC e permissões de leads |
| `test_round_robin.py` | Atribuição cíclica de vendedores |
| `test_painel_kits.py` | CRUD de kits via API |
| `test_registros_pendentes.py` | Fluxo de registro self-service |
| `test_validacao_registro.py` | Validação de dados do registro |

### Frontend (Playwright E2E)

```bash
cd frontend
npm run test:e2e           # Todos os testes
npm run test:e2e:headed    # Com navegador visível
npm run test:e2e:ui        # Interface visual do Playwright
npm run test:e2e:report    # Ver relatório HTML
npm run test:e2e:ci        # Modo CI com reporter GitHub
```

Scripts de teste organizados por bloco funcional:

```bash
npm run test:e2e:bloco2    # Autenticação
npm run test:e2e:bloco3    # Multi-tenant
npm run test:e2e:bloco5    # Equipe (usuários)
npm run test:e2e:bloco6    # Leads
npm run test:e2e:bloco7    # Dashboard
npm run test:e2e:bloco8    # Mobile responsiveness
```

### Frontend (Vitest — Testes Unitários)

```bash
cd frontend
npx vitest run             # Execução única
npx vitest                 # Watch mode
```

---

## 🚢 Deploy

### Backend (Railway)

O backend utiliza **Railway** para deploy com o seguinte `Procfile`:

```
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

**Passos:**
1. Conecte o repositório ao Railway
2. Configure as variáveis de ambiente no dashboard (incluindo `FRONTEND_URL` para links em e-mails)
3. O Railway detecta o `Procfile` e faz deploy automático

### Frontend (Vercel / Netlify)

```bash
# Build command
npm run build

# Output directory
dist/
```

**Passos:**
1. Conecte o repositório à plataforma de deploy
2. Configure `VITE_API_URL` apontando para o backend em produção
3. Configure `VITE_RECAPTCHA_SITE_KEY` para proteção anti-bot
4. Build command: `npm run build` | Output: `dist/`

---

## 👥 Autores

**Solarys Digital Team & Gabriel Mata Dev** — 2026

---

<p align="center">
  <sub>Feito com ☀️ para democratizar a energia solar no Brasil.</sub>
</p>
