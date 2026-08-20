<p align="center">
  <h1 align="center">🏦 Vaultis — Sistema Inteligente de Gestão Financeira</h1>
  <p align="center">
    Plataforma completa de automação financeira com OCR por IA, integração WhatsApp e Dashboard analítico em tempo real.
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Em_Produção-brightgreen?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Backend-Flask_3.0-0D6EFD?style=for-the-badge&logo=flask" alt="Flask">
  <img src="https://img.shields.io/badge/Bot-Node.js_18+-339933?style=for-the-badge&logo=nodedotjs" alt="Node.js">
  <img src="https://img.shields.io/badge/AI-LLaMA_4_Vision-FF6F00?style=for-the-badge&logo=meta" alt="AI">
  <img src="https://img.shields.io/badge/DB-PostgreSQL_15-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Testes-Pytest-0A9EDC?style=for-the-badge&logo=pytest" alt="Testes">
  <img src="https://img.shields.io/badge/Licença-Proprietária-red?style=for-the-badge" alt="Licença">
</p>

---

## 📑 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Arquitetura do Sistema](#-arquitetura-do-sistema)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Banco de Dados](#-banco-de-dados)
- [Motor de IA — Pipeline OCR](#-motor-de-ia--pipeline-ocr)
- [API REST — Referência de Endpoints](#-api-rest--referência-de-endpoints)
- [Integração WhatsApp (Bot)](#-integração-whatsapp-bot)
- [Módulo de Relatórios e Exportação](#-módulo-de-relatórios-e-exportação)
- [Segurança e Proteções](#-segurança-e-proteções)
- [Pré-requisitos de Sistema](#-pré-requisitos-de-sistema)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Variáveis de Ambiente (.env)](#-variáveis-de-ambiente-env)
- [Operação e Uso Diário](#-operação-e-uso-diário)
- [Deploy em Produção](#-deploy-em-produção)
- [Testes Automatizados](#-testes-automatizados)
- [Manutenção e Troubleshooting](#-manutenção-e-troubleshooting)
- [Roadmap e Evolução](#-roadmap-e-evolução)
- [Licença](#-licença)

---

## 🎯 Visão Geral

O **Vaultis** (anteriormente GestorBot / Finex) é um sistema completo de gestão financeira projetado para restaurantes e beach clubs. A plataforma automatiza o lançamento de despesas e receitas por meio de **Inteligência Artificial (OCR via LLaMA 4 Vision)**, oferecendo:

- **Processamento automático de notas fiscais** — basta fotografar o documento e a IA extrai todos os dados relevantes.
- **Integração direta com WhatsApp** — comprovantes enviados pelo celular são processados automaticamente.
- **Dashboard analítico com visão mensal e anual** — métricas de faturamento, despesas, lucro, rankings e insights.
- **Exportação profissional** — relatórios em PDF, Excel (.xlsx) e CSV (compatível com Excel e Google Sheets).
- **Painel administrativo** — gestão de usuários com controle de acesso baseado em roles.

### Resultados Comprovados

| Métrica | Valor |
|---------|-------|
| Redução no tempo de lançamento | **~90%** |
| Precisão na categorização automática | **95%+** |
| Categorias hierárquicas | **10 principais + 50+ subcategorias** |
| Formatos de exportação | **4** (PDF, XLSX, CSV Excel, CSV Sheets) |
| Volume testado | **~17.000 transações/ano** |

---

## ✨ Funcionalidades Principais

### 📸 OCR Inteligente com IA
- Processamento de imagens (JPG, PNG, WEBP, GIF) e PDFs de notas fiscais
- Extração automática de: data, estabelecimento, valor total, categoria e subcategoria
- Categorização em 3 níveis de fallback: **IA → Nome do Arquivo → Histórico**
- Validação anti-alucinação (datas razoáveis, valores coerentes)
- Upload individual e em massa (até 10 arquivos simultâneos)

### 🤖 Bot WhatsApp
- Integração via **Baileys** (@whiskeysockets/baileys v6.7)
- Processamento assíncrono com fila (queue + worker thread)
- Notificações batched (agrupamento inteligente de confirmações)
- Suporte a whitelist de grupos e números
- Push notifications com retry automático (3 tentativas)

### 📊 Dashboard Analítico
- **Visão Mensal**: receitas, despesas, lucro, gráficos interativos (Chart.js)
- **Visão Anual**: comparativo ano-a-ano, evolução mês-a-mês, rankings
- Busca avançada por: descrição, categoria, subcategoria, tipo, valor (min/max), faixa de datas
- Paginação server-side com abas (Despesas / Receitas / Histórico)
- Detalhamento por subcategoria em cada categoria

### 📄 Relatórios e Exportação
- **PDF**: relatório mensal completo com gráfico rosca, resumo e listagem de transações
- **Excel (.xlsx)**: formatado profissionalmente com cores, bordas e fórmulas SUBTOTAL
- **CSV Excel**: separador `;`, formato BR (vírgula decimal), BOM UTF-8
- **CSV Google Sheets**: separador `,`, formato ISO, UTF-8 puro
- **CSV Resumo**: resumo financeiro com categorias e percentuais

### 🔐 Autenticação e Administração
- Sistema de login com Flask-Login e cookies "Lembrar-me" (30 dias)
- Roles: `admin` e `user` com decorators especializados
- Painel admin: CRUD de usuários, toggle ativo/inativo, reset de senha
- Autenticação desativável via `AUTH_ENABLED=False` (útil para desenvolvimento)

### 📈 Analytics e Insights
- Top 10 fornecedores por frequência e volume financeiro
- Extração de palavras-chave recorrentes nas descrições
- Insights automáticos: fornecedor principal, ticket médio, maior compra, margem de lucro

---

## 🏗️ Arquitetura do Sistema

O Vaultis opera em uma arquitetura de **microsserviços hybrid**, composta por dois serviços principais que se comunicam via REST API interna.

### 🔄 Fluxo de Processamento de Notas Fiscais

```mermaid
sequenceDiagram
    participant User as 👤 Usuário
    participant WA as 📱 WhatsApp
    participant Bot as 🤖 Bot (Node.js)
    participant API as 🐍 Backend (Flask)
    participant Queue as 📥 Fila (Thread)
    participant AI as 🧠 Groq API (LLaMA 4)
    participant DB as 🗄️ PostgreSQL

    User->>WA: Envia foto da Nota Fiscal 📸
    WA->>Bot: Webhook de mensagem
    Bot->>Bot: Valida grupo/número (whitelist)
    Bot->>API: POST /api/upload-whatsapp (base64 + JID)
    API->>Queue: Enfileira para processamento
    API-->>Bot: 200 OK (aceito)
    Queue->>AI: Envia imagem para OCR
    AI-->>Queue: Retorna JSON estruturado
    Queue->>Queue: Valida + Categoriza (3 níveis)
    Queue->>DB: INSERT Transação (CONFIRMADO)
    Queue->>Bot: POST /send-message (resultado)
    Bot->>WA: Mensagem de confirmação
    WA-->>User: "✅ Processado! 🏢 Fornecedor 💵 R$ X,XX 📂 Cat > Subcat"
```

### 🧩 Componentes e Comunicação

```mermaid
graph TD
    subgraph "Clientes"
        WA[📱 WhatsApp App]
        Web[🌐 Dashboard Web]
    end

    subgraph "Serviço 1: Backend Flask"
        Flask[🐍 Flask API Server]
        Worker[👷 Worker Thread]
        Services[📦 Services Layer]
    end

    subgraph "Serviço 2: Bot WhatsApp"
        Bot[🤖 Node.js Bot]
        Baileys[📡 Baileys Client]
        Express[🌐 Express Server]
    end

    subgraph "Infraestrutura"
        DB[(🗄️ PostgreSQL)]
        FS[📁 File System]
    end

    subgraph "APIs Externas"
        Groq[🧠 Groq Cloud API]
    end

    WA <-->|WebSocket| Baileys
    Baileys <--> Bot
    Bot <-->|HTTP| Express
    Express <-->|REST API| Flask
    Web <-->|HTTP| Flask
    Flask --> Worker
    Worker --> Services
    Services -->|OCR Request| Groq
    Flask <--> DB
    Flask <--> FS
    Bot <-->|Push Notifications| Flask
```

---

## 🛠️ Stack Tecnológico

### Backend (Python)

| Tecnologia | Versão | Função |
|------------|--------|--------|
| **Flask** | 3.0.0 | Framework web principal |
| **Flask-SQLAlchemy** | 3.1.1 | ORM para banco de dados |
| **Flask-Login** | 0.6.3 | Autenticação e sessões |
| **Flask-WTF** | 1.2.1 | Proteção CSRF |
| **Flask-CORS** | 4.0.0 | Cross-Origin Resource Sharing |
| **Flask-Limiter** | 4.1.1 | Rate limiting por endpoint |
| **Werkzeug** | 3.0.1 | Utilitários WSGI e hashing de senhas |
| **Gunicorn** | 21.2.0 | Servidor WSGI de produção |
| **psycopg** | 3.2.3 (binary) | Driver PostgreSQL moderno (psycopg3) |
| **python-dotenv** | 1.0.0 | Gerenciamento de variáveis de ambiente |

### IA e Processamento

| Tecnologia | Versão | Função |
|------------|--------|--------|
| **Groq SDK** | ≥0.11.0 | Cliente da API Groq (LLaMA 4 Vision) |
| **Pillow** | ≥10.2.0 | Manipulação de imagens |
| **PyMuPDF** | ≥1.24.0 | Conversão de PDF para imagem |

### Relatórios e Exportação

| Tecnologia | Versão | Função |
|------------|--------|--------|
| **fpdf2** | 2.7.6 | Geração de PDFs |
| **Matplotlib** | latest | Gráficos rosca para PDFs |
| **openpyxl** | ≥3.1.0 | Exportação Excel (.xlsx) formatada |

### Bot WhatsApp (Node.js)

| Tecnologia | Versão | Função |
|------------|--------|--------|
| **Node.js** | 18+ LTS | Runtime JavaScript |
| **TypeScript** | 5.3+ | Tipagem estática |
| **@whiskeysockets/baileys** | 6.7.0 | Cliente WhatsApp Web (multi-device) |
| **Express** | 5.2.1 | Servidor HTTP para push notifications |
| **Axios** | 1.6.0 | Cliente HTTP para comunicação com Flask |
| **Pino** | 8.0+ | Logging estruturado |

### Testes

| Tecnologia | Versão | Função |
|------------|--------|--------|
| **Pytest** | ≥8.0.0 | Framework de testes |
| **pytest-cov** | ≥4.1.0 | Cobertura de código |

---

## 📂 Estrutura do Projeto

```
Vaultis/
├── 📄 app.py                      # Factory da aplicação Flask (create_app)
├── 📄 config.py                   # Configurações centralizadas (Config class)
├── 📄 models.py                   # Modelos SQLAlchemy + funções de consulta
├── 📄 wsgi.py                     # Entry point WSGI (PythonAnywhere/Gunicorn)
├── 📄 requirements.txt            # Dependências Python
├── 📄 Procfile                    # Configuração Railway/Heroku
├── 📄 .env.example                # Template de variáveis de ambiente
├── 📄 .gitignore                  # Regras de exclusão do Git
├── 📄 DESCRICAO_PORTFOLIO.md      # Descrição para portfólio
│
├── 📁 routes/                     # Blueprints Flask (camada de rotas)
│   ├── __init__.py                # Registro de blueprints
│   ├── main.py                    # Páginas: Home, Dashboard, Análise Anual, Exportações
│   ├── upload.py                  # Upload de notas (individual, massa, comprovante)
│   ├── transacoes.py              # CRUD de transações (criar, editar, deletar)
│   ├── api.py                     # API JSON: totais, subcategorias, dados diários
│   ├── auth.py                    # Login, logout, autenticação
│   ├── admin.py                   # Painel admin: CRUD de usuários
│   └── whatsapp.py                # Integração WhatsApp: upload, status, worker
│
├── 📁 services/                   # Camada de serviços (lógica de negócio)
│   ├── __init__.py
│   ├── groq_service.py            # OCR com LLaMA 4 Vision (1193 linhas)
│   ├── historico_service.py       # Categorização por histórico de transações
│   ├── pdf_service.py             # Geração de relatórios PDF com gráficos
│   ├── csv_service.py             # Exportação CSV (Excel + Google Sheets)
│   └── excel_service.py           # Exportação Excel (.xlsx) formatada
│
├── 📁 utils/                      # Utilitários e helpers
│   ├── __init__.py
│   ├── helpers.py                 # Extração de JSON, validação de datas, formatação
│   ├── analytics.py               # Análise: fornecedores, palavras-chave, insights
│   ├── auth_decorators.py         # Decorators: @auth_if_enabled, @admin_required
│   ├── ai_selector.py             # Seletor de serviço de IA
│   ├── file_handler.py            # Salvamento de arquivos no disco
│   └── pdf_converter.py           # Conversão PDF → imagem (PyMuPDF)
│
├── 📁 templates/                  # Templates Jinja2
│   ├── base.html                  # Layout base com navbar e footer
│   ├── base_dashboard.html        # Layout para dashboards
│   ├── home.html                  # Tela inicial com botões de ação
│   ├── dashboard.html             # Painel principal (~40KB, completo)
│   ├── analise_anual.html         # Dashboard anual com comparativos
│   ├── receita.html               # Formulário de lançamento de receita
│   ├── login.html                 # Tela de login
│   ├── 403.html / 404.html / 500.html  # Páginas de erro
│   └── admin/                     # Templates do painel admin
│
├── 📁 static/                     # Arquivos estáticos
│   ├── css/                       # Estilos CSS
│   ├── js/                        # Scripts JavaScript
│   └── uploads/                   # Comprovantes salvos
│
├── 📁 tests/                      # Suíte de testes
│   ├── conftest.py                # Fixtures: app, client, db_session
│   ├── test_models.py             # Testes dos modelos e consultas
│   ├── test_routes.py             # Testes das rotas HTTP
│   ├── test_helpers.py            # Testes dos utilitários
│   ├── test_ia_improvements.py    # Testes do pipeline de IA
│   └── test_casos_erro.py         # Testes de cenários de erro
│
├── 📁 scripts/                    # Scripts utilitários
│   ├── criar_admin.py             # Criação de usuário admin
│   ├── popular_banco.py           # Seed de dados de teste
│   ├── popular_banco_demo.py      # Seed completo com 17K+ transações
│   ├── popular_ano_completo.py    # Seed de ano completo com sazonalidade
│   ├── migrar_para_postgres.py    # Migração SQLite → PostgreSQL
│   └── testar_historico.py        # Teste do módulo de histórico
│
├── 📁 whatsapp/                   # Bot WhatsApp (Node.js/TypeScript)
│   ├── package.json               # Dependências Node.js
│   ├── tsconfig.json              # Configuração TypeScript
│   ├── Dockerfile                 # Container Docker para o bot
│   ├── .env.example               # Template de variáveis do bot
│   ├── src/                       # Código-fonte TypeScript
│   ├── dist/                      # Build compilado (JavaScript)
│   └── auth/                      # Dados de sessão WhatsApp (gitignored)
│
├── 📁 docs/                       # Documentação adicional
│   ├── Implementações/            # Notas de implementação
│   └── prompts/                   # Prompts de referência
│
└── 📁 instance/                   # Banco SQLite local (gitignored)
    └── gestor.db
```

---

## 🗄️ Banco de Dados

### Configuração de Conexão

O sistema suporta dois drivers de banco de dados de forma transparente:

| Ambiente | Banco | URI Pattern |
|----------|-------|-------------|
| **Desenvolvimento** | SQLite | `sqlite:///instance/gestor.db` |
| **Produção** | PostgreSQL 15+ | `postgresql+psycopg://user:pass@host:5432/db` |

A seleção é automática: se a variável `DATABASE_URL` estiver definida, usa PostgreSQL; caso contrário, cria um banco SQLite local na pasta `instance/`.

**Pool de Conexões (Produção):**
```python
SQLALCHEMY_ENGINE_OPTIONS = {
    'pool_pre_ping': True,    # Verifica saúde da conexão antes de usar
    'pool_recycle': 300,      # Recicla conexões a cada 5 minutos
}
```

### Schema do Banco — Tabela `users`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | `INTEGER` | PK, Auto-increment | Identificador único |
| `email` | `VARCHAR(120)` | UNIQUE, NOT NULL, INDEX | Email de login |
| `password_hash` | `VARCHAR(256)` | NOT NULL | Hash Werkzeug (scrypt/pbkdf2) |
| `nome` | `VARCHAR(100)` | NOT NULL | Nome de exibição |
| `role` | `VARCHAR(20)` | DEFAULT 'user' | Papel: `admin` ou `user` |
| `ativo` | `BOOLEAN` | DEFAULT True | Controle de acesso |
| `created_at` | `DATETIME` | DEFAULT now() | Data de criação da conta |
| `last_login` | `DATETIME` | NULLABLE | Último acesso ao sistema |

### Schema do Banco — Tabela `transacoes`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | `INTEGER` | PK, Auto-increment | Identificador único |
| `tipo` | `VARCHAR(10)` | NOT NULL | `'DESPESA'` ou `'RECEITA'` |
| `valor` | `FLOAT` | NOT NULL | Valor monetário (R$) |
| `data` | `DATETIME` | NOT NULL, DEFAULT now() | Data da transação |
| `categoria` | `VARCHAR(50)` | NOT NULL | Categoria principal |
| `subcategoria` | `VARCHAR(50)` | NULLABLE | Subcategoria hierárquica |
| `descricao` | `VARCHAR(200)` | NULLABLE | Descrição livre |
| `estabelecimento` | `VARCHAR(100)` | NULLABLE | Nome do fornecedor |
| `comprovante_url` | `VARCHAR(500)` | NULLABLE | URL do comprovante salvo |
| `status` | `VARCHAR(20)` | DEFAULT 'CONFIRMADO' | Status: `CONFIRMADO`, `PENDENTE` |
| `created_at` | `DATETIME` | DEFAULT now() | Data de criação do registro |

### Sistema Hierárquico de Categorias

O Vaultis utiliza um sistema de categorias hierárquico com **10 categorias principais** e **50+ subcategorias**:

<details>
<summary>📋 <strong>Clique para expandir a árvore de categorias completa</strong></summary>

| # | Categoria | Subcategorias |
|---|-----------|---------------|
| 1 | **Insumos** | Frutos do Mar, Carnes e Aves, Hortifruti, Laticínios, Frutas, Alimento (Variado), Gelo, Café, Farinha, Outros |
| 2 | **Bebidas** | Bebidas, Refrigerante, Cervejas, Destilados, Vinhos, Energético, Outros |
| 3 | **Operacional** | Embalagens, Limpeza, Manutenção, Gás, Organização, Música/Streaming, Sistemas/Gestão, Outros |
| 4 | **Pessoal** | Pessoal, Pro Labore, Salário, Freelancer, Gorjeta, Venda de Férias, Venda de Folga, Vale Transporte, Vale Refeição, DJ/Músicos, Hora Extra, Outros |
| 5 | **Infraestrutura** | Aluguel, Energia, Água, Seguros, Outros |
| 6 | **Administrativo** | Impostos, Transporte, Outros |
| 7 | **Marketing e Eventos** | Eventos, Marketing, Aluguel, Outros |
| 8 | **Veículos** | Gasolina, Manutenção, IPVA, Seguro, Outros |
| 9 | **Aquisições** | Móveis, Eletrodomésticos, Software, Máquinas, Outros |
| 10 | **Outros** | Outros |

</details>

### Funções de Consulta (models.py)

O módulo `models.py` inclui funções de alto nível para consultas frequentes:

| Função | Retorno | Descrição |
|--------|---------|-----------|
| `get_transacoes_mes(ano, mes)` | `list[Transacao]` | Transações do mês, ordenadas por data desc |
| `get_totais_mes(ano, mes)` | `dict` | `{receitas, despesas, lucro}` |
| `get_gastos_por_categoria(ano, mes)` | `dict` | `{categoria: total}` |
| `get_receitas_por_categoria(ano, mes)` | `dict` | `{tipo_pagamento: total}` |
| `get_gastos_por_subcategoria(ano, mes, cat)` | `dict` | `{subcategoria: total}` |
| `get_totais_diarios_mes(ano, mes)` | `dict` | `{dias, receitas[], despesas[]}` para Chart.js |
| `get_totais_ano(ano)` | `dict` | `{receitas, despesas, lucro}` do ano |
| `get_totais_mensais_ano(ano)` | `dict` | `{meses[], receitas[], despesas[]}` |
| `get_ranking_categorias_ano(ano, n)` | `list[dict]` | Top N categorias de despesas |
| `get_ranking_receitas_ano(ano, n)` | `list[dict]` | Top N tipos de receita |
| `get_transacoes_ano(ano, tipo?)` | `list[Transacao]` | Transações do ano com filtro opcional |

---

## 🧠 Motor de IA — Pipeline OCR

### Modelo Utilizado

| Parâmetro | Valor |
|-----------|-------|
| **Provedor** | Groq Cloud |
| **Modelo** | `meta-llama/llama-4-maverick-17b-128e-instruct` |
| **Capacidade** | Visão (imagens) + Texto |
| **Temperature** | 0.1 (determinístico) |
| **Max Tokens** | 500 |

### Pipeline de Categorização em 3 Níveis

O sistema utiliza uma estratégia de fallback em cascata para garantir a melhor categorização possível:

```mermaid
graph TD
    A[📸 Imagem recebida] --> B[🧠 Nível 1: IA Analisa]
    B -->|Categoria identificada| G[✅ Resultado final]
    B -->|Retornou Outros/Outros| C{📄 Nome do arquivo?}
    C -->|Sim| D[🔍 Nível 2: Heurística por nome]
    C -->|Não| E[📚 Nível 3: Histórico]
    D -->|Match encontrado| G
    D -->|Sem match| E
    E -->|Match com confiança| G
    E -->|Sem match| F[❓ Outros/Outros com fonte=ia]

    style A fill:#e3f2fd
    style G fill:#c8e6c9
    style F fill:#ffecb3
```

**Nível 1 — IA (Groq LLaMA 4 Vision):**
- Prompt especializado com 193 linhas de instruções detalhadas
- Regras de prioridade: nome do arquivo > conteúdo da nota
- Validação empresa vs. pessoa física (CNPJ/LTDA vs. CPF)
- Tabela de exemplos corretos e erros comuns

**Nível 2 — Heurística por Nome do Arquivo:**
- Análise de palavras-chave no nome do arquivo (ex: `Energia_Mar.pdf` → Infraestrutura/Energia)
- Mapeamento direto: `gás` → Operacional/Gás, `tucamar` → Insumos/Frutos do Mar, etc.

**Nível 3 — Histórico de Transações:**
- Busca por similaridade na descrição/estabelecimento
- Retorna categoria mais frequente com índice de confiança
- Serviço dedicado: `HistoricoService`

### Validação Anti-Alucinação

| Validação | Comportamento |
|-----------|---------------|
| **Data inválida** | Tenta converter formatos comuns → fallback para data de hoje |
| **Data futura** | Ajusta para data atual com log de warning |
| **Data muito antiga** | Limite de 2 anos no passado |
| **Valor zero/negativo** | Rejeita com mensagem de erro |
| **Imagem > 4MB** | Rejeita antes de enviar à API |
| **JSON malformado** | Parser resiliente com regex fallback |

### Processamento de Receitas

Para comprovantes de receita (PIX, transferências), o sistema utiliza um prompt separado que identifica automaticamente o **tipo de pagamento**:

| Tipo | Palavras-Chave Detectadas |
|------|---------------------------|
| **PIX** | pix, qr code, chave pix |
| **Cartão** | cartão, crédito, débito, visa, mastercard, elo |
| **Transferência** | TED, DOC, transferência bancária, depósito |
| **Vendas** | cupom fiscal, nota fiscal, venda |
| **Outros** | Fallback padrão |

---

## 🌐 API REST — Referência de Endpoints

### Páginas Web (Blueprint `main`)

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `GET` | `/` | ✅ | Home — tela inicial com botões de ação |
| `GET` | `/dashboard` | ✅ | Dashboard mensal com filtros e paginação |
| `GET` | `/analise-anual` | ✅ | Dashboard anual com comparativos |
| `GET` | `/receita` | ✅ | Formulário de lançamento de receita |
| `GET` | `/relatorio` | ✅ | Download de relatório PDF mensal |
| `GET` | `/exportar-csv` | ✅ | Download de CSV (formato Excel) |
| `GET` | `/exportar-csv-sheets` | ✅ | Download de CSV (formato Google Sheets) |
| `GET` | `/exportar-resumo-csv` | ✅ | Download de resumo CSV |
| `GET` | `/exportar-excel` | ✅ | Download de Excel (.xlsx) formatado |

### Upload e Processamento (Blueprint `upload`)

| Método | Rota | Auth | Rate Limit | Descrição |
|--------|------|------|------------|-----------|
| `POST` | `/upload-nota` | ✅ | 30/min | Processa nota fiscal (imagem ou PDF) |
| `POST` | `/upload-notas-massa` | ✅ | 5/min | Processa até 10 notas de uma vez |
| `POST` | `/upload-comprovante` | ✅ | 30/min | Processa comprovante de receita |

### CRUD de Transações (Blueprint `transacoes`)

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `POST` | `/transacao/salvar` | ✅ | Cria ou atualiza transação |
| `DELETE` | `/transacao/<id>/deletar` | ✅ | Remove transação (requer senha mestra) |

### API JSON (Blueprint `api`)

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `GET` | `/api/totais` | — | Totais do mês em JSON |
| `GET` | `/api/subcategorias` | — | Todas as categorias e subcategorias |
| `GET` | `/api/subcategorias/<cat>` | — | Subcategorias de uma categoria |
| `GET` | `/api/gastos-subcategoria` | — | Gastos por subcategoria |
| `GET` | `/api/dados-diarios` | — | Dados diários para gráficos |

### Autenticação (Blueprint `auth`)

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `GET/POST` | `/login` | — | Formulário e processamento de login |
| `GET` | `/logout` | ✅ | Encerrar sessão |

### Administração (Blueprint `admin`)

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `GET` | `/admin/usuarios` | 🔒 Admin | Lista de usuários |
| `GET/POST` | `/admin/usuarios/novo` | 🔒 Admin | Criar usuário |
| `GET/POST` | `/admin/usuarios/<id>/editar` | 🔒 Admin | Editar usuário |
| `POST` | `/admin/usuarios/<id>/toggle` | 🔒 Admin | Ativar/desativar |
| `POST` | `/admin/usuarios/<id>/reset-senha` | 🔒 Admin | Resetar senha |

### WhatsApp Bot (Blueprint `whatsapp`)

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `POST` | `/api/upload-whatsapp` | 🔑 API Key | Recebe imagen do bot (assíncrono) |
| `GET` | `/api/whatsapp/status` | 🔑 API Key | Health check do endpoint |

### Health Check

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `GET` | `/health` | — | Status da aplicação + conexão com banco |

---

## 📱 Integração WhatsApp (Bot)

### Arquitetura do Bot

O bot WhatsApp é uma aplicação **Node.js/TypeScript** independente que atua como gateway entre o WhatsApp e o backend Flask.

```
whatsapp/
├── src/
│   └── index.ts          # Entry point (Baileys + Express)
├── package.json          # Deps: baileys, express, axios, pino
├── tsconfig.json         # Config TypeScript
├── Dockerfile            # Para deploy containerizado
├── .env                  # Configurações locais
└── auth/                 # Sessão WhatsApp (gitignored)
```

### Processamento Assíncrono

O endpoint `/api/upload-whatsapp` utiliza uma **fila em memória** (`queue.Queue`) com um **worker thread** dedicado para evitar rate limiting da API Groq:

```
Requisição → Fila (Queue) → Worker Thread → Groq API → Banco → Push Notification
                                    ↓
                          Delay 3s entre itens
```

**BatchCollector:** Agrupa notificações de recebimento com debounce de 4 segundos. Se o usuário enviar 5 fotos rapidamente, recebe uma única mensagem *"📥 Recebi 5 comprovantes! Processando todos..."* em vez de 5 mensagens individuais.

### Configuração do Bot

```bash
# whatsapp/.env
MONA_API_URL=http://localhost:5000     # URL do backend Flask
MONA_API_KEY=sua_chave_secreta         # Token compartilhado
WHATSAPP_ALLOWED_NUMBERS=5511999991234 # Whitelist (separar por vírgula)
PORT=3000                              # Porta do Express
```

---

## 📄 Módulo de Relatórios e Exportação

### PDF (`pdf_service.py`)

- Geração via **fpdf2** com layout profissional
- **Gráfico rosca** (donut chart) com Matplotlib — inserido diretamente no PDF
- Seções: Resumo Financeiro → Despesas por Categoria → Receitas por Categoria → Lista de Transações
- Cores semânticas: verde (receitas), vermelho (despesas)
- Paginação automática com header/footer em cada página
- Sanitização Unicode → Latin-1 para compatibilidade com fontes core

### Excel (`excel_service.py`)

- Geração via **openpyxl** com formatação profissional
- Metadados: título, resumo financeiro, total de transações
- Cabeçalho colorido (azul), linhas alternadas (zebra), bordas
- Cores por tipo: verde para receitas, vermelho para despesas
- Fórmula `SUBTOTAL` para total geral
- Painéis congelados (freeze_panes) para rolagem com cabeçalho fixo
- Largura de colunas otimizada

### CSV (`csv_service.py`)

| Formato | Separador | Decimal | Encoding | Uso |
|---------|-----------|---------|----------|-----|
| **Excel BR** | `;` | `,` | UTF-8 + BOM | Microsoft Excel (PT-BR) |
| **Google Sheets** | `,` | `.` | UTF-8 | Google Sheets / Internacional |
| **Resumo** | `;` | `,` | UTF-8 + BOM | Resumo financeiro com categorias |

---

## 🔒 Segurança e Proteções

### Camadas de Segurança Implementadas

| Camada | Implementação | Descrição |
|--------|---------------|-----------|
| **CSRF** | Flask-WTF `CSRFProtect` | Proteção contra Cross-Site Request Forgery |
| **Rate Limiting** | Flask-Limiter | 200/dia, 50/hora (global); 30/min (upload); 5/min (massa) |
| **CORS** | Flask-CORS | Origins configuráveis via `CORS_ORIGINS` |
| **Hashing** | Werkzeug (scrypt) | Senhas nunca armazenadas em texto puro |
| **Headers** | `@after_request` | X-Content-Type-Options, X-Frame-Options, X-XSS-Protection |
| **API Key** | Header `X-API-Key` | Autenticação do bot WhatsApp |
| **Upload** | `MAX_CONTENT_LENGTH` | Limite de 16MB por arquivo |
| **Extensões** | Whitelist | Apenas: png, jpg, jpeg, gif, webp, pdf |
| **Imagem Base64** | Validação | Decodificação + limite de 4MB |
| **SQL Injection** | SQLAlchemy ORM | Queries parametrizadas automaticamente |

### Headers de Segurança

Todas as respostas HTTP incluem automaticamente:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Endpoints Isentos de CSRF

Os endpoints da API WhatsApp utilizam autenticação via API Key e são isentos da verificação CSRF:
- `routes.whatsapp.upload_whatsapp`
- `routes.whatsapp.whatsapp_status`

---

## 📋 Pré-requisitos de Sistema

### Essenciais

| Requisito | Versão | Motivo |
|-----------|--------|--------|
| **Python** | 3.11+ | Tipagem moderna, async, performance |
| **Node.js** | 18.x LTS+ | Runtime do bot WhatsApp |
| **Git** | 2.x+ | Versionamento de código |

### Serviços Externos

| Serviço | Obrigatório | Descrição |
|---------|-------------|-----------|
| **Groq API Key** | ✅ Sim | Chave em [console.groq.com](https://console.groq.com/) (gratuito em beta) |
| **Número WhatsApp** | ⚠️ Para bot | Chip/número dedicado para o bot |

### Opcionais (Produção)

| Serviço | Recomendação | Descrição |
|---------|-------------|-----------|
| **PostgreSQL** | 15+ | Banco de produção (SQLite em dev) |
| **PM2** | Última | Gerenciamento de processos Node.js |
| **Gunicorn** | 21.2+ | Servidor WSGI de produção |
| **Railway** / **PythonAnywhere** | — | Hospedagem cloud |

---

## 🚀 Instalação e Configuração

### Passo 1: Clonar e Configurar o Backend (Flask)

```bash
# 1. Clone o repositório
git clone <repo-url>
cd "Vaultis - Andamento"

# 2. Crie e ative o ambiente virtual
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/macOS
python3 -m venv venv
source venv/bin/activate

# 3. Instale as dependências
pip install -r requirements.txt

# 4. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas chaves (ver seção "Variáveis de Ambiente")

# 5. Inicialize o banco de dados
python check_db.py

# 6. Crie o primeiro usuário administrador
python scripts/criar_admin.py
```

### Passo 2: Configurar o Bot WhatsApp (Node.js)

```bash
# 1. Entre na pasta do bot
cd whatsapp

# 2. Instale as dependências
npm install
# Nota: Se houver erros de 'gyp', verifique build-tools ou ignore se forem opcionais

# 3. Configure o .env do bot
cp .env.example .env
# Edite com a URL do Flask e a API Key compartilhada

# 4. Build para produção (opcional)
npm run build
```

### Passo 3: Seed de Dados (Opcional)

```bash
# Dados básicos de teste
python scripts/popular_banco.py

# Dataset completo de demonstração (~17.000 transações)
python scripts/popular_banco_demo.py

# Ano completo com sazonalidade realista
python scripts/popular_ano_completo.py
```

---

## ⚙️ Variáveis de Ambiente (.env)

### 📂 Raiz (`/.env`) — Backend Flask

| Variável | Obrigatório | Padrão | Descrição |
|----------|:-----------:|--------|-----------|
| `GROQ_API_KEY` | ✅ | — | Chave da API Groq (OCR com LLaMA 4 Vision) |
| `GROQ_MODEL` | — | `meta-llama/llama-4-maverick-17b-128e-instruct` | Modelo de IA |
| `SECRET_KEY` | ✅ | Auto-gerado | Chave secreta do Flask (sessões, CSRF) |
| `DATABASE_URL` | — | SQLite local | URI PostgreSQL para produção |
| `AUTH_ENABLED` | — | `True` | Ativa/desativa autenticação no dashboard |
| `SENHA_EXCLUSAO` | — | `mona2026` | Senha mestra para deletar transações |
| `WHATSAPP_API_KEY` | — | — | Token compartilhado com o bot WhatsApp |
| `WHATSAPP_ALLOWED_GROUPS` | — | — | Grupos permitidos (separar por vírgula) |
| `WHATSAPP_BOT_URL` | — | `http://localhost:3000` | URL do bot para push notifications |
| `CORS_ORIGINS` | — | `*` | Domínios permitidos (separar por vírgula) |
| `FLASK_DEBUG` | — | `True` | Modo debug |
| `FLASK_HOST` | — | `0.0.0.0` | Host do servidor |
| `FLASK_PORT` | — | `5000` | Porta do servidor |

### 📂 Bot (`/whatsapp/.env`) — WhatsApp

| Variável | Obrigatório | Padrão | Descrição |
|----------|:-----------:|--------|-----------|
| `MONA_API_URL` | ✅ | — | URL do backend Flask (ex: `http://localhost:5000`) |
| `MONA_API_KEY` | ✅ | — | API Key compartilhada com o Flask |
| `WHATSAPP_ALLOWED_NUMBERS` | — | — | Whitelist de números (DDI+DDD+Num) |
| `PORT` | — | `3000` | Porta do servidor Express do bot |

---

## 🎮 Operação e Uso Diário

### ▶️ Iniciando os Serviços

**Terminal 1 — Backend Flask:**
```bash
# Na raiz do projeto (com venv ativado)
python app.py
# ✅ Rodando em: http://localhost:5000
```

**Terminal 2 — Bot WhatsApp:**
```bash
# Na pasta /whatsapp
npm start
# ✅ Aguarde o QR Code aparecer no terminal
```

### 📱 Primeiro Acesso — Pareamento WhatsApp

1. Ao rodar `npm start`, um **QR Code** será exibido no terminal.
2. Abra o **WhatsApp** no celular que será o bot.
3. Vá em **Aparelhos Conectados → Conectar Aparelho**.
4. Escaneie o QR Code.
5. Aguarde: `✅ Bot está pronto para receber mensagens!`

### 🧪 Testando o Fluxo Completo

1. De outro celular (autorizado na whitelist, se ativa), envie uma **foto de nota fiscal** para o número do bot.
2. O bot agrupará o recebimento: *"📥 Recebi 1 comprovante! Processando..."*
3. Após 5-15 segundos:
   ```
   ✅ Processado!
   🏢 Nutrifrios LTDA
   💵 R$ 1.250,00
   📂 Insumos > Alimento (Variado)
   ```
4. Verifique no **Dashboard Web** (`http://localhost:5000/dashboard`) se o lançamento apareceu.

### 📊 Acessando o Dashboard

```
http://localhost:5000/          → Home (botões de ação)
http://localhost:5000/dashboard → Dashboard mensal
http://localhost:5000/analise-anual → Análise anual
http://localhost:5000/admin/usuarios → Painel admin (requer role admin)
```

---

## ☁️ Deploy em Produção

### Railway (Backend Flask)

O projeto inclui um `Procfile` configurado:

```
web: MPLCONFIGDIR=/tmp gunicorn --bind 0.0.0.0:5000 --workers 1 --timeout 120 --access-logfile - app:app
```

**Configurações no Railway:**
1. Conecte o repositório Git
2. Adicione as variáveis de ambiente (`.env`) no painel
3. Configure `DATABASE_URL` apontando para o banco PostgreSQL
4. O deploy é automático via push

### PythonAnywhere

O arquivo `wsgi.py` está pré-configurado:

```python
# wsgi.py carrega .env e inicializa a aplicação
from app import app as application
```

**Configurações:**
- Source code: `/home/USER/PROJETO`
- WSGI file: Configure com `from wsgi import application`

### Docker (Bot WhatsApp)

```dockerfile
# whatsapp/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY dist/ ./dist/
CMD ["node", "dist/index.js"]
```

---

## 🧪 Testes Automatizados

### Suíte de Testes

| Arquivo | Escopo | Descrição |
|---------|--------|-----------|
| `conftest.py` | Setup | Fixtures: app (SQLite em memória), client, db_session |
| `test_models.py` | Modelos | CRUD de transações, consultas mensais/anuais |
| `test_routes.py` | Rotas | Testes HTTP das páginas e endpoints |
| `test_helpers.py` | Utils | Extração de JSON, validação de datas, formatação |
| `test_ia_improvements.py` | IA | Pipeline de categorização, fallbacks |
| `test_casos_erro.py` | Erros | Cenários de falha, edge cases |

### Executando os Testes

```bash
# Rodar todos os testes
pytest

# Com cobertura de código
pytest --cov=. --cov-report=term-missing

# Testes específicos
pytest tests/test_models.py -v
pytest tests/test_routes.py -v

# Modo verbose com output detalhado
pytest -v -s
```

### Configuração de Teste

Os testes utilizam um banco **SQLite em memória** isolado, com rollback automático de transações entre cada teste:

```python
config_override = {
    'TESTING': True,
    'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
    'WTF_CSRF_ENABLED': False,
    'SECRET_KEY': 'test-secret-key'
}
```

---

## 🛠️ Manutenção e Troubleshooting

### 🔴 Loop de Conexão WhatsApp / Falha no QR Code

Se o bot entrar em loop de reconexão:

```bash
# 1. Pare o processo
Ctrl+C

# 2. Apague a sessão corrompida
# PowerShell (Windows):
Remove-Item -Recurse -Force whatsapp/auth

# Bash (Linux/Mac):
rm -rf whatsapp/auth

# 3. Reinicie para gerar novo QR Code
cd whatsapp && npm start
```

### 🧠 Erro na API Groq

| Código | Causa | Solução |
|--------|-------|---------|
| **401** | API Key inválida ou expirada | Verifique `GROQ_API_KEY` no `.env` |
| **429** | Rate limit excedido | Aguarde 1 minuto ou use outra chave |
| **Model not found** | Modelo não disponível | Verifique `GROQ_MODEL` no `config.py` |
| **Connection timeout** | Sem internet | Verifique conectividade |

### 📄 Erro de Encoding no PDF

Se encontrar `UnicodeEncodeError` ao gerar relatórios PDF:
- O sistema já possui sanitização automática (`remover_acentos()`)
- Verifique se o `pdf_service.py` utiliza fontes Helvetica (built-in, compatível com Latin-1)
- Para suporte Unicode completo, adicione fontes TTF (ex: DejaVuSans)

### 🗄️ Migração SQLite → PostgreSQL

```bash
# Script automático de migração
python scripts/migrar_para_postgres.py
```

### 🔒 Problemas de Autenticação

| Problema | Solução |
|----------|---------|
| Esqueci a senha admin | `python scripts/criar_admin.py` |
| Login não funciona | Verifique `AUTH_ENABLED=True` no `.env` |
| Acesso negado ao admin | Verifique se `role='admin'` no banco |

### 🔍 Health Check

```bash
# Verificar saúde da aplicação
curl http://localhost:5000/health

# Resposta esperada (200):
# {"status": "healthy", "database": "connected", "timestamp": "..."}

# Se banco desconectado (503):
# {"status": "healthy", "database": "error: ...", "timestamp": "..."}
```

---

## 🗺️ Roadmap e Evolução

### Histórico de Versões

| Versão | Nome | Principais Entregas |
|--------|------|---------------------|
| v1.0 | GestorBot | OCR básico, dashboard mensal, upload manual |
| v1.5 | — | Integração WhatsApp, categorias hierárquicas |
| v2.0 | Finex | Análise anual, rankings, exportação Excel/CSV |
| v2.5 | **Vaultis** | LLaMA 4, pipeline 3 níveis, analytics, rate limiting |

### Funcionalidades Planejadas

- [ ] Suporte multi-empresa (multi-tenant)
- [ ] PWA com notificações push
- [ ] Dashboard responsivo mobile-first
- [ ] Integração com APIs bancárias (Open Banking)
- [ ] Previsão de fluxo de caixa com ML
- [ ] Backup automático programado

---

## 📜 Licença

```
Copyright © 2024-2026. Todos os direitos reservados.

Este software é propriedade privada e confidencial.
Uso, cópia, modificação ou distribuição não autorizados são estritamente proibidos.
```
