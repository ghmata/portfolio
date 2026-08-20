<p align="center">
  <img src="https://img.shields.io/badge/PlanBel_2.0-Assistente_Pedagógico_IA-2563eb?style=for-the-badge&labelColor=1e3a8a" alt="PlanBel 2.0" />
</p>

<h1 align="center">📚 PlanBel 2.0</h1>

<p align="center">
  <strong>Assistente de Planejamento Pedagógico Inteligente com IA Generativa</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Flask-3.0+-000000?logo=flask&logoColor=white" alt="Flask" />
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Gemini_AI-3_Flash-4285F4?logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white" alt="PWA" />
  <img src="https://img.shields.io/badge/Python-3.13-3776AB?logo=python&logoColor=white" alt="Python" />
</p>

<p align="center">
  Plataforma web que utiliza <strong>Inteligência Artificial Generativa (Google Gemini)</strong> para criar planos de aula completos, materiais didáticos imprimíveis e jogos educativos — tudo alinhado à <strong>Base Nacional Comum Curricular (BNCC)</strong>.
</p>

---

## 📑 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Arquitetura do Sistema](#-arquitetura-do-sistema)
- [Stack Tecnológica](#-stack-tecnológica)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Backend — API Flask](#-backend--api-flask)
  - [Endpoints da API](#endpoints-da-api)
  - [Sistema de Prompts Modulares](#sistema-de-prompts-modulares)
  - [Módulo BNCC](#módulo-bncc)
  - [Engine de Jogos Educativos](#engine-de-jogos-educativos)
  - [Agentes de Validação (CrewAI)](#agentes-de-validação-crewai)
- [Frontend — React + Vite](#-frontend--react--vite)
  - [Páginas da Aplicação](#páginas-da-aplicação)
  - [Wizard de Criação (3 Etapas)](#wizard-de-criação-3-etapas)
  - [Gerenciamento de Estado](#gerenciamento-de-estado)
  - [Camada de Serviços](#camada-de-serviços)
  - [Exportação e Impressão](#exportação-e-impressão)
  - [Progressive Web App (PWA)](#progressive-web-app-pwa)
- [Modelagem de Dados (TypeScript)](#-modelagem-de-dados-typescript)
- [Configuração e Instalação](#-configuração-e-instalação)
- [Deploy e Produção](#-deploy-e-produção)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Licença](#-licença)

---

## 🔭 Visão Geral

O **PlanBel 2.0** é uma ferramenta SaaS voltada para professores da educação básica brasileira (Ensino Fundamental I, Fundamental II e Ensino Médio). Através de um fluxo guiado de 3 etapas (wizard), o docente configura os parâmetros da sua aula e a IA gera automaticamente:

1. **Plano de Aula Estruturado** — com introdução, desenvolvimento, fechamento, cronograma detalhado e competências BNCC.
2. **Material Didático Imprimível** — workbook/apostila em HTML pronto para impressão em A4 com questões progressivas e gabarito.
3. **Jogo Educativo Personalizado** — material de jogo imprimível (cartas, tabuleiros, quizzes) adaptado à faixa etária e ao conteúdo.

### Diferenciais Técnicos

| Diferencial | Descrição |
|---|---|
| **Prompts Modulares** | 13 módulos editáveis independentemente para refinar a qualidade da geração |
| **BNCC Integrada** | Base de habilidades BNCC real em JSON com busca contextual por disciplina e ano |
| **12 Tipos de Jogos** | Engine especializada com instruções de design por tipo (Bingo, Escape Room, Quiz, etc.) |
| **Adaptação por Idade** | Ludicidade, linguagem e design visual ajustados automaticamente por faixa etária |
| **PWA Mobile-First** | Instalável como app nativo em iOS/Android com cache offline |
| **PDF Profissional** | Geração de PDF com fontes UTF-8 (Roboto), layout diagramado e rodapé paginado |
| **Agentes de Validação** | Pipeline multi-agente CrewAI para auto-aprimoramento dos prompts |

---

## ✨ Funcionalidades Principais

### 📝 Geração de Planos de Aula
- Wizard guiado de 3 etapas com persistência em `localStorage`
- Suporte a múltiplas disciplinas simultâneas (interdisciplinar)
- 13 disciplinas suportadas (Matemática, Língua Portuguesa, Ciências, etc.)
- 3 segmentos educacionais: Fundamental I, Fundamental II e Ensino Médio
- 8 metodologias ativas: Gamificação, PBL, Aula Invertida, STEAM, Design Thinking, etc.
- 10 tipos de avaliação: Rubrica, Quiz, Portfólio, Seminário, etc.
- Configuração de dinâmicas de interação (Individual, Duplas, Grupos)
- Objetivos de aprendizagem personalizados pelo professor
- Cronograma com soma exata dos minutos

### 📄 Material Imprimível (Workbook)
- HTML A4 otimizado para impressão (`@media print`)
- Design system profissional com paleta educacional
- Cabeçalho institucional com campos para aluno/data/turma
- Questões numeradas com badges visuais
- Áreas de resposta (linhas de caderno, caixas de desenho)
- Seção de autoavaliação
- Gabarito em página separada com orientações pedagógicas

### 🎮 Jogos Educativos (12 tipos)
- Sistema de Pontos e Recompensas
- Competições em Equipes
- Jogos Educativos (Tabuleiro/Cartas)
- Escape Room Pedagógico
- Quiz Interativo
- Jogo das 3 Pistas
- Show do Milhão Pedagógico
- Gartic Educativo
- Batata Quente com Perguntas
- Bingo de Conceitos
- Caça ao Tesouro Pedagógico
- Jogo Educativo Customizado

### 📊 Dashboard e Histórico
- Painel com estatísticas de planos gerados
- Histórico completo com busca e filtros
- Visualização detalhada de cada plano
- Exclusão individual de planos

### 📥 Exportação
- **PDF profissional** com fonte Roboto (UTF-8 completo)
- **HTML limpo** para impressão via `window.print()`
- Download direto de materiais e jogos
- Compatibilidade iOS Safari (fallback para download quando popup é bloqueado)

---

## 🏗 Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (PWA)                         │
│              React 18 + TypeScript + Vite + Tailwind        │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │Dashboard │  │  Wizard  │  │Resultado │  │ Histórico  │  │
│  │          │  │ 3 Steps  │  │  + PDF   │  │            │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬─────┘  │
│       │              │             │               │        │
│  ┌────┴──────────────┴─────────────┴───────────────┴─────┐  │
│  │              Camada de Serviços (api.ts)               │  │
│  │         fetch → Flask API (REST/JSON)                  │  │
│  └────────────────────────┬──────────────────────────────┘  │
└───────────────────────────┼─────────────────────────────────┘
                            │ HTTP (JSON)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (API REST)                        │
│               Flask 3.0 + Gunicorn + CORS                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   servidor.py                        │    │
│  │                                                     │    │
│  │  /api/gerar-plano-estruturado   (POST → JSON)       │    │
│  │  /api/gerar-material            (POST → HTML)       │    │
│  │  /api/gerar-jogo                (POST → HTML)       │    │
│  │  /api/health                    (GET  → status)     │    │
│  └──────────┬──────────────┬───────────────┬───────────┘    │
│             │              │               │                │
│  ┌──────────▼────┐  ┌──────▼──────┐  ┌────▼─────────────┐  │
│  │  Prompts      │  │   BNCC      │  │  Agents          │  │
│  │  Modulares    │  │   Module    │  │  (CrewAI)        │  │
│  │  (13 módulos) │  │  (JSON DB)  │  │  Validação       │  │
│  └──────────┬────┘  └──────┬──────┘  └──────────────────┘  │
│             │              │                                │
│  ┌──────────▼──────────────▼──────────────────────────┐     │
│  │              Google Gemini AI                       │     │
│  │       (gemini-3-flash-preview / gemini-3-pro)       │     │
│  │  System Instruction + User Prompt → JSON/HTML       │     │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠 Stack Tecnológica

### Backend

| Tecnologia | Versão | Função |
|---|---|---|
| **Python** | 3.13 | Runtime do servidor |
| **Flask** | ≥ 3.0 | Framework web (API REST) |
| **Flask-CORS** | ≥ 4.0 | Cross-Origin Resource Sharing |
| **google-generativeai** | ≥ 0.3 | SDK do Google Gemini AI |
| **python-dotenv** | ≥ 1.0 | Carregamento de variáveis `.env` |
| **Gunicorn** | ≥ 21.2 | Servidor WSGI para produção |
| **CrewAI** | — | Framework multi-agente para validação de prompts |

### Frontend

| Tecnologia | Versão | Função |
|---|---|---|
| **React** | 18.3 | Biblioteca de UI |
| **TypeScript** | 5.8 | Tipagem estática |
| **Vite** | 5.4 | Build tool + dev server |
| **TailwindCSS** | 3.4 | Framework CSS utility-first |
| **shadcn/ui** | — | Componentes Radix UI pré-estilizados |
| **React Router** | 6.30 | Roteamento SPA |
| **TanStack Query** | 5.83 | Cache e gestão de requisições assíncronas |
| **Zod** | 3.25 | Validação de schemas |
| **React Hook Form** | 7.61 | Gestão de formulários |
| **jsPDF** | 4.0 | Geração de PDF no navegador |
| **html2pdf.js** | 0.12 | Conversão HTML → PDF |
| **Lucide React** | 0.462 | Ícones SVG |
| **Sonner** | 1.7 | Notificações toast |
| **Recharts** | 2.15 | Gráficos para dashboard |
| **vite-plugin-pwa** | 1.2 | Service Worker + manifest PWA |

---

## 📂 Estrutura de Diretórios

```
Planbel 2.0/
├── backend/
│   ├── src/
│   │   ├── agents/
│   │   │   ├── __init__.py
│   │   │   └── validation_crew.py      # Agentes CrewAI para validação
│   │   ├── bncc/
│   │   │   ├── __init__.py             # Exportações do módulo BNCC
│   │   │   ├── bncc_data.py            # Funções de busca e contexto BNCC
│   │   │   ├── BNCC.pdf                # Documento oficial BNCC (referência)
│   │   │   ├── Dados_de_consulta_1.pdf # Dados complementares
│   │   │   ├── Dados_de_consulta_2.pdf # Dados complementares
│   │   │   ├── dados_consulta_1.txt    # Dados extraídos para consulta
│   │   │   └── dados_consulta_2.txt    # Dados extraídos para consulta
│   │   ├── prompts/
│   │   │   ├── __init__.py
│   │   │   ├── prompt_modular.py       # 13 módulos do prompt mestre
│   │   │   ├── prompt_mestre.py        # Prompt completo (monolítico)
│   │   │   ├── exemplos_nova_escola.md # Exemplos de referência
│   │   │   └── referencias_planos_aula.md
│   │   └── utils/                      # Utilitários gerais
│   ├── servidor.py                     # ★ Servidor principal Flask (1594 linhas)
│   ├── bncc_habilidades.json           # Base de habilidades BNCC (273KB)
│   ├── bncc_raw_text.txt               # Texto completo da BNCC (1.2MB)
│   ├── extract_bncc.py                 # Script de extração BNCC
│   ├── requirements.txt               # Dependências Python
│   ├── Dockerfile                      # Container Docker (Hugging Face Spaces)
│   ├── Procfile                        # Configuração Gunicorn
│   ├── runtime.txt                     # Versão Python (3.13.0)
│   ├── build.sh                        # Script de build
│   ├── .env.example                    # Template de variáveis de ambiente
│   └── teste_interface.html            # Interface de teste standalone
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                     # Componentes shadcn/ui (40+ componentes)
│   │   │   ├── wizard/
│   │   │   │   ├── Step1Contexto.tsx   # Etapa 1: Disciplina, Série, Conteúdo
│   │   │   │   ├── Step2Pedagogia.tsx  # Etapa 2: Objetivos, Dinâmicas, Avaliação
│   │   │   │   ├── Step3Refinamento.tsx# Etapa 3: Metodologia, Recursos, Gamificação
│   │   │   │   └── ProgressBar.tsx     # Barra de progresso visual
│   │   │   ├── dashboard/
│   │   │   │   ├── StatsCard.tsx       # Card de estatísticas
│   │   │   │   └── PlanCard.tsx        # Card de plano no histórico
│   │   │   ├── layout/
│   │   │   │   ├── Layout.tsx          # Layout wrapper com Outlet
│   │   │   │   ├── Sidebar.tsx         # Sidebar desktop
│   │   │   │   └── BottomNav.tsx       # Navegação mobile (bottom bar)
│   │   │   └── NavLink.tsx             # Link de navegação reutilizável
│   │   ├── contexts/
│   │   │   ├── WizardContext.tsx        # Estado do wizard com localStorage
│   │   │   ├── PlansContext.tsx         # Armazenamento de planos gerados
│   │   │   └── ThemeContext.tsx         # Toggle dark/light mode
│   │   ├── hooks/
│   │   │   ├── use-mobile.tsx          # Detecção de viewport mobile
│   │   │   └── use-toast.ts            # Hook de notificações
│   │   ├── services/
│   │   │   ├── api.ts                  # ★ Camada de comunicação com Flask
│   │   │   └── pdfGenerator.ts         # Geração de PDF profissional (jsPDF)
│   │   ├── types/
│   │   │   └── plan.ts                 # Interfaces TS + constantes de domínio
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx           # Página inicial com estatísticas
│   │   │   ├── NovoPlano.tsx           # Wizard de criação de plano
│   │   │   ├── Resultado.tsx           # Visualização do plano gerado
│   │   │   ├── Historico.tsx           # Lista de planos salvos
│   │   │   ├── Perfil.tsx              # Configurações do usuário
│   │   │   └── NotFound.tsx            # Página 404
│   │   ├── lib/                        # Utilitários (cn, etc.)
│   │   ├── App.tsx                     # Roteamento e providers
│   │   ├── main.tsx                    # Entry point
│   │   └── index.css                   # Estilos globais + Tailwind
│   ├── public/
│   │   └── pwa/                        # Ícones PWA (192x192, 512x512)
│   ├── components.json                 # Configuração shadcn
│   ├── tailwind.config.ts              # Configuração Tailwind
│   ├── vite.config.ts                  # Configuração Vite + PWA plugin
│   ├── tsconfig.json                   # Configuração TypeScript
│   └── package.json                    # Dependências e scripts
│
├── melhorias.md                        # Backlog de melhorias planejadas
└── README.md                           # ← Este arquivo
```

---

## 🐍 Backend — API Flask

O backend é um servidor **Flask** monolítico (`servidor.py`, ~1594 linhas) que centraliza toda a lógica de geração de conteúdo via Google Gemini AI.

### Endpoints da API

| Método | Endpoint | Descrição | Entrada | Saída |
|---|---|---|---|---|
| `GET` | `/api/health` | Health check do servidor | — | `{ status, model, api_key_set }` |
| `POST` | `/api/gerar-plano` | Gera plano em formato texto (markdown) | JSON com parâmetros da aula | `{ success, plano, tokens }` |
| `POST` | `/api/gerar-plano-estruturado` | Gera plano em formato JSON estruturado ★ | JSON completo do wizard | `{ success, plan, tokens }` |
| `POST` | `/api/gerar-material` | Gera material imprimível (workbook) | `{ plano: PlanoGerado }` | `{ success, html, titulo }` |
| `POST` | `/api/gerar-jogo` | Gera jogo educativo imprimível | `{ plano: PlanoGerado }` | `{ success, html, titulo, tipo_jogo }` |

#### Body do endpoint `/api/gerar-plano-estruturado`

```json
{
  "disciplinas": [{ "nome": "Matemática", "conteudos": ["Multiplicação"] }],
  "ano_escolar": "3º Ano",
  "segmento": "fundamental1",
  "tema": "Multiplicação com Material Concreto",
  "duracao": "50",
  "objetivos": "Compreender o conceito de multiplicação...",
  "dinamicas": ["duplas", "grupos"],
  "avaliacoes": ["Observação", "Quiz"],
  "metodologias": ["gamificacao", "pbl"],
  "recursos": ["Vídeos", "Jogos Digitais"],
  "materiais_disponiveis": ["Quadro/Lousa", "Material Impresso"],
  "materiais_custom": "Tampinhas de garrafa",
  "permitir_extras": true,
  "observacoes": "Turma com 25 alunos, 2 com TDAH",
  "gerar_material_impresso": true,
  "detalhes_gamificacao": "Jogo das 3 pistas"
}
```

#### Resposta do plano estruturado

```json
{
  "success": true,
  "plan": {
    "id": "uuid-v4",
    "titulo": "Título Criativo do Plano",
    "introducao": "Texto rico com roteiro do professor...",
    "desenvolvimento": "Texto rico com atividades detalhadas...",
    "fechamento": "Texto rico com verificação...",
    "cronograma": [
      { "etapa": "Abertura", "tempo": "10 min", "descricao": "..." }
    ],
    "competenciasBNCC": ["EF03MA07 - Descrição completa..."],
    "materiaisNecessarios": ["Material 1", "Material 2"],
    "materialImpresso": "Sugestão de atividade (opcional)",
    "serie": "3º Ano",
    "duracao": "50",
    "disciplinas": ["Matemática"],
    "status": "gerado",
    "createdAt": "2026-04-05T...",
    "metodologia": "gamificacao, pbl",
    "detalhesGamificacao": "Jogo das 3 pistas"
  },
  "tokens": 4500
}
```

---

### Sistema de Prompts Modulares

O coração do PlanBel é o **sistema de prompts modulares** (`src/prompts/prompt_modular.py`), que divide o mega-prompt em **13 módulos editáveis independentemente**:

| # | Módulo | Função |
|---|---|---|
| 1 | `MODULO_IDENTIDADE` | Papel e expertise do assistente (pedagogo com 20 anos de experiência) |
| 2 | `MODULO_REGRAS` | 8 regras obrigatórias (BNCC, verbos de ação, tempo exato, faixa etária) |
| 3 | `MODULO_METODOLOGIAS` | 14 metodologias ativas detalhadas (PBL, Gamificação, Sala Invertida...) |
| 4 | `MODULO_CONTEXTO_BNCC` | Template para inserção dinâmica do contexto BNCC |
| 5 | `MODULO_TAREFA` | Especificações da aula (disciplina, tema, duração, recursos) |
| 6 | `MODULO_FORMATO_CABECALHO` | Template do cabeçalho do plano |
| 7 | `MODULO_FORMATO_OBJETIVOS` | Seção de objetivos (geral + específicos mensuráveis) |
| 8 | `MODULO_FORMATO_BNCC` | Seção de alinhamento com competências BNCC |
| 9 | `MODULO_FORMATO_DESENVOLVIMENTO` | 4 momentos da aula com roteiro detalhado do professor |
| 10 | `MODULO_FORMATO_RECURSOS` | Lista de recursos didáticos |
| 11 | `MODULO_FORMATO_AVALIACAO` | Critérios de avaliação formativa |
| 12 | `MODULO_FORMATO_INCLUSAO` | Adaptações inclusivas (TDAH, visual, auditiva, avançados) |
| 13 | `MODULO_EXEMPLO` | Exemplo completo de plano (few-shot learning) |

#### Funções de montagem

```python
# Monta system prompt (identidade + regras)
montar_system_prompt() → str

# Monta formato de saída completo (módulos 6-12)
montar_formato_saida() → str

# Constrói o prompt final combinando todos os módulos
build_prompt_modular(
    disciplina, ano_escolar, tema, duracao_aulas,
    bncc_context, metodologia, recursos, observacoes
) → str
```

---

### Módulo BNCC

O módulo `src/bncc/` fornece consulta contextual à Base Nacional Comum Curricular:

- **`bncc_habilidades.json`** — Base de dados com ~273KB de habilidades BNCC indexadas por disciplina e ano.
- **`bncc_data.py`** — Funções de acesso:
  - `get_bncc_context(disciplina, ano_escolar)` — Retorna contexto BNCC filtrado
  - `get_habilidade_por_codigo(codigo)` — Busca habilidade por código (ex: `EF01MA14`)
  - `list_available_habilidades()` — Lista todas as habilidades disponíveis
  - `get_disciplinas_disponiveis()` — Lista disciplinas indexadas
  - `count_habilidades()` — Contagem total de habilidades

---

### Engine de Jogos Educativos

O `servidor.py` contém uma engine completa para geração de **12 tipos de jogos educativos** com:

- **Mapeamento de tipos** (`TIPOS_JOGOS_DETALHADOS`) — Configuração de cada tipo com nome, componentes e descrição
- **Detecção automática** (`_identificar_tipo_jogo()`) — Parsing do texto do frontend para identificar o tipo via mapeamento de palavras-chave
- **Prompts especializados por tipo** (`_get_instrucoes_especificas()`) — Instruções detalhadas de design e quantidade de componentes
- **Adaptação por faixa etária** — 5 níveis de ludicidade (máxima para 1º-3º ano até mínima para Ensino Médio)
- **Validação de HTML** (`_validar_html_basico()`, `_limpar_html()`) — Limpeza de markdown, reparo de HTML truncado, validação estrutural

#### Design System dos Materiais

Os materiais gerados seguem um design system consistente:

- **Paleta**: `#2563eb` (primária), `#0891b2` (secundária), `#fbbf24` (destaque)
- **Tipografia**: Segoe UI / Roboto, tamanho mínimo 11pt
- **Layout**: Formato A4 (210×297mm) com margens de 15-20mm
- **Impressão**: CSS `@media print` com `-webkit-print-color-adjust: exact`
- **Cartas**: 3 tamanhos padronizados (6×9cm, 7×10cm, 9×13cm)

---

### Agentes de Validação (CrewAI)

O módulo `src/agents/validation_crew.py` implementa um pipeline multi-agente para **auto-validação e refinamento** dos prompts:

| Agente | Papel | Função |
|---|---|---|
| **Gerador** | Professor Planejador | Gera plano usando o prompt candidato |
| **Avaliador** | Coordenador Pedagógico | Avalia em 5 critérios ponderados (0-10) |
| **Refinador** | Engenheiro de Prompts | Sugere melhorias concretas no prompt |

**Critérios de avaliação:**

| Critério | Peso |
|---|---|
| Alinhamento BNCC | 25% |
| Clareza Pedagógica | 25% |
| Estrutura Completa | 20% |
| Coerência Temporal | 15% |
| Aplicabilidade | 15% |

---

## ⚛️ Frontend — React + Vite

### Páginas da Aplicação

| Rota | Componente | Descrição |
|---|---|---|
| `/` | `Dashboard` | Painel principal com estatísticas e acesso rápido |
| `/novo` | `NovoPlano` | Wizard de 3 etapas para criação de plano |
| `/resultado/:id` | `Resultado` | Visualização completa do plano gerado com ações |
| `/historico` | `Historico` | Lista de planos salvos com busca |
| `/perfil` | `Perfil` | Configurações do usuário |
| `*` | `NotFound` | Página 404 |

### Wizard de Criação (3 Etapas)

```
┌─────────────────┐    ┌──────────────────┐    ┌───────────────────┐
│  ETAPA 1         │───▶│  ETAPA 2          │───▶│  ETAPA 3           │
│  Contexto        │    │  Pedagogia        │    │  Refinamento       │
│                  │    │                   │    │                    │
│  • Disciplina(s) │    │  • Objetivos      │    │  • Metodologias    │
│  • Segmento      │    │  • Duração        │    │  • Recursos        │
│  • Série/Ano     │    │  • Dinâmicas      │    │  • Materiais       │
│  • Conteúdos     │    │  • Avaliações     │    │  • Gamificação     │
│                  │    │                   │    │  • Observações     │
│                  │    │                   │    │  • Material Impres.│
└─────────────────┘    └──────────────────┘    └───────────────────┘
                                                         │
                                                         ▼
                                                  [GERAR PLANO]
                                                         │
                                                         ▼
                                               /resultado/:id
```

### Gerenciamento de Estado

O frontend utiliza **3 contextos React** para gerenciamento de estado:

| Contexto | Arquivo | Função | Persistência |
|---|---|---|---|
| `WizardProvider` | `WizardContext.tsx` | Dados do wizard (3 etapas) | `localStorage` (`planbel-wizard-data`) |
| `PlansProvider` | `PlansContext.tsx` | CRUD de planos gerados | `localStorage` (`planbel-plans`) |
| `ThemeProvider` | `ThemeContext.tsx` | Toggle dark/light mode | — |

### Camada de Serviços

O arquivo `services/api.ts` centraliza toda a comunicação com o backend:

```typescript
// Geração de plano com dados completos do wizard
generatePlan(wizardData: WizardData): Promise<GeneratedPlan>

// Verificação de saúde do backend
checkApiHealth(): Promise<boolean>

// Geração de material imprimível
generatePrintableMaterial(plan: GeneratedPlan): Promise<MaterialResponse>

// Geração de jogo educativo
generateGame(plan: GeneratedPlan): Promise<MaterialResponse>

// Abertura de HTML para impressão (com fallback iOS)
openHtmlForPrint(html: string, titulo: string): void

// Geração de HTML limpo para exportação
generateCleanPlanHTML(plan: GeneratedPlan): string
```

**Detecção automática de URL do backend:**

```typescript
const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  // Suporte automático a IP local para teste mobile
  if (window.location.hostname.match(/^192\.168\./)) {
    return `http://${window.location.hostname}:5000`;
  }
  return 'http://localhost:5000';
};
```

### Exportação e Impressão

O `pdfGenerator.ts` gera PDFs profissionais usando **jsPDF** com:

- Carregamento dinâmico da fonte **Roboto** (UTF-8 completo para acentos)
- Quebra de página inteligente (verifica espaço antes de renderizar)
- Seções coloridas: BNCC (verde), materiais (âmbar), títulos (azul)
- Rodapé automático com paginação ("Página X de Y")
- Nome de arquivo seguro com normalização Unicode

### Progressive Web App (PWA)

Configurado via `vite-plugin-pwa` com:

- **Service Worker** com `autoUpdate` e `skipWaiting`
- **Cache First** para Google Fonts (365 dias)
- **Manifest** completo com ícones 192×192 e 512×512
- **Standalone display** (sem barra de navegação)
- **Theme color**: `#2563eb` (azul educacional)

---

## 📐 Modelagem de Dados (TypeScript)

### `WizardData` — Dados de entrada do wizard

```typescript
interface WizardData {
  // Etapa 1
  disciplinas: Disciplina[];           // Múltiplas disciplinas com conteúdos
  serie: string;                       // "1º Ano", "6º Ano", "2ª Série"
  segmento: 'fundamental1' | 'fundamental2' | 'medio';

  // Etapa 2
  objetivos: string;                   // Objetivos definidos pelo professor
  duracao: '50' | '100' | '150';      // Minutos totais
  dinamicas: string[];                 // ['individual', 'duplas', 'grupos']
  avaliacoes: string[];                // ['Observação', 'Quiz', ...]

  // Etapa 3
  metodologias: string[];              // ['gamificacao', 'pbl', ...]
  recursos: string[];                  // Recursos digitais
  materiaisDisponiveis: string[];      // Materiais físicos
  materiaisCustom: string;             // Materiais adicionais (texto livre)
  detalhesGamificacao?: string;        // Tipo específico de gamificação
  permitirExtras: boolean;             // Permitir materiais extras
  observacoes: string;                 // Observações da turma
  gerarMaterialImpresso: boolean;      // Gerar sugestão de material
}
```

### `PlanoGerado` — Plano de aula gerado pela IA

```typescript
interface PlanoGerado {
  id: string;                          // UUID v4
  titulo: string;                      // Título criativo
  introducao: string;                  // Texto rico (≥ 250 palavras)
  desenvolvimento: string;            // Texto rico (≥ 500 palavras)
  fechamento: string;                  // Texto rico (≥ 200 palavras)
  cronograma: CronogramaItem[];        // Etapas com tempos exatos
  competenciasBNCC: string[];          // Códigos + descrições
  materiaisNecessarios: string[];      // Lista com quantidades
  materialImpresso?: string;           // Sugestão (opcional)
  serie: string;
  duracao: string;
  disciplinas: string[];
  status: 'gerado' | 'rascunho';
  createdAt: Date;
  metodologia?: string;
  detalhesGamificacao?: string;
}
```

---

## ⚙️ Configuração e Instalação

### Pré-requisitos

- **Python** 3.10+ (recomendado 3.13)
- **Node.js** 18+ e **npm** (ou **bun**)
- **Chave de API** do Google Gemini → [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 1. Clonar o repositório

```bash
git clone https://github.com/ghmata/Planbel.git
cd "Planbel 2.0"
```

### 2. Configurar o Backend

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar (Windows)
.\venv\Scripts\activate

# Ativar (macOS/Linux)
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com sua GEMINI_API_KEY
```

### 3. Configurar o Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente (opcional)
echo "VITE_API_URL=http://localhost:5000" > .env
```

### 4. Executar em Desenvolvimento

**Terminal 1 — Backend:**

```bash
cd backend
python servidor.py
# ★ Servidor Flask rodando em http://localhost:7860
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
# ★ Vite rodando em http://localhost:8080
```

---

## 🚀 Deploy e Produção

### Backend — Hugging Face Spaces (Docker)

O backend está configurado para deploy no **Hugging Face Spaces** com Docker:

```dockerfile
FROM python:3.10-slim
WORKDIR /app
ENV PORT=7860
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN useradd -m -u 1000 user
USER user
EXPOSE 7860
CMD ["gunicorn", "servidor:app", "--bind", "0.0.0.0:7860", "--timeout", "120"]
```

### Backend — Alternativas

**Render / Railway / Fly.io:**

```bash
# Usar Procfile
web: gunicorn servidor:app --timeout 120 --keep-alive 5 --log-level info
```

### Frontend — Build de Produção

```bash
cd frontend
npm run build
# Output em ./dist
```

O frontend pode ser deployado em qualquer serviço de hospedagem estática:
- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**

---

## 🔑 Variáveis de Ambiente

### Backend (`backend/.env`)

| Variável | Obrigatória | Descrição | Exemplo |
|---|---|---|---|
| `GEMINI_API_KEY` | ✅ | Chave da API Google Gemini | `AIzaSy...` |
| `GOOGLE_API_KEY` | ⚠️ | Alternativa para `GEMINI_API_KEY` | `AIzaSy...` |
| `GEMINI_MODEL` | ❌ | Modelo Gemini a utilizar | `gemini-3-pro` (padrão: `gemini-3-flash-preview`) |
| `PORT` | ❌ | Porta do servidor | `7860` (padrão) |
| `GROQ_MODEL` | ❌ | Modelo Groq para agentes CrewAI | `llama-3.3-70b-versatile` |

### Frontend (`frontend/.env`)

| Variável | Obrigatória | Descrição | Exemplo |
|---|---|---|---|
| `VITE_API_URL` | ❌ | URL do backend Flask | `https://meu-backend.hf.space` |
| `VITE_HF_TOKEN` | ❌ | Token Hugging Face (se backend protegido) | `hf_...` |

---

## 📄 Licença

Este projeto é proprietário e desenvolvido sob demanda para uso educacional.

---

<p align="center">
  <sub>Desenvolvido com 💙 para professores brasileiros</sub>
</p>
