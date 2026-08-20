<![CDATA[<div align="center">

# ✈️ PROTNM — Protocolo de Recebimento de Material

### Sistema de Protocolo Eletrônico de Almoxarifado para Gestão de RMMs

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)]()
[![License](https://img.shields.io/badge/Licença-Uso_Interno-red?style=for-the-badge)]()

---

**PROTNM** é uma aplicação web desenvolvida em **Python/Flask** que digitaliza e automatiza o fluxo de recebimento de **Relações de Materiais Movimentados (RMMs)** entre a seção central **TSRE** e as demais seções operacionais de uma base aérea (**TSAU**, **TSAM**, **TSAE**, **TSAS**, **SSS**). O sistema extrai automaticamente dados de PDFs gerados pelo SILOMS, implementa um fluxo de aprovação com múltiplos papéis e permite assinatura digital parcial/total do protocolo de recebimento.

</div>

---

## 📑 Índice

- [Visão Geral do Problema](#-visão-geral-do-problema)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Stack Tecnológica](#-stack-tecnológica)
- [Arquitetura do Sistema](#-arquitetura-do-sistema)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Modelo de Dados (SQLite)](#-modelo-de-dados-sqlite)
- [Fluxo de Negócio (RMM Lifecycle)](#-fluxo-de-negócio-rmm-lifecycle)
- [Motor de Extração de PDF](#-motor-de-extração-de-pdf)
- [Sistema de Controle de Acesso (RBAC)](#-sistema-de-controle-de-acesso-rbac)
- [API Endpoints](#-api-endpoints)
- [Interface do Usuário (Frontend)](#-interface-do-usuário-frontend)
- [PWA — Progressive Web App](#-pwa--progressive-web-app)
- [Instalação e Configuração Local](#-instalação-e-configuração-local)
- [Variáveis de Ambiente e Configuração](#-variáveis-de-ambiente-e-configuração)
- [Roadmap e Melhorias Futuras](#-roadmap-e-melhorias-futuras)

---

## 🎯 Visão Geral do Problema

No contexto de almoxarifados de bases aéreas, a movimentação de materiais entre seções é documentada por meio de **RMMs (Relações de Materiais Movimentados)**, documentos PDF gerados pelo sistema logístico oficial (SILOMS). O fluxo tradicional é **inteiramente manual e baseado em papel**, apresentando os seguintes problemas:

| Problema | Impacto |
|----------|---------|
| RMMs impressas transitam fisicamente entre seções | Risco de extravio e demora no protocolo |
| Conferência de itens feita em planilhas avulsas | Inconsistência e duplicação de dados |
| Ausência de rastreabilidade digital | Impossibilidade de auditar quem recebeu e quando |
| Materiais para múltiplas seções em uma mesma RMM | Complexidade na distribuição e assinatura parcial |
| Preenchimento manual de dados da RMM | Erros de transcrição e retrabalho |

O **PROTNM** resolve esses problemas ao extrair automaticamente os dados dos PDFs, implementar um fluxo de aprovação digital e registrar assinaturas eletrônicas individuais por seção.

---

## ⚡ Funcionalidades Principais

### 📄 Extração Inteligente de PDF
- Leitura automatizada de PDFs de RMM gerados pelo SILOMS via `pdfplumber`.
- Extração de: **Número da RMM**, **Data**, **Itens** (NIIN, Part Number, Descrição, Unidade, Quantidade, Pedido/ME, GMM).
- **Heurística de destino**: detecção automática da seção de destino baseada em palavras-chave do documento (ex.: "EXPEDIÇÃO" → TSAE, "AVARIADO" → TSAM).

### ✅ Fluxo de Autorização
- RMMs entram no sistema com status `AGUARDANDO_AUTORIZACAO`.
- Somente usuários `admin` ou `tsre` podem liberar a RMM para as seções de destino.
- Operadores só visualizam RMMs que já foram autorizadas e que pertencem à sua seção.

### ✍️ Assinatura Digital por Seção
- Cada seção de destino assina o recebimento **independentemente**.
- Se uma RMM é destinada a `TSAU,SSS`, cada uma dessas seções assina sua parte.
- Status `PARCIAL` até que todas as seções assinem; `RECEBIDO` quando todas assinam.
- Constraint `UNIQUE(rmm_id, secao)` impede assinaturas duplicadas.

### 📦 Conferência Item a Item
- Tela de conferência exibe todos os itens com quantidade enviada e campo para editar a quantidade recebida.
- Conferência individual via botão "OK" por item, ou conferência em massa na assinatura.

### 🔒 Controle de Acesso Baseado em Papéis (RBAC)
- `admin` — Acesso total, gerenciamento de usuários, autorização de RMMs.
- `tsre` — Upload de PDFs, autorização de envio, visualização geral.
- `operador` — Visualização restrita à sua seção, conferência e assinatura.

### 📲 PWA (Progressive Web App)
- Instalável na tela inicial de dispositivos Android e iOS.
- Execução em tela cheia sem barra de endereço via `Service Worker`.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Função |
|--------|-----------|--------|
| **Backend** | Python 3.10+, Flask | Servidor web, rotas, lógica de negócio |
| **Autenticação** | Flask-Login | Gerenciamento de sessões, decorators `@login_required` |
| **Segurança** | Werkzeug | Hashing de senhas (`generate_password_hash` / `check_password_hash`) |
| **Banco de Dados** | SQLite 3 | Persistência local em arquivo (`data/protocolo.db`) |
| **Extração de PDF** | pdfplumber | Leitura e parsing de PDFs estruturados do SILOMS |
| **Frontend** | Bootstrap 5.3 + Bootstrap Icons | Interface responsiva, cards, tabelas, modals |
| **Templating** | Jinja2 | Templates HTML com herança e blocos dinâmicos |
| **PWA** | Service Worker + Manifest | Instalação na tela inicial, experiência nativa |

---

## 🏛️ Arquitetura do Sistema

O PROTNM segue uma arquitetura **MVC (Model-View-Controller)** simplificada com separação clara entre camadas:

```
┌──────────────────────────────────────────────────────────┐
│                    NAVEGADOR / PWA                        │
│             (Bootstrap 5 + JavaScript)                   │
└──────────────────────┬───────────────────────────────────┘
                       │  HTTP / Fetch API
┌──────────────────────▼───────────────────────────────────┐
│                   FLASK (app.py)                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  CONTROLLER LAYER (Rotas)                           │ │
│  │  /login  /nova_rmm  /rmm/<id>  /api/conferir_item  │ │
│  │  /rmm/<id>/autorizar  /rmm/<id>/assinar  /logout    │ │
│  └─────────────────────────┬───────────────────────────┘ │
│                             │                             │
│  ┌──────────────────────────▼──────────────────────────┐ │
│  │  MODEL LAYER (src/database.py)                      │ │
│  │  init_database()  criar_usuario()  verificar_login()│ │
│  │  criar_rmm()  autorizar_rmm_db()  listar_rmms()    │ │
│  │  registrar_assinatura_secao()  conferir_item_db()   │ │
│  └──────────────────────────┬──────────────────────────┘ │
│                             │                             │
│  ┌──────────────────────────▼──────────────────────────┐ │
│  │  SERVICE LAYER (src/pdf_extractor.py)               │ │
│  │  extrair_rmm_pdf() — Parsing + Heurística destino   │ │
│  └─────────────────────────────────────────────────────┘ │
└──────────────────────┬───────────────────────────────────┘
                       │  sqlite3
┌──────────────────────▼───────────────────────────────────┐
│                SQLite (data/protocolo.db)                 │
│  [users] [rmms] [itens] [assinaturas]                    │
└──────────────────────────────────────────────────────────┘
```

---

## 📁 Estrutura de Diretórios

```
PROTNM/
├── app.py                      # Ponto de entrada: servidor Flask, rotas, controllers
├── criar_users.py              # Script de seed: cria usuários iniciais no banco
├── requirements.txt            # Dependências Python do projeto
│
├── src/                        # Camada de lógica de negócio
│   ├── database.py             # Model Layer: esquema SQL, CRUD, autenticação
│   └── pdf_extractor.py        # Serviço de parsing de PDFs de RMM (pdfplumber)
│
├── templates/                  # Templates Jinja2 (View Layer)
│   ├── base.html               # Layout base: navbar, PWA meta tags, modal de ajuda
│   ├── login.html              # Tela de autenticação
│   ├── index.html              # Dashboard principal: listagem de RMMs com status
│   ├── novo_rmm.html           # Formulário de upload de PDF + seleção de destinos
│   └── conferencia.html        # Tela de conferência item a item + assinatura
│
├── static/                     # Arquivos estáticos
│   ├── manifest.json           # Configuração PWA (nome, ícones, theme_color)
│   ├── sw.js                   # Service Worker mínimo (pass-through)
│   └── images/                 # Ícones PWA
│       ├── icon-192.png        # Ícone 192×192px (tela inicial Android/iOS)
│       └── icon-512.png        # Ícone 512×512px (splash screen)
│
├── data/                       # Diretório do banco de dados (criado automaticamente)
│   └── protocolo.db            # Banco SQLite com todas as tabelas
│
├── uploads/                    # Diretório de PDFs enviados (criado automaticamente)
│   └── *.pdf                   # Arquivos PDF das RMMs processadas
│
└── .venv/                      # Ambiente virtual Python (ignorar no versionamento)
```

---

## 🗃️ Modelo de Dados (SQLite)

O banco de dados `protocolo.db` é composto por **4 tabelas** relacionadas entre si:

### Diagrama Entidade-Relacionamento

```
┌──────────────┐        ┌──────────────────────┐        ┌──────────────────┐
│    users     │        │        rmms          │        │      itens       │
├──────────────┤        ├──────────────────────┤        ├──────────────────┤
│ id       PK  │        │ id             PK    │◄──────┐│ id           PK  │
│ username UQ  │        │ numero_rmm     UQ    │       ││ rmm_id       FK  │──┐
│ password_hash│        │ data_geracao         │       ││ item_numero      │  │
│ nome_completo│        │ secao_origem         │       ││ classe           │  │
│ role         │        │ secao_destino        │       ││ niin             │  │
│ secao        │        │ status               │       ││ pn               │  │
└──────────────┘        │ pdf_path             │       ││ descricao        │  │
                        │ criado_por           │       ││ quantidade_env   │  │
                        │ autorizado_por       │       ││ quantidade_rec   │  │
                        │ autorizado_em        │       ││ unidade          │  │
                        │ data_registro        │       ││ pedido_me        │  │
                        └──────────────────────┘       ││ gmm              │  │
                                  │                    ││ status           │  │
                                  │                    ││ observacao       │  │
                        ┌─────────▼──────────┐         │└──────────────────┘  │
                        │   assinaturas      │         │                      │
                        ├────────────────────┤         │                      │
                        │ id            PK   │         │                      │
                        │ rmm_id        FK   │─────────┘                      │
                        │ secao              │                                │
                        │ usuario            │                                │
                        │ data_assinatura    │                                │
                        │ UQ(rmm_id, secao)  │                                │
                        └────────────────────┘                                │
                                                                              │
                                                              FK: rmm_id ─────┘
```

### Detalhamento das Tabelas

#### `users` — Usuários do Sistema
| Coluna | Tipo | Restrição | Descrição |
|--------|------|-----------|-----------|
| `id` | INTEGER | PK, AUTO | Identificador único |
| `username` | TEXT | UNIQUE, NOT NULL | Login do usuário |
| `password_hash` | TEXT | NOT NULL | Hash Werkzeug da senha |
| `nome_completo` | TEXT | NOT NULL | Nome de guerra / posto + nome |
| `role` | TEXT | DEFAULT `'operador'` | Papel no sistema: `admin`, `tsre`, `operador` |
| `secao` | TEXT | DEFAULT `'GERAL'` | Seção a que pertence: `TSRE`, `TSAU`, `TSAM`, `TSAE`, `TSAS`, `SSS` |

#### `rmms` — Relações de Materiais Movimentados
| Coluna | Tipo | Restrição | Descrição |
|--------|------|-----------|-----------|
| `id` | INTEGER | PK, AUTO | Identificador interno |
| `numero_rmm` | TEXT | UNIQUE, NOT NULL | Número da RMM extraído do PDF |
| `data_geracao` | DATE | — | Data da RMM conforme consta no PDF |
| `secao_origem` | TEXT | DEFAULT `'TSRE'` | Seção remetente (sempre TSRE) |
| `secao_destino` | TEXT | NOT NULL | Seções destinatárias separadas por vírgula (ex.: `"TSAU,SSS"`) |
| `status` | TEXT | DEFAULT `'AGUARDANDO_AUTORIZACAO'` | Estado atual da RMM no ciclo de vida |
| `pdf_path` | TEXT | — | Caminho absoluto do arquivo PDF armazenado |
| `criado_por` | TEXT | — | Nome de quem fez o upload |
| `autorizado_por` | TEXT | — | Nome de quem autorizou o envio |
| `autorizado_em` | DATETIME | — | Timestamp da autorização (fuso BRT, UTC-3) |
| `data_registro` | DATETIME | DEFAULT `CURRENT_TIMESTAMP` | Timestamp de criação do registro |

#### `itens` — Itens Individuais de Cada RMM
| Coluna | Tipo | Restrição | Descrição |
|--------|------|-----------|-----------|
| `id` | INTEGER | PK, AUTO | Identificador do item |
| `rmm_id` | INTEGER | FK → `rmms(id)`, NOT NULL | RMM à qual pertence |
| `item_numero` | INTEGER | — | Número sequencial do item na RMM |
| `classe` | TEXT | — | Classe do material (4 dígitos) |
| `niin` | TEXT | — | NATO Item Identification Number |
| `pn` | TEXT | — | Part Number do fabricante |
| `descricao` | TEXT | — | Descrição do material |
| `quantidade_env` | REAL | — | Quantidade enviada pela TSRE |
| `quantidade_rec` | REAL | DEFAULT `0` | Quantidade recebida pela seção destino |
| `unidade` | TEXT | — | Unidade de medida (UN, KG, MT, etc.) |
| `pedido_me` | TEXT | — | Número do Pedido/ME vinculado |
| `gmm` | TEXT | — | Código GMM associado |
| `status` | TEXT | DEFAULT `'PENDENTE'` | `PENDENTE` ou `CONFERIDO` |
| `observacao` | TEXT | — | Observações livres sobre o item |

#### `assinaturas` — Registro de Assinaturas Digitais por Seção
| Coluna | Tipo | Restrição | Descrição |
|--------|------|-----------|-----------|
| `id` | INTEGER | PK, AUTO | Identificador da assinatura |
| `rmm_id` | INTEGER | FK → `rmms(id)`, NOT NULL | RMM assinada |
| `secao` | TEXT | NOT NULL | Seção que está assinando (ex.: `TSAU`) |
| `usuario` | TEXT | NOT NULL | Nome de quem assinou |
| `data_assinatura` | DATETIME | DEFAULT `CURRENT_TIMESTAMP` | Timestamp da assinatura (BRT) |
| — | — | `UNIQUE(rmm_id, secao)` | Impede mesma seção assinar duas vezes |

---

## 🔄 Fluxo de Negócio (RMM Lifecycle)

O ciclo de vida completo de uma RMM segue 5 etapas claramente definidas:

```
   ┌───────────────┐     ┌────────────────┐     ┌──────────────┐
   │  1. UPLOAD    │────►│ 2. AGUARDANDO  │────►│ 3. AUTORIZADO│
   │  (PDF → Parse)│     │  AUTORIZAÇÃO   │     │  (Liberado)  │
   └───────────────┘     └────────────────┘     └──────┬───────┘
                                                       │
                              ┌─────────────────┐      │
                              │  5. RECEBIDO    │◄─────┤
                              │ (Todas seções   │      │
                              │  assinaram)     │      │
                              └─────────────────┘      │
                                       ▲               │
                              ┌────────┴────────┐      │
                              │  4. PARCIAL     │◄─────┘
                              │ (Apenas algumas │
                              │  seções assinar.)│
                              └─────────────────┘
```

### Descrição Detalhada de Cada Etapa

| Etapa | Status | Ator | Ação |
|-------|--------|------|------|
| **1** | — | TSRE/Admin | Faz upload do PDF. O sistema extrai dados e sugere destinos. O operador confirma/ajusta as seções. |
| **2** | `AGUARDANDO_AUTORIZACAO` | — | A RMM fica invisível para operadores. Apenas TSRE/Admin a vê no painel. |
| **3** | `AUTORIZADO` | TSRE/Admin | Clica em "Autorizar Envio". A RMM aparece no painel dos operadores das seções destino. |
| **4** | `PARCIAL` | Operador | Uma ou mais seções assinaram, mas nem todas. O sistema transiciona automaticamente. |
| **5** | `RECEBIDO` | Sistema | Quando **todas** as seções de destino assinaram, o status é atualizado automaticamente. |

---

## 🔍 Motor de Extração de PDF

O módulo `src/pdf_extractor.py` é o coração do processamento automático. Ele utiliza a biblioteca `pdfplumber` para ler PDFs de RMM gerados pelo SILOMS e aplicar expressões regulares para extrair dados estruturados.

### Pipeline de Extração

```
  PDF (RMM do SILOMS)
         │
         ▼
  ┌─────────────────────┐
  │  pdfplumber.open()  │  ← Abre o PDF e itera pelas páginas
  └────────┬────────────┘
           │
           ▼
  ┌─────────────────────────────────────────────────┐
  │  ETAPA 1: Extração de Cabeçalho (Página 1)     │
  │  • Regex: MOVIMENTADOS\s*N[ºo°]:?\s*(\d+)      │ → Número RMM
  │  • Regex: Data:\s*(\d{2}/\d{2}/\d{4})           │ → Data
  └────────┬────────────────────────────────────────┘
           │
           ▼
  ┌─────────────────────────────────────────────────┐
  │  ETAPA 2: Heurística de Destino                 │
  │  • Palavras-chave TSAE: EXPEDIÇÃO, EXPEDICAO    │
  │  • Palavras-chave TSAM: AVARIADO, RECUPERÁVEL   │
  │  • Setor na linha do item: Setor PAMAGL/TSAU    │
  └────────┬────────────────────────────────────────┘
           │
           ▼
  ┌─────────────────────────────────────────────────┐
  │  ETAPA 3: Extração de Itens (Linha por Linha)   │
  │  Regex L1: ^(\d+)\s+(\d{4})\s+NIIN:\s+...      │
  │  → item, classe, niin, pn, desc, ue, qtd        │
  │  Regex L2: Pedido/ME:\s*(\d+) + GMM:\s*(\d+)    │
  └────────┬────────────────────────────────────────┘
           │
           ▼
  ┌─────────────────────┐
  │  Retorna:           │
  │  (dados_rmm, itens) │
  └─────────────────────┘
```

### Lógica de Sugestão de Destino

A heurística segue uma prioridade definida:

1. **Seleção manual do operador** (checkboxes no formulário) — maior prioridade.
2. **Detecção automática por palavras-chave** no texto do PDF.
3. **Detecção por setor na linha do item** (ex.: `Setor PAMAGL/TSAU`).
4. Se nenhum destino for detectado, o sistema **bloqueia** o cadastro e solicita seleção manual.

---

## 🛡️ Sistema de Controle de Acesso (RBAC)

O sistema implementa **Role-Based Access Control** com 3 papéis e validação por seção:

### Matriz de Permissões

| Recurso / Ação | `admin` | `tsre` | `operador` |
|-----------------|:-------:|:------:|:----------:|
| Upload de PDF (Nova RMM) | ✅ | ✅ | ❌ |
| Autorizar envio de RMM | ✅ | ✅ | ❌ |
| Ver todas as RMMs | ✅ | ✅ | ❌ |
| Ver RMMs da sua seção | ✅ | ✅ | ✅ |
| Conferir itens | ✅ | ✅ | ✅ (somente sua seção) |
| Assinar recebimento | ✅ | ❌ | ✅ (somente sua seção) |
| Gerenciar usuários | ✅ | ❌ | ❌ |
| Alterar senha | ✅ | ✅ | ✅ |

### Validações de Segurança

- **Isolamento por seção**: Operadores só veem RMMs onde `secao_destino LIKE %SUA_SECAO%`.
- **Bloqueio pré-autorização**: Operadores não acessam RMMs com status `AGUARDANDO_AUTORIZACAO`.
- **Assinatura restrita**: Só pode assinar se `current_user.secao` estiver na lista de destinos.
- **Senhas hashadas**: Todas as senhas são armazenadas com `werkzeug.security.generate_password_hash`.

---

## 📡 API Endpoints

### Rotas de Página (Server-Side Rendering)

| Método | Rota | Autenticação | Papel Mínimo | Descrição |
|--------|------|:------------:|:------------:|-----------|
| `GET/POST` | `/login` | — | — | Tela de autenticação |
| `GET` | `/logout` | ✅ | Qualquer | Encerra a sessão |
| `GET` | `/` | ✅ | Qualquer | Dashboard com listagem de RMMs |
| `GET/POST` | `/nova_rmm` | ✅ | `admin` / `tsre` | Upload de PDF e cadastro de RMM |
| `GET` | `/rmm/<id>` | ✅ | Qualquer | Tela de conferência de itens |

### Rotas de API (JSON)

| Método | Rota | Autenticação | Papel Mínimo | Request Body | Descrição |
|--------|------|:------------:|:------------:|-------------|-----------|
| `POST` | `/rmm/<id>/autorizar` | ✅ | `admin` / `tsre` | — | Altera status para `AUTORIZADO` |
| `POST` | `/api/conferir_item` | ✅ | Qualquer | `{ item_id, qtd }` | Marca item como `CONFERIDO` |
| `POST` | `/rmm/<id>/assinar` | ✅ | Qualquer* | — | Registra assinatura da seção do usuário |

> \* A assinatura valida se `current_user.secao` pertence à lista de destinos da RMM.

---

## 🎨 Interface do Usuário (Frontend)

O frontend utiliza **Bootstrap 5.3** com customizações CSS inline e **Bootstrap Icons** para uma experiência visual moderna e responsiva.

### Templates e Herança

```
base.html (Layout Mestre)
├── login.html        → Tela de login com card centralizado
├── index.html        → Dashboard: tabela de RMMs com barra de progresso
├── novo_rmm.html     → Upload de PDF + checkboxes de seções destino
└── conferencia.html  → Tabela de itens + botão de assinatura por seção
```

### Componentes Visuais

| Componente | Localização | Descrição |
|------------|------------|-----------|
| **Navbar Gradiente** | `base.html` | Barra fixa com gradiente dark (`#0f172a → #1e293b`), logo, botão de ajuda e menu dropdown do usuário |
| **Modal de Ajuda** | `base.html` | FAQ com accordion (Extramanifesto, Receber Tudo, Cores/Status, Observações, Desfazer, Busca) + aba de instalação PWA |
| **Cards com Shadow** | Todo o app | Cards sem borda com `border-radius: 12px` e `box-shadow` sutil |
| **Barra de Progresso** | `index.html` | Progress bar de 4px mostrando `itens_conferidos / total_itens` |
| **Badge de Status** | `index.html` | `AGUARDANDO` (amarelo), `AUTORIZADO` (azul), `RECEBIDO` (verde) |
| **Conferência Interativa** | `conferencia.html` | Input numérico por item + botão "OK" com Fetch API assíncrono |
| **Assinatura com Confirmação** | `conferencia.html` | Botão verde "Assinar p/ <SECAO>" com `confirm()` de segurança |

---

## 📲 PWA — Progressive Web App

O sistema é instalável como aplicativo em dispositivos móveis, oferecendo experiência nativa na pista de voo e no almoxarifado.

### Configuração

| Arquivo | Propósito |
|---------|-----------|
| `static/manifest.json` | Define nome (`Conferência CAN`), ícones, `display: standalone`, tema azul (`#0d6efd`) |
| `static/sw.js` | Service Worker mínimo com estratégia pass-through (sem cache offline para evitar bugs de versionamento) |
| `base.html` | Meta tags `apple-mobile-web-app-capable`, `theme-color`, registro do Service Worker |

### Ícones

| Tamanho | Arquivo | Uso |
|---------|---------|-----|
| 192×192 | `static/images/icon-192.png` | Tela inicial Android/iOS, favicon |
| 512×512 | `static/images/icon-512.png` | Splash screen, instalação |

---

## 🚀 Instalação e Configuração Local

### Pré-requisitos

- **Python** ≥ 3.10
- **pip** (gerenciador de pacotes Python)
- **Git** (opcional, para clonar o repositório)

### Passo a Passo

```bash
# 1. Clone o repositório (ou copie a pasta)
git clone <url-do-repositorio> PROTNM
cd PROTNM

# 2. Crie e ative o ambiente virtual
python -m venv .venv

# Windows (PowerShell)
.\.venv\Scripts\Activate.ps1

# Windows (CMD)
.\.venv\Scripts\activate.bat

# Linux/macOS
source .venv/bin/activate

# 3. Instale as dependências
pip install -r requirements.txt

# 4. Crie os usuários iniciais e inicialize o banco
python criar_users.py

# 5. Inicie o servidor de desenvolvimento
python app.py
```

### Credenciais Padrão

| Usuário | Senha | Papel | Seção |
|---------|-------|-------|-------|
| `admin` | `admin` | `admin` | TSRE |
| `tsau` | `1234` | `operador` | TSAU |

> ⚠️ **Importante**: Altere as senhas padrão antes de qualquer uso em produção.

### Acesso

Após iniciar o servidor, acesse:

```
http://localhost:5000
```

Ou, em rede local (para acesso de outros dispositivos):

```
http://<IP_DA_MÁQUINA>:5000
```

---

## ⚙️ Variáveis de Ambiente e Configuração

| Configuração | Localização | Valor Atual | Descrição |
|-------------|-------------|-------------|-----------|
| `SECRET_KEY` | `app.py` | `"segredo_militar_protocolo_v3"` | Chave de assinatura de cookies de sessão do Flask |
| `UPLOAD_FOLDER` | `app.py` | `<BASE_DIR>/uploads` | Diretório onde os PDFs enviados são armazenados |
| `DB_PATH` | `src/database.py` | `<BASE_DIR>/data/protocolo.db` | Caminho do banco de dados SQLite |
| `BRT` | `src/database.py` | `UTC-3` | Fuso horário para timestamps (Brasília) |
| Host/Porta | `app.py` | `0.0.0.0:5000` | O servidor escuta em todas as interfaces na porta 5000 |

> ⚠️ **Em produção**, é essencial substituir a `SECRET_KEY` por um valor aleatório seguro e utilizar um servidor WSGI como **Gunicorn** ou **Waitress** ao invés do servidor de desenvolvimento do Flask.

---

## 🗺️ Roadmap e Melhorias Futuras

- [ ] **Integração com Google Sheets** — Sincronização em tempo real dos dados de conferência com planilha compartilhada.
- [ ] **Relatório PDF de Protocolo** — Geração automática de documento PDF com dados da RMM e assinaturas registradas.
- [ ] **Histórico e Auditoria** — Tabela de log com todas as ações realizadas (quem fez o quê e quando).
- [ ] **Gerenciamento de Usuários via UI** — CRUD completo de usuários pelo painel administrativo (atualmente apenas via script `criar_users.py`).
- [ ] **Cache Offline no Service Worker** — Implementar estratégia cache-first para funcionamento sem internet na pista.
- [ ] **Notificações Push** — Alertar seções operacionais quando uma nova RMM for autorizada.
- [ ] **Filtros e Busca Avançada** — Pesquisa por número de RMM, data, seção ou status no dashboard.
- [ ] **Exportação CSV** — Download dos dados de conferência em formato planilha.

---

<div align="center">

**PROTNM** · Protocolo de Recebimento de Material · v2.0

Desenvolvido para uso interno · FAB

</div>
]]>
