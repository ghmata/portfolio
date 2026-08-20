<p align="center">
  <img src="https://img.shields.io/badge/Version-2.0.0-blue?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Gemini_AI-Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</p>

<h1 align="center">🧠 DocMind AI — v2.0</h1>

<p align="center">
  <strong>Plataforma de Inteligência Documental powered by Google Gemini AI</strong><br/>
  Transforme documentos em insights acionáveis — análise, comparação e relatórios automáticos com IA generativa.
</p>

---

## 📑 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura do Sistema](#-arquitetura-do-sistema)
- [Tech Stack Detalhada](#-tech-stack-detalhada)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Modelo de Dados](#-modelo-de-dados)
- [Referência da API](#-referência-da-api)
- [Camada de Serviços](#-camada-de-serviços)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Executando Localmente](#-executando-localmente)
- [Deploy em Produção](#-deploy-em-produção)
- [Segurança](#-segurança)
- [Performance e Limites Operacionais](#-performance-e-limites-operacionais)
- [Testes e Troubleshooting](#-testes-e-troubleshooting)
- [Roadmap](#-roadmap)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 🌟 Visão Geral

O **DocMind AI** é uma plataforma full-stack de análise documental inteligente que utiliza o modelo **Google Gemini** para transformar documentos brutos (PDF, CSV, Excel, JSON, TXT) em relatórios estruturados com insights acionáveis.

O sistema oferece duas operações principais:

| Operação | Descrição |
|---|---|
| **Análise Individual** | Processa um documento único e gera resumos executivos, extração de entidades, insights SWOT e detecção de sentimento. |
| **Comparação Cruzada** | Recebe de 2 a 5 documentos, gera uma matriz de comparação por critérios ponderados, ranking automático e recomendação final. |

O backend expõe uma API REST versionada (`/api/v1/`) via **FastAPI**, o frontend é uma SPA em **Next.js 16 + React 19** com design glassmorphism dark-mode, e a persistência é feita no **Supabase (PostgreSQL)**.

---

## ✨ Funcionalidades

### Core

- 📤 **Upload Multi-Arquivo** — Upload simultâneo de até 5 arquivos via drag-and-drop (react-dropzone) com barra de progresso em tempo real.
- 🤖 **Análise com IA** — Processamento por Google Gemini com prompts estruturados que retornam JSON tipado (resumo, key_points, insights SWOT, entidades, sentimento).
- ⚖️ **Comparação Inteligente** — Comparação cruzada de 2–5 documentos com matriz de pontuação, ranking automático e recomendação fundamentada.
- 📋 **Histórico de Relatórios** — Lista paginada de todos os relatórios com busca full-text, filtro por tipo (análise/comparação) e filtro de favoritos.
- 📥 **Exportação PDF** — Geração client-side de PDF formatado via jsPDF com header, metadados, conteúdo e rodapé paginado.
- ⭐ **Favoritos** — Toggle de favorito em relatórios via endpoint PATCH, com filtro dedicado no histórico.
- 🗑️ **Exclusão com Confirmação** — Remoção de relatórios com diálogo de confirmação e cascade delete automático no banco.
- 👁️ **Modal de Detalhes** — Visualização fullscreen do relatório com markdown renderizado (react-markdown), métricas de processamento e botão de cópia.

### Parser de Documentos

| Formato | Motor | Capacidades |
|---|---|---|
| **PDF** | PyPDF2/pypdf | Extração texto por página, contagem de palavras/caracteres, limite de 50 páginas |
| **CSV** | Pandas | Amostragem de até 1.000 linhas, estatísticas por coluna numérica (média, min, max, desvio padrão) |
| **XLSX/XLS** | Pandas + openpyxl | Mesma estratégia do CSV, suporte a ambos os formatos |
| **JSON** | stdlib json | Parse com truncagem automática de arrays grandes (>100 itens) |
| **TXT** | stdlib | Leitura com fallback de encoding (UTF-8 → Latin-1), limite de 500KB |

### UX & Design

- 🎨 **Design System Glassmorphism** — Interface dark-mode premium com backdrop-filter blur, bordas translúcidas e gradientes animados.
- 🔄 **Cold Start Handling** — Health check com retry automático (12 tentativas × 5s) e feedback visual de "servidor acordando" para deploy em free-tier.
- 📊 **Feedback em Tempo Real** — Indicadores de progresso de upload, status de análise, spinners e mensagens contextuais de erro.

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENTE (Browser)                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Next.js 16 + React 19 SPA                                         │    │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │    │
│  │  │ Landing  │  │   Auth   │  │ Dashboard │  │  Services/api.js │  │    │
│  │  │  Page    │  │   Page   │  │   Page    │  │  (Axios Client)  │  │    │
│  │  └──────────┘  └──────────┘  └───────────┘  └────────┬─────────┘  │    │
│  └──────────────────────────────────────────────────────│─────────────┘    │
└─────────────────────────────────────────────────────────│──────────────────┘
                                                          │ HTTP/HTTPS
                                                          │ (JSON + multipart/form-data)
┌─────────────────────────────────────────────────────────│──────────────────┐
│                           SERVIDOR (Render)             │                  │
│  ┌─────────────────────────────────────────────────────│─────────────┐    │
│  │  FastAPI 0.115 + Uvicorn                            │              │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────▼────────┐     │    │
│  │  │  CORS MW     │  │  Logging MW  │  │  Rotas /api/v1/*     │     │    │
│  │  └──────────────┘  └──────────────┘  └──┬────────┬──────┬───┘     │    │
│  │                                          │        │      │         │    │
│  │  ┌──────────────────┐  ┌────────────────▼┐ ┌─────▼──┐ ┌─▼──────┐ │    │
│  │  │  FileParser      │  │  GeminiClient   │ │Supabase│ │Pydantic│ │    │
│  │  │  (PDF/CSV/XLS/   │  │  (google-       │ │Client  │ │Models  │ │    │
│  │  │   JSON/TXT)      │  │   generativeai) │ │        │ │        │ │    │
│  │  └──────────────────┘  └────────┬────────┘ └───┬────┘ └────────┘ │    │
│  └─────────────────────────────────│──────────────│─────────────────-┘    │
└────────────────────────────────────│──────────────│────────────────────────┘
                                     │              │
                          ┌──────────▼──┐   ┌──────▼────────────────────────┐
                          │ Google      │   │  Supabase (PostgreSQL)        │
                          │ Gemini AI   │   │  ┌────────┐ ┌──────────────┐ │
                          │ API         │   │  │ users  │ │  documents   │ │
                          └─────────────┘   │  └────────┘ └──────────────┘ │
                                            │  ┌────────┐ ┌──────────────┐ │
                                            │  │reports │ │report_docs   │ │
                                            │  └────────┘ └──────────────┘ │
                                            └──────────────────────────────┘
```

### Fluxo de Dados — Análise de Documento

```
1. Usuário arrasta arquivo no Dropzone
       │
       ▼
2. Frontend envia POST /api/v1/documents/upload (multipart/form-data)
       │
       ▼
3. Backend valida: tamanho ≤ 10MB, formato suportado, duplicata (SHA-256)
       │
       ▼
4. FileParser extrai conteúdo conforme tipo (PDF→texto, CSV→amostra+stats...)
       │
       ▼
5. Conteúdo estruturado salvo como JSONB na tabela `documents`
       │
       ▼
6. Usuário clica "🔍 Analisar" → POST /api/v1/analyze
       │
       ▼
7. Backend recupera documento, extrai texto limpo e monta prompt estruturado
       │
       ▼
8. GeminiClient envia prompt → Google Gemini API → recebe JSON estruturado
       │
       ▼
9. Resultado salvo na tabela `reports` + vínculo em `report_documents`
       │
       ▼
10. Frontend renderiza resultado com react-markdown + métricas
```

---

## 🛠️ Tech Stack Detalhada

### Backend

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **Python** | 3.13+ | Runtime principal |
| **FastAPI** | 0.115.6 | Framework web assíncrono com validação automática e OpenAPI docs |
| **Uvicorn** | 0.34.0 | Servidor ASGI com hot-reload em desenvolvimento |
| **Pydantic** | v2 | Validação de entrada/saída e serialização de modelos de dados |
| **google-generativeai** | 0.8.3 | SDK oficial do Google Gemini para chamadas à API de IA generativa |
| **supabase-py** | 2.11.1 | Client Python para Supabase (PostgreSQL + Auth + Storage) |
| **PyPDF2** | 3.0.1 | Extração de texto de documentos PDF |
| **Pandas** | 2.2.3 | Parse e análise estatística de CSV/Excel |
| **openpyxl** | 3.1.5 | Motor de leitura para arquivos XLSX |
| **python-multipart** | 0.0.20 | Suporte a upload de arquivos via multipart/form-data |
| **python-dotenv** | 1.0.1 | Carregamento de variáveis de ambiente a partir de `.env` |
| **Loguru** | 0.7.3 | Logging estruturado com suporte a cores, rotação e formatação |

### Frontend

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **Next.js** | 16+ | Framework React com SSR, roteamento file-based e otimizações automáticas |
| **React** | 19+ | Biblioteca de UI com hooks e composição de componentes |
| **Axios** | 1.7.9 | HTTP client com interceptors, timeout configurável e tracking de progresso |
| **react-dropzone** | 14.3.5 | Componente de drag-and-drop para upload de arquivos |
| **react-markdown** | 9.0.1 | Renderização de markdown para exibição de relatórios |
| **jsPDF** | 3.0.4 | Geração de documentos PDF no client-side |
| **uuid** | 11.0.3 | Geração de tokens anônimos UUID v4 para identificação de sessão |
| **TypeScript** | 5+ | Tipagem estática (devDependency para types) |
| **Vanilla CSS** | — | Glassmorphism, gradientes, dark-mode e micro-animações sem framework CSS |

### Infraestrutura

| Componente | Serviço | Detalhes |
|---|---|---|
| **Banco de Dados** | Supabase (PostgreSQL) | Hospedado em `sa-east-1` (São Paulo), extensões `uuid-ossp` e `pgcrypto` |
| **Backend Hosting** | Render | Free tier com cold start (~30-60s), deploy via GitHub |
| **Frontend Hosting** | Vercel | Deploy automático via integração com repositório Git |

---

## 📁 Estrutura do Projeto

```
docmind-2.0/
│
├── backend/                          # API REST (FastAPI)
│   ├── main.py                       # App principal: rotas, middlewares, modelos Pydantic
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── gemini_client.py          # GeminiClient: prompts estruturados, parse JSON, retry
│   │   ├── supabase_client.py        # SupabaseClient: singleton de conexão
│   │   └── file_parser.py            # FileParser: PDF, CSV, XLS, JSON, TXT com limites de RAM
│   ├── requirements.txt              # Dependências Python fixadas
│   ├── requirements-minimal.txt      # Dependências mínimas para ambientes restritos
│   ├── .env.example                  # Template de variáveis de ambiente
│   └── TROUBLESHOOTING_DEPS.md       # Guia de problemas com dependências
│
├── frontend/                         # SPA (Next.js 16)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── _app.js               # Entry point Next.js (importa globals.css)
│   │   │   ├── index.js              # Redirect → /landing
│   │   │   ├── landing.js            # Landing page com hero section e feature cards
│   │   │   ├── auth.js               # Página de Login/Cadastro e acesso como convidado
│   │   │   └── dashboard.js          # Dashboard principal: upload, análise, comparação, histórico
│   │   ├── services/
│   │   │   └── api.js                # Axios client com interceptors, health check, gestão de token
│   │   └── styles/
│   │       └── globals.css           # Reset, scrollbar, markdown styling, animações
│   ├── styles/
│   │   └── globals.css               # CSS global adicional
│   ├── next.config.js                # Config Next.js: env, headers de segurança, compressão
│   ├── package.json                  # Dependências Node.js
│   ├── package-lock.json
│   └── .env.local.example            # Template de variáveis do frontend
│
├── database/                         # Persistência
│   ├── setup.sql                     # Script DDL completo: tabelas, índices, triggers, functions
│   ├── README.md                     # Guia passo-a-passo de configuração do Supabase
│   └── migrations/                   # Diretório para migrações incrementais (vazio)
│
├── vercel.json                       # Config de deploy Vercel (static build)
├── .gitignore                        # Padrões de exclusão (venv, node_modules, .env, etc.)
│
├── GUIA_EXECUCAO.md                  # Guia detalhado de execução local
├── EXEMPLOS_PROMPTS.md               # Exemplos de prompts para análise e comparação
├── ROADMAP_PREMIUM.md                # Roadmap de features futuras (Fases 1–3)
├── PROMPT_IMPLEMENTACAO.md           # Prompt de referência para implementação
├── DEBUG_HISTORICO.md                 # Histórico de debugging
├── GIT_GUIA.md                       # Guia de uso do Git para o projeto
└── README.md                         # Este arquivo
```

---

## 🗄️ Modelo de Dados

### Diagrama Entidade-Relacionamento

```
┌──────────────────────┐       ┌───────────────────────────┐
│        users          │       │        documents           │
├──────────────────────┤       ├───────────────────────────┤
│ id (PK, UUID)        │◄──┐   │ id (PK, UUID)              │
│ anonymous_token (UQ)  │   │   │ user_id (FK → users.id)    │
│ created_at            │   ├──►│ original_filename           │
│ last_active_at        │   │   │ file_type                   │
│ preferences (JSONB)   │   │   │ file_size_bytes             │
└──────────────────────┘   │   │ content_hash                │
                            │   │ extracted_content (JSONB)   │
                            │   │ extraction_status           │
                            │   │ created_at                  │
                            │   │ expires_at                  │
                            │   └────────────┬──────────────┘
                            │                │
                            │   ┌────────────▼──────────────┐
                            │   │    report_documents         │
                            │   ├───────────────────────────┤
                            │   │ id (PK, UUID)              │
                            │   │ report_id (FK → reports.id)│
                            │   │ document_id (FK → docs.id) │
                            │   │ document_order             │
                            │   └────────────▲──────────────┘
                            │                │
                            │   ┌────────────┴──────────────┐
                            │   │        reports              │
                            │   ├───────────────────────────┤
                            └──►│ id (PK, UUID)              │
                                │ user_id (FK → users.id)    │
                                │ report_type                │
                                │ title                      │
                                │ prompt_used                │
                                │ analysis_result (JSONB)    │
                                │ markdown_output            │
                                │ tokens_used                │
                                │ processing_time_ms         │
                                │ is_favorite                │
                                │ created_at                 │
                                └───────────────────────────┘
```

### Detalhamento das Tabelas

#### `users`

| Coluna | Tipo | Constraints | Descrição |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Identificador único |
| `anonymous_token` | TEXT | UNIQUE, NOT NULL, regex `^[a-zA-Z0-9_-]{32,64}$` | Token de sessão anônima gerado no frontend |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Data de criação |
| `last_active_at` | TIMESTAMPTZ | DEFAULT NOW() | Última atividade (atualizado por triggers) |
| `preferences` | JSONB | DEFAULT `{language, theme, default_analysis_type}` | Preferências do usuário |

#### `documents`

| Coluna | Tipo | Constraints | Descrição |
|---|---|---|---|
| `id` | UUID | PK | Identificador único |
| `user_id` | UUID | FK → users(id) ON DELETE CASCADE | Proprietário |
| `original_filename` | TEXT | NOT NULL | Nome original do arquivo |
| `file_type` | TEXT | CHECK IN (pdf, csv, xlsx, xls, json, txt) | Tipo do arquivo |
| `file_size_bytes` | INTEGER | CHECK ≤ 10.485.760 (10MB) | Tamanho em bytes |
| `content_hash` | TEXT | NOT NULL | SHA-256 para detecção de duplicatas |
| `extracted_content` | JSONB | NOT NULL, DEFAULT '{}' | Conteúdo extraído pelo FileParser |
| `extraction_status` | TEXT | CHECK IN (pending, processing, completed, failed, truncated) | Status da extração |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Data de criação |
| `expires_at` | TIMESTAMPTZ | DEFAULT NOW() + 7 days | Expiração automática |

#### `reports`

| Coluna | Tipo | Constraints | Descrição |
|---|---|---|---|
| `id` | UUID | PK | Identificador único |
| `user_id` | UUID | FK → users(id) ON DELETE CASCADE | Proprietário |
| `report_type` | TEXT | CHECK IN (analysis, comparison) | Tipo do relatório |
| `title` | TEXT | NOT NULL | Título gerado automaticamente |
| `prompt_used` | TEXT | NOT NULL | Prompt enviado à IA |
| `analysis_result` | JSONB | NOT NULL | Resultado estruturado da IA |
| `markdown_output` | TEXT | NOT NULL | Relatório formatado em Markdown |
| `tokens_used` | INTEGER | DEFAULT 0 | Tokens estimados consumidos |
| `processing_time_ms` | INTEGER | DEFAULT 0 | Tempo de processamento |
| `is_favorite` | BOOLEAN | DEFAULT false | Marcação de favorito |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Data de criação |

#### `report_documents` (Junction Table)

| Coluna | Tipo | Constraints | Descrição |
|---|---|---|---|
| `id` | UUID | PK | Identificador único |
| `report_id` | UUID | FK → reports(id) ON DELETE CASCADE | Relatório vinculado |
| `document_id` | UUID | FK → documents(id) ON DELETE CASCADE | Documento vinculado |
| `document_order` | INTEGER | DEFAULT 0 | Ordem do documento no relatório |

### Índices

- `idx_users_anonymous_token` — B-Tree em `users.anonymous_token`
- `idx_users_last_active` — B-Tree em `users.last_active_at`
- `idx_documents_user_id` — B-Tree em `documents.user_id`
- `idx_documents_created_at` — B-Tree DESC em `documents.created_at`
- `idx_documents_content_hash` — B-Tree em `documents.content_hash`
- `idx_documents_extracted_content` — GIN em `documents.extracted_content` (jsonb_path_ops)
- `idx_reports_user_id` / `_created_at` / `_type` — B-Tree em `reports`
- `idx_reports_analysis_result` — GIN em `reports.analysis_result` (jsonb_path_ops)

### Triggers e Functions

| Elemento | Finalidade |
|---|---|
| `update_user_last_active()` | Trigger que atualiza `users.last_active_at` ao inserir em `documents` ou `reports` |
| `cleanup_expired_documents()` | Function que remove documentos com `expires_at < NOW()` |

---

## 🔌 Referência da API

**Base URL:** `http://localhost:8000` (dev) / `https://docmind-api.onrender.com` (prod)

### Health Check

```http
GET  /health
POST /health
```

**Response 200:**
```json
{
  "status": "healthy",
  "version": "2.0.0",
  "timestamp": "2026-04-05T20:00:00Z",
  "services": {
    "database": "connected",
    "gemini_api": "available"
  },
  "cold_start": false
}
```

---

### Usuários

#### Criar/Recuperar Usuário Anônimo

```http
POST /api/v1/users/anonymous
Content-Type: application/json

{
  "anonymous_token": "abc123def456...",  // opcional
  "preferences": {                        // opcional
    "language": "pt-BR",
    "theme": "dark"
  }
}
```

**Response 200 (existente) / 201 (novo):**
```json
{
  "user_id": "uuid",
  "anonymous_token": "...",
  "preferences": {},
  "stats": {
    "documents_count": 5,
    "reports_count": 3,
    "storage_used_bytes": 0
  },
  "created_at": "...",
  "last_active_at": "..."
}
```

---

### Upload de Documentos

```http
POST /api/v1/documents/upload
Content-Type: multipart/form-data

files: [arquivo1.pdf, arquivo2.csv]
anonymous_token: "abc123def456..."
```

**Response 200 (sucesso) / 207 (parcial):**
```json
{
  "uploaded": [
    {
      "document_id": "uuid",
      "original_filename": "currículo.pdf",
      "file_type": "pdf",
      "file_size_bytes": 245760,
      "extraction_status": "completed",
      "extracted_preview": "João Silva — Desenvolvedor Senior...",
      "content_stats": {
        "pages": 3,
        "rows": null
      }
    }
  ],
  "errors": [],
  "total_processing_time_ms": 1200
}
```

---

### Análise de Documento

```http
POST /api/v1/analyze
Content-Type: application/json

{
  "anonymous_token": "...",
  "document_id": "uuid",
  "analysis_type": "summary",       // "summary" | "insights" | "entities" | "custom"
  "custom_prompt": null,             // usado quando analysis_type = "custom"
  "output_format": "markdown",
  "language": "pt-BR"
}
```

**Response 200:**
```json
{
  "report_id": "uuid",
  "report_type": "analysis",
  "title": "Análise: currículo.pdf",
  "analysis_result": {
    "summary": "...",
    "key_points": ["...", "..."],
    "insights": [{"type": "strength", "description": "..."}],
    "entities": {"technologies": [], "companies": [], "dates": [], "values": []},
    "sentiment": "professional",
    "confidence_score": 0.92
  },
  "markdown_output": "# Análise: currículo.pdf\n\n## Resumo\n...",
  "tokens_used": 4500,
  "processing_time_ms": 3200,
  "created_at": "..."
}
```

---

### Comparação de Documentos

```http
POST /api/v1/compare
Content-Type: application/json

{
  "anonymous_token": "...",
  "document_ids": ["uuid1", "uuid2"],  // min: 2, max: 5
  "comparison_type": "ranking",
  "custom_prompt": "Compare estes currículos para vaga de Tech Lead",
  "comparison_criteria": [              // opcional
    {"name": "Experiência", "weight": 40},
    {"name": "Formação", "weight": 30},
    {"name": "Habilidades", "weight": 30}
  ],
  "output_format": "both",
  "language": "pt-BR"
}
```

**Response 200:**
```json
{
  "report_id": "uuid",
  "report_type": "comparison",
  "title": "Comparação: 2 documentos",
  "documents_compared": [
    {"document_id": "uuid1", "original_filename": "cv_1.pdf", "label": "Documento 1"}
  ],
  "analysis_result": {
    "comparison_matrix": [...],
    "ranking": [{"position": 1, "label": "...", "final_score": 8.5, "summary": "..."}],
    "similarities": ["..."],
    "differences": [{"aspect": "...", "details": "..."}],
    "recommendation": {"best_fit": "...", "reasoning": "...", "alternative": "..."}
  },
  "markdown_output": "...",
  "tokens_used": 8900,
  "processing_time_ms": 5400,
  "created_at": "..."
}
```

---

### Relatórios

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/v1/reports?anonymous_token=...&page=1&limit=10&report_type=analysis` | Lista relatórios (paginado) |
| `GET` | `/api/v1/reports/{report_id}?anonymous_token=...` | Obtém relatório específico |
| `DELETE` | `/api/v1/reports/{report_id}?anonymous_token=...` | Remove relatório |
| `PATCH` | `/api/v1/reports/{report_id}/favorite?anonymous_token=...&is_favorite=true` | Toggle favorito |

---

## ⚙️ Camada de Serviços

### `GeminiClient` (`backend/utils/gemini_client.py`)

Classe responsável pela integração com a API do Google Gemini.

| Método | Parâmetros | Retorno | Descrição |
|---|---|---|---|
| `analyze_document()` | filename, content, analysis_type, custom_prompt, language | `{result, tokens_used, processing_time_ms}` | Monta prompt com system instructions + dados do documento; faz parse de JSON da resposta removendo code blocks |
| `compare_documents()` | documents[], custom_prompt, criteria[], language | `{result, tokens_used, processing_time_ms}` | Constrói prompt com N documentos inline + critérios ponderados; retorna matriz + ranking + recomendação |

**Configuração do Modelo:**
- Model: `gemini-2.5-flash-exp` (configurável via `GEMINI_MODEL`)
- Temperature: `0.7` (configurável via `TEMPERATURE`)
- Top P: `0.95` | Top K: `40` | Max Output Tokens: `8192`

### `SupabaseClient` (`backend/utils/supabase_client.py`)

Client singleton que gerencia a conexão com o Supabase. Utiliza `service_role key` para acesso direto sem RLS.

### `FileParser` (`backend/utils/file_parser.py`)

Parser estático com limites de proteção de memória (otimizado para Render Free Tier — 512MB RAM).

| Limite | Valor | Aplicação |
|---|---|---|
| `MAX_PDF_PAGES` | 50 | Máximo de páginas extraídas por PDF |
| `MAX_CSV_ROWS` | 1.000 | Máximo de linhas carregadas por CSV/Excel |
| `MAX_TEXT_SIZE` | 500.000 chars | Máximo de caracteres por arquivo texto |

### `api.js` (`frontend/src/services/api.js`)

Client HTTP centralizado com Axios.

| Funcionalidade | Implementação |
|---|---|
| **Base URL dinâmica** | Production usa `NEXT_PUBLIC_API_URL`; development usa `localhost:8000` |
| **Timeout** | 2 min (geral), 3 min (comparação), 10s (health check por tentativa) |
| **Interceptors** | Request: injeta `X-Anonymous-Token` e `X-Request-ID`; Response: loga status e timing |
| **Token Management** | Gera UUID v4 sem hifens, persiste em `localStorage` |
| **Health Check** | 12 tentativas com intervalo de 5s, callback `onProgress` para feedback visual |

---

## 📋 Pré-requisitos

| Requisito | Versão Mínima | Verificação |
|---|---|---|
| **Node.js** | 18+ | `node --version` |
| **npm** | 9+ | `npm --version` |
| **Python** | 3.13+ | `python --version` |
| **pip** | 24+ | `pip --version` |
| **Git** | 2.0+ | `git --version` |
| **Conta Supabase** | Free Tier | [supabase.com](https://supabase.com) |
| **Chave API Gemini** | — | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |

---

## 🚀 Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/docmind-ai.git
cd docmind-ai
```

### 2. Configurar Banco de Dados (Supabase)

1. Crie um projeto no [Supabase](https://supabase.com) — região recomendada: **South America (São Paulo)** (`sa-east-1`)
2. Acesse **SQL Editor** → **New query**
3. Cole o conteúdo de `database/setup.sql` e execute (`Ctrl+Enter`)
4. Verifique em **Table Editor** que as 4 tabelas foram criadas: `users`, `documents`, `reports`, `report_documents`
5. Anote as credenciais em **Settings** → **API**:
   - `Project URL` → variável `SUPABASE_URL`
   - `service_role key` → variável `SUPABASE_KEY`

> ⚠️ **Importante:** Use a `service_role key` (secreta) apenas no backend. Nunca exponha no frontend.

### 3. Configurar Backend

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt
```

Criar arquivo `.env` a partir do template:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais (veja [Variáveis de Ambiente](#-variáveis-de-ambiente)).

### 4. Configurar Frontend

```bash
cd frontend

# Instalar dependências
npm install
```

Criar arquivo `.env.local` a partir do template:

```bash
cp .env.local.example .env.local
```

---

## 🔐 Variáveis de Ambiente

### Backend (`backend/.env`)

```env
# ─── Supabase ──────────────────────────────────────────
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...   # service_role key (SECRETA!)

# ─── Google Gemini AI ──────────────────────────────────
GEMINI_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-2.5-flash-exp                         # modelo de IA
TEMPERATURE=0.7                                           # criatividade (0.0–1.0)
MAX_TOKENS_PER_REQUEST=100000                             # limite de tokens por request

# ─── Aplicação ─────────────────────────────────────────
ENVIRONMENT=development                                   # development | production
HOST=0.0.0.0
PORT=8000

# ─── CORS ──────────────────────────────────────────────
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# ─── Limites de Upload ─────────────────────────────────
MAX_FILE_SIZE_MB=10                                       # tamanho máximo por arquivo
MAX_FILES_PER_UPLOAD=5                                    # máximo de arquivos simultâneos

# ─── Limites de Banco ─────────────────────────────────
MAX_DOCUMENTS_PER_USER=100
DOCUMENT_EXPIRY_DAYS=7
```

### Frontend (`frontend/.env.local`)

```env
# URL da API backend
NEXT_PUBLIC_API_URL=http://localhost:8000

# Produção (Render):
# NEXT_PUBLIC_API_URL=https://docmind-api.onrender.com
```

### Onde obter as chaves

| Chave | Onde obter | Tipo |
|---|---|---|
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) | API Key |
| `SUPABASE_URL` | Supabase → Settings → API → Project URL | URL |
| `SUPABASE_KEY` | Supabase → Settings → API → `service_role` (Reveal) | JWT Secret |

---

## ▶️ Executando Localmente

### Terminal 1 — Backend

```bash
cd backend
venv\Scripts\activate        # Windows
# source venv/bin/activate  # Linux/Mac

python main.py
```

O servidor FastAPI será iniciado em `http://localhost:8000` com hot-reload habilitado.

**Documentação interativa disponível em:**
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

A aplicação Next.js será iniciada em `http://localhost:3000`.

### Verificação Rápida

```bash
# Health check do backend
curl http://localhost:8000/health

# Resultado esperado:
# {"status":"healthy","version":"2.0.0",...}
```

---

## 🌐 Deploy em Produção

### Backend → Render

1. Crie um **Web Service** no [Render](https://render.com)
2. Conecte o repositório GitHub
3. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables:** todas do bloco [Backend](#backend-backendenv)
4. Deploy automático ao push na branch `main`

> ⚠️ **Free Tier:** O servidor entra em sleep após 15min de inatividade. O primeiro request pode levar ~30-60s (cold start). O frontend já implementa health check com retry automático.

### Frontend → Vercel

1. Importe o repositório no [Vercel](https://vercel.com)
2. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js
   - **Environment Variables:** `NEXT_PUBLIC_API_URL=https://docmind-api.onrender.com`
3. Deploy automático ao push na branch `main`

O arquivo `vercel.json` na raiz contém configuração alternativa para deploy estático se necessário.

---

## 🔒 Segurança

### Medidas Implementadas

| Camada | Mecanismo | Descrição |
|---|---|---|
| **Autenticação** | Token Anônimo | UUID v4 gerado no frontend, persistido em `localStorage`, validado em todas as rotas da API |
| **CORS** | Middleware FastAPI | Origens permitidas configuráveis via `CORS_ORIGINS`; wildcard em desenvolvimento |
| **Headers HTTP** | Next.js Headers | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` |
| **Validação** | Pydantic v2 | Validação estrita de tipos, ranges e formatos em todos os inputs da API |
| **Duplicatas** | SHA-256 Hash | Detecção de uploads duplicados por hash do conteúdo |
| **Limites** | FileParser | Proteção de memória: 50 páginas PDF, 1.000 linhas CSV, 500KB texto |
| **Upload** | Validação Server-side | Checagem de extensão, tamanho (≤10MB) e quantidade (≤5 arquivos) |
| **SQL Injection** | Supabase Client | Queries parametrizadas via SDK (sem SQL direto) |
| **Tracking** | Request Middleware | `X-Request-ID` e `X-Processing-Time-Ms` em todas as respostas |

### Boas Práticas Recomendadas (Produção)

- Substituir autenticação anônima por **Supabase Auth** com JWT real
- Habilitar **RLS (Row Level Security)** nas tabelas do Supabase
- Implementar **rate limiting** por IP/token
- Adicionar **criptografia em trânsito** (HTTPS) — já fornecido por Vercel/Render
- Remover wildcard (`*`) das origens CORS em produção

---

## ⚡ Performance e Limites Operacionais

| Parâmetro | Valor | Observação |
|---|---|---|
| Upload máximo por arquivo | 10 MB | Validado no backend e frontend |
| Arquivos simultâneos por upload | 5 | Configurável via `MAX_FILES_PER_UPLOAD` |
| Páginas PDF processadas | 50 | Documentos maiores são truncados |
| Linhas CSV/Excel processadas | 1.000 | Amostragem inteligente com estatísticas |
| Timeout de análise | 2 min | 3 min para comparações |
| Tokens máx. por resposta Gemini | 8.192 | Configurável no `GeminiClient` |
| Documentos por usuário | 100 | Configurável |
| Expiração de documentos | 7 dias | Cleanup via `cleanup_expired_documents()` |
| Cold start (Render Free) | ~30-60s | Health check com 12 retries × 5s |

---

## 🧪 Testes e Troubleshooting

### Teste Manual do Banco de Dados

```sql
-- Inserir usuário de teste
INSERT INTO users (anonymous_token) 
VALUES ('test_token_abc123def456ghi789jkl012mno345');

-- Verificar criação
SELECT * FROM users;

-- Limpar
DELETE FROM users WHERE anonymous_token = 'test_token_abc123def456ghi789jkl012mno345';

-- Limpar documentos expirados
SELECT cleanup_expired_documents();
```

### Problemas Comuns

| Problema | Causa Provável | Solução |
|---|---|---|
| Servidor não responde | Cold start do Render | Aguardar ~60s; frontend já faz retry automático |
| `422 Unprocessable Entity` | Validação Pydantic falhou | Verificar formato do body na documentação |
| `401 Token inválido` | Token não encontrado no banco | Limpar `localStorage` e recarregar |
| Upload falha silenciosamente | CORS bloqueado | Verificar `CORS_ORIGINS` no `.env` |
| `relation already exists` | Script SQL já executado | Ignorar ou dropar tabelas manualmente |
| Limite 50k linhas Supabase | Free tier excedido | Executar `SELECT cleanup_expired_documents()` |
| `GEMINI_API_KEY não definida` | `.env` ausente ou incorreto | Verificar arquivo `.env` e reiniciar servidor |

---

## 🗺️ Roadmap

### Fase 1 — Quick Wins ✅

- [x] Glassmorphism nos cards e modais
- [x] Exportação PDF profissional
- [x] Busca em tempo real no histórico
- [x] Filtros por tipo e favoritos
- [x] Modal "Ver Detalhes" com markdown renderizado
- [x] Sistema de exclusão com confirmação
- [x] Micro-animações suaves

### Fase 2 — Funcionalidades Core 🚧

- [ ] Templates de análise pré-definidos (jurídica, financeira, técnica)
- [ ] Dashboard com gráficos (Chart.js/Recharts)
- [ ] Pastas/Coleções para organização
- [ ] Layout responsivo mobile-first
- [ ] Toggle Dark/Light mode

### Fase 3 — Premium 📋

- [ ] Autenticação real (Supabase Auth com OAuth)
- [ ] Chat interativo com documentos
- [ ] Análise em lote (10-50 docs)
- [ ] Workspace compartilhado com convites
- [ ] Sistema de planos e pagamento (Stripe)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o repositório
2. **Crie** uma branch para sua feature:
   ```bash
   git checkout -b feature/MinhaFeature
   ```
3. **Commit** suas alterações com mensagens descritivas:
   ```bash
   git commit -m "feat: adiciona template de análise jurídica"
   ```
4. **Push** para sua branch:
   ```bash
   git push origin feature/MinhaFeature
   ```
5. Abra um **Pull Request** com descrição detalhada das mudanças

### Convenção de Commits

| Prefixo | Uso |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Documentação |
| `refactor:` | Refatoração sem mudança de comportamento |
| `style:` | Formatação, CSS |
| `test:` | Adição/modificação de testes |
| `chore:` | Configuração, build, CI |

---

## 📄 Licença

Este projeto é distribuído sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Gabriel**
Portfolio de Automações

---

<p align="center">
  <strong>⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!</strong>
</p>

<p align="center">
  <sub>DocMind AI v2.0 — Powered by Google Gemini AI • FastAPI • Next.js • Supabase</sub>
</p>
