<p align="center">
  <img src="public/Logo_navbar.png" alt="Roosevelt Contabilidade" width="280" />
</p>

<h1 align="center">Roosevelt Contabilidade</h1>

<p align="center">
  <strong>Landing Page institucional moderna com chatbot de IA integrado</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0050?logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Node-20.x-339933?logo=node.js&logoColor=white" alt="Node" />
</p>

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológica](#-stack-tecnológica)
- [Arquitetura](#-arquitetura)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Desenvolvimento Local](#-desenvolvimento-local)
- [Chatbot com IA](#-chatbot-com-ia)
- [Design System](#-design-system)
- [Seções da Landing Page](#-seções-da-landing-page)
- [SEO e Open Graph](#-seo-e-open-graph)
- [Testes](#-testes)
- [Deploy (Vercel)](#-deploy-vercel)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Solução de Problemas](#-solução-de-problemas)
- [Licença](#-licença)

---

## 🏢 Visão Geral

Website institucional de alto desempenho para a **Roosevelt Contabilidade**, escritório com mais de **60 anos de tradição** (fundado em 02/01/1965) em serviços contábeis estratégicos, localizado em Porto Alegre/RS.

O projeto foi desenvolvido para substituir o antigo site estático por uma experiência **premium, responsiva e interativa**, com foco em:

- Apresentação clara dos **4 pilares de serviço** (Fiscal, Pessoal, Contábil, Societário)
- **Prova social** através de depoimentos reais de clientes
- Narrativa da **história e tradição** do escritório
- **Chatbot inteligente** com IA para atendimento automatizado 24/7
- **Conversão de leads** via formulário e WhatsApp

---

## ✨ Funcionalidades

| Recurso | Descrição |
|---------|-----------|
| 🤖 **Chatbot IA** | Assistente virtual com base de conhecimento personalizada (Groq/OpenAI) |
| 📱 **Design Responsivo** | Layout otimizado para desktop, tablet e mobile |
| 🎬 **Animações** | Transições fluidas com Framer Motion (fade-up, fade-in, counters) |
| 🎨 **Dark Mode** | Suporte completo a tema claro/escuro |
| 📊 **Planos Interativos** | Comparativo visual dos planos Start, Gold e Premium |
| 💬 **Depoimentos** | Carrossel de avaliações reais com estrelas |
| 📞 **Contato Multicanal** | WhatsApp, telefone, e-mail e formulário Google |
| 🔗 **Área do Cliente** | Dropdown com links para portais (Roosevelt BI, Onvio, Acessórias) |
| 🏆 **Números em Destaque** | Contadores animados (+61 anos, +500 empresas, etc.) |
| 🔍 **SEO Otimizado** | Meta tags, Open Graph, robots.txt e HTML semântico |

---

## 🛠 Stack Tecnológica

### Frontend
| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| [React](https://react.dev/) | 18.3 | Biblioteca UI principal |
| [TypeScript](https://www.typescriptlang.org/) | 5.8 | Tipagem estática |
| [Vite](https://vitejs.dev/) | 5.4 | Build tool e dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Framework de estilização |
| [Shadcn/UI](https://ui.shadcn.com/) | latest | Componentes base (Radix UI) |
| [Framer Motion](https://www.framer.com/motion/) | 12.x | Animações e transições |
| [React Router DOM](https://reactrouter.com/) | 6.30 | Roteamento SPA |
| [TanStack Query](https://tanstack.com/query) | 5.83 | Gerenciamento de estado async |
| [Lucide React](https://lucide.dev/) | 0.462 | Ícones SVG |
| [Embla Carousel](https://www.embla-carousel.com/) | 8.6 | Carrossel de depoimentos |

### Backend (Serverless)
| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| [Vercel Edge Functions](https://vercel.com/docs/functions/edge-functions) | — | API serverless (chatbot) |
| [Express](https://expressjs.com/) | 5.2 | Servidor local de desenvolvimento |
| [OpenAI SDK](https://platform.openai.com/) | 6.18 | Integração GPT-4o-mini |
| [Vercel AI SDK](https://sdk.vercel.ai/) | 6.0 | Abstração de IA |
| [Groq](https://groq.com/) | — | Llama 4 Scout (alternativa) |

### Qualidade de Código
| Ferramenta | Finalidade |
|------------|------------|
| ESLint 9 | Linting (React Hooks + Refresh) |
| Vitest 3.2 | Testes unitários |
| Testing Library | Testes de componentes |

---

## 🏗 Arquitetura

```
┌──────────────────────────────────────────────────────────────┐
│                        BROWSER (SPA)                         │
│                                                              │
│  ┌──────────┐  ┌──────────────┐  ┌─────────────────────────┐│
│  │  React   │  │ React Router │  │   TanStack Query        ││
│  │  18.3    │  │   (SPA)      │  │   (Cache & Sync)        ││
│  └──────────┘  └──────────────┘  └─────────────────────────┘│
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │               Componentes (Shadcn/UI + Custom)           ││
│  │  Header · Hero · Services · History · Plans · Contact    ││
│  │  ChatWidget · Footer · DifferentialsSection · Numbers    ││
│  └──────────────────────────────────────────────────────────┘│
└─────────────────────────┬────────────────────────────────────┘
                          │ POST /api/chat
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                   SERVERLESS (Vercel Edge)                    │
│                                                              │
│  ┌──────────────┐    ┌─────────────┐    ┌─────────────────┐ │
│  │  api/chat.ts │───▶│   llm.ts    │───▶│  Groq / OpenAI  │ │
│  │  (Endpoint)  │    │  (Router)   │    │  (LLM Provider) │ │
│  └──────────────┘    └─────────────┘    └─────────────────┘ │
│                             │                                │
│                      ┌──────┴───────┐                        │
│                      │  ai/config   │                        │
│                      │ (System      │                        │
│                      │  Prompt +    │                        │
│                      │  Knowledge)  │                        │
│                      └──────────────┘                        │
└──────────────────────────────────────────────────────────────┘
```

### Fluxo do Chat
1. O usuário envia uma mensagem via `ChatWidget.tsx`
2. O frontend faz `POST /api/chat` com o array de messages
3. O endpoint (`api/chat.ts`) chama `generateReply()` de `llm.ts`
4. O LLM Router injeta o `SYSTEM_PROMPT` (base de conhecimento) e roteia para **Groq** (Llama 4 Scout) ou **OpenAI** (GPT-4o-mini)
5. A resposta é retornada como JSON ao frontend

---

## 📁 Estrutura de Diretórios

```
roosevelt-contabilidade/
│
├── api/                          # Serverless Functions (Vercel Edge)
│   └── chat.ts                   #   Endpoint POST /api/chat
│
├── public/                       # Assets estáticos (copiados para dist)
│   ├── Imagem_hero.png           #   Imagem principal do Hero
│   ├── Logo_navbar.png           #   Logo da navbar
│   ├── favicon.ico               #   Favicon
│   ├── robots.txt                #   Configuração de crawlers
│   ├── images/                   #   Imagens adicionais
│   └── placeholder.svg           #   SVG fallback
│
├── src/
│   ├── main.tsx                  # Entry point React
│   ├── App.tsx                   # Root component + providers
│   ├── App.css                   # Estilos globais do App
│   ├── index.css                 # Design tokens + Tailwind layers
│   ├── vite-env.d.ts             # Tipagens Vite
│   │
│   ├── assets/                   # Assets importados pelo bundler
│   │
│   ├── components/
│   │   ├── chat/
│   │   │   └── ChatWidget.tsx    #   Widget flutuante de chat com IA
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx        #   Navbar fixa com scroll-aware
│   │   │   └── Footer.tsx        #   Rodapé com contatos e links
│   │   │
│   │   ├── navbar/
│   │   │   └── ClientAreaDropdown.tsx  # Dropdown "Área do Cliente"
│   │   │
│   │   ├── sections/             # Seções da landing page
│   │   │   ├── Hero.tsx          #   Banner principal + CTA
│   │   │   ├── DifferentialsSection.tsx  # Diferenciais da empresa
│   │   │   ├── Services.tsx      #   Serviços (Fiscal, Pessoal, etc.)
│   │   │   ├── History.tsx       #   Linha do tempo / história
│   │   │   ├── Partners.tsx      #   Equipe e parceiros
│   │   │   ├── Numbers.tsx       #   Métricas com contadores
│   │   │   ├── Testimonials.tsx  #   Carrossel de depoimentos
│   │   │   ├── PlansSection.tsx  #   Planos (Start, Gold, Premium)
│   │   │   └── Contact.tsx       #   Formulário e dados de contato
│   │   │
│   │   └── ui/                   # ~51 componentes Shadcn/UI
│   │       ├── Animations.tsx    #   Wrapper Framer Motion
│   │       ├── NavLink.tsx       #   Link de navegação customizado
│   │       ├── button.tsx        #   Botão (variants)
│   │       ├── card.tsx          #   Card
│   │       ├── accordion.tsx     #   Accordion
│   │       ├── carousel.tsx      #   Carrossel (Embla)
│   │       ├── dialog.tsx        #   Modal
│   │       ├── toast.tsx         #   Notificações
│   │       ├── sonner.tsx        #   Toast (Sonner)
│   │       └── ...               #   (e mais 42 componentes)
│   │
│   ├── content/                  # Gerenciamento de conteúdo
│   │   ├── services.json         #   Dados dos serviços
│   │   ├── plans.json            #   Dados dos planos
│   │   ├── plans.ts              #   Lógica dos planos
│   │   ├── testimonials.json     #   Depoimentos
│   │   ├── testimonials.ts       #   Lógica dos depoimentos
│   │   ├── team.json             #   Dados da equipe
│   │   ├── differentials.ts      #   Diferenciais da empresa
│   │   └── clientPortals.ts      #   Links dos portais do cliente
│   │
│   ├── hooks/                    # Custom React Hooks
│   │   ├── use-mobile.tsx        #   Detecção de dispositivo mobile
│   │   └── use-toast.ts          #   Hook de notificações
│   │
│   ├── lib/                      # Utilitários e configurações
│   │   ├── ai/
│   │   │   └── config.ts         #   System Prompt + AI_CONFIG
│   │   ├── llm.ts                #   Router multi-provider (Groq/OpenAI)
│   │   ├── constants.ts          #   Constantes globais (contatos, ano)
│   │   └── utils.ts              #   Utilitários (cn, clsx)
│   │
│   ├── pages/                    # Rotas da aplicação
│   │   ├── Index.tsx             #   Página principal (landing page)
│   │   └── NotFound.tsx          #   Página 404
│   │
│   └── test/                     # Configuração de testes
│       ├── setup.ts              #   Setup Vitest + Testing Library
│       └── example.test.ts       #   Teste de exemplo
│
├── index.html                    # Template HTML (SEO + OG tags)
├── server.ts                     # Servidor Express para dev local
├── vite.config.ts                # Configuração Vite (proxy, chunks)
├── vitest.config.ts              # Configuração Vitest
├── tailwind.config.ts            # Configuração Tailwind + Design Tokens
├── postcss.config.js             # PostCSS (Tailwind + Autoprefixer)
├── eslint.config.js              # ESLint flat config
├── tsconfig.json                 # TypeScript base
├── tsconfig.app.json             # TypeScript para aplicação
├── tsconfig.node.json            # TypeScript para Node (config files)
├── components.json               # Configuração Shadcn/UI
├── package.json                  # Dependências e scripts
├── .env.example                  # Template de variáveis de ambiente
├── .gitignore                    # Exclusões do Git
├── Informacoes_IA.md             # Base de conhecimento da IA (fonte)
└── README.md                     # Este arquivo
```

---

## 📌 Pré-requisitos

- **Node.js** `20.x` (obrigatório — definido em `engines`)
- **npm** `9+` ou equivalente (yarn, pnpm, bun)
- **Conta na Vercel** (para deploy e Vercel CLI)
- **Chave de API**: Groq (gratuito) e/ou OpenAI (pago) para o chatbot

---

## 🚀 Instalação e Configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/roosevelt-contabilidade.git
cd roosevelt-contabilidade
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha suas chaves:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:

```env
# Provider de IA (escolha um)
LLM_PROVIDER=groq          # 'groq' (padrão) ou 'openai'

# Groq (Llama 4 Scout — gratuito)
GROQ_API_KEY=gsk_xxxxxxxxxxxx

# OpenAI (GPT-4o-mini — pago)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx
```

> **Dica**: O Groq é recomendado para desenvolvimento por ser gratuito e rápido. O OpenAI é indicado para produção pela qualidade superior das respostas.

---

## 💻 Desenvolvimento Local

### Opção 1 — Frontend + Backend local (recomendado)

Roda o Vite (frontend na porta `8080`) + Express (API na porta `3001`) simultaneamente, com proxy automático:

```bash
npm run start:local
```

O Vite já está configurado para fazer proxy de `/api` → `http://localhost:3001`, então o chatbot funciona automaticamente.

### Opção 2 — Vercel CLI (simula produção)

Usa o Vercel Dev para emular o ambiente serverless real:

```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Rodar com todas as funções serverless
vercel dev
```

### Opção 3 — Somente frontend (sem chatbot)

```bash
npm run dev
```

> ⚠️ Neste modo, o endpoint `/api/chat` não estará disponível. O chatbot não funcionará.

O servidor de desenvolvimento estará disponível em: **http://localhost:8080**

---

## 🤖 Chatbot com IA

### Visão Geral

O chatbot é um assistente virtual especializado que atua como consultor da Roosevelt Contabilidade, respondendo dúvidas sobre serviços, planos e processos.

### Arquitetura

```
ChatWidget.tsx  →  POST /api/chat  →  llm.ts  →  Groq/OpenAI
      ↑                                  ↑
   (Frontend)                     (System Prompt +
                                   Knowledge Base)
```

### Arquivos Principais

| Arquivo | Responsabilidade |
|---------|------------------|
| `src/lib/ai/config.ts` | **Cérebro da IA** — System Prompt, base de conhecimento, configuração do modelo (temperatura, max tokens) |
| `src/lib/llm.ts` | **Router LLM** — Seleciona provider (Groq/OpenAI), faz chamadas HTTP diretas às APIs |
| `api/chat.ts` | **Endpoint Serverless** — Edge Function que processa mensagens (Vercel) |
| `server.ts` | **Servidor Local** — Express para desenvolvimento (substitui Edge Function) |
| `src/components/chat/ChatWidget.tsx` | **Interface** — Widget flutuante de chat com UX completa |
| `Informacoes_IA.md` | **Fonte de conhecimento** — FAQ e regras de negócio (referência) |

### Providers Suportados

| Provider | Modelo | Custo | Uso Recomendado |
|----------|--------|-------|-----------------|
| **Groq** | `meta-llama/llama-4-scout-17b-16e-instruct` | Gratuito | Desenvolvimento / MVP |
| **OpenAI** | `gpt-4o-mini` | Pago | Produção |

### Configuração do Modelo

```typescript
// src/lib/ai/config.ts
export const AI_CONFIG = {
  temperature: 0.25,    // Baixa — respostas consistentes e precisas
  maxTokens: 500,       // Balanceado para respostas completas
};
```

### Atualizando o Conhecimento da IA

1. Edite o arquivo `src/lib/ai/config.ts`
2. Modifique a constante `SYSTEM_PROMPT` com as novas informações
3. Ajuste `AI_CONFIG` se necessário (temperatura, tokens)
4. Faça commit e push — o deploy atualiza automaticamente

### Regras de Comportamento

A IA segue regras estritas definidas no System Prompt:

- ✅ Respostas curtas (2-3 linhas)
- ✅ Tom consultivo e direto (sem floreios)
- ✅ Envia links **somente** quando o usuário solicita orçamento/contato
- ❌ **Nunca** oferece: BPO Financeiro, hospitais, MEI mensal
- ❌ **Nunca** envia links em saudações genéricas ("oi", "teste")

---

## 🎨 Design System

### Paleta de Cores

O projeto usa variáveis CSS com HSL para temas claro e escuro:

| Token | Claro | Escuro | Uso |
|-------|-------|--------|-----|
| `--navy` | `213 76% 14%` | — | Cor institucional principal |
| `--trust` | `217 91% 53%` | — | Azul de confiança (CTAs) |
| `--electric` | `217 92% 60%` | — | Azul vibrante (destaques) |
| `--background` | `210 33% 98%` | `213 76% 7%` | Fundo da página |
| `--foreground` | `215 28% 25%` | `210 33% 95%` | Texto principal |

### Tipografia

| Família | Uso |
|---------|-----|
| **DM Sans** | Títulos e headings (h1–h6) |
| **Inter** | Corpo de texto e UI |

Ambas importadas via Google Fonts com pesos otimizados (300–900).

### Utilitários Customizados

```css
.text-gradient-navy  /* Gradiente navy → trust (texto) */
.hover-lift          /* Elevação suave no hover (-4px + shadow) */
.section-padding     /* Padding vertical responsivo (py-20 → py-32) */
.container-editorial /* Container com max-w-7xl + padding lateral */
.line-accent         /* Linha decorativa azul abaixo do elemento */
.custom-scrollbar    /* Scrollbar estilizada para o chat */
```

### Componentes UI

O projeto utiliza **51 componentes Shadcn/UI** pré-configurados, incluindo:
`Accordion`, `Button`, `Card`, `Carousel`, `Dialog`, `Drawer`, `Dropdown Menu`, `Form`, `Input`, `Select`, `Sheet`, `Tabs`, `Toast`, `Tooltip`, e mais.

---

## 📄 Seções da Landing Page

A página principal (`Index.tsx`) é composta por seções modulares renderizadas em sequência:

| # | Seção | Componente | Descrição |
|---|-------|------------|-----------|
| 1 | **Header** | `Header.tsx` | Navbar fixa com logo, links âncora e dropdown "Área do Cliente" |
| 2 | **Hero** | `Hero.tsx` | Banner principal com headline, CTA e imagem de fundo |
| 3 | **Diferenciais** | `DifferentialsSection.tsx` | Cards com ícones dos diferenciais da empresa |
| 4 | **Serviços** | `Services.tsx` | Grid com os 4 pilares: Fiscal, Pessoal, Contábil, Societário |
| 5 | **História** | `History.tsx` | Timeline da trajetória de 61+ anos |
| 6 | **Equipe** | `Partners.tsx` | Apresentação da equipe / parceiros |
| 7 | **Depoimentos** | `Testimonials.tsx` | Carrossel com avaliações de clientes |
| 8 | **Planos** | `PlansSection.tsx` | Comparativo Start × Gold × Premium |
| 9 | **Contato** | `Contact.tsx` | Formulário, WhatsApp, telefone e endereço |
| 10 | **Footer** | `Footer.tsx` | Links, contatos e direitos autorais |
| 🤖 | **Chat** | `ChatWidget.tsx` | Widget flutuante (overlay global) |

---

## 🔍 SEO e Open Graph

### Meta Tags (index.html)

```html
<title>Roosevelt Contabilidade | Contabilidade Estratégica</title>
<meta name="description" content="Contabilidade estratégica com mais de 60 anos..." />
<meta property="og:title" content="Roosevelt Contabilidade | Contabilidade Estratégica" />
<meta property="og:description" content="Contabilidade estratégica com solidez..." />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

### robots.txt

Todos os crawlers relevantes estão permitidos (Googlebot, Bingbot, Twitterbot, Facebook).

### Boas Práticas Implementadas

- ✅ HTML semântico (`<main>`, `<header>`, `<footer>`, `<section>`)
- ✅ Hierarquia de headings (h1 único por página)
- ✅ Scroll suave (`scroll-behavior: smooth`)
- ✅ `lang="pt-BR"` no HTML
- ✅ Viewport meta tag
- ✅ Google Fonts otimizado (`display=swap`)

---

## 🧪 Testes

### Configuração

- **Framework**: Vitest 3.2
- **Ambiente**: jsdom
- **Utilities**: Testing Library (React)
- **Setup**: `src/test/setup.ts`

### Executar Testes

```bash
# Rodar uma vez
npm test

# Modo watch (desenvolvimento)
npm run test:watch
```

### Testar o Chat (manual)

```bash
npm run test:chat
```

---

## 🚢 Deploy (Vercel)

### Deploy Automático (CI/CD)

O projeto está configurado para deploy contínuo via GitHub + Vercel.

### Passo a Passo Manual

1. **GitHub** — Faça push para a branch `main`:
   ```bash
   git push origin main
   ```

2. **Vercel** — Importe o projeto do GitHub:
   - O framework (**Vite**) é detectado automaticamente
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Node.js Version**: `20.x`

3. **Variáveis de Ambiente** — Configure no painel da Vercel:
   - `OPENAI_API_KEY` ou `GROQ_API_KEY`
   - `LLM_PROVIDER` (opcional, padrão: `groq`)

4. **Serverless Functions** — A pasta `api/` é detectada automaticamente pela Vercel e cria a rota `/api/chat` como Edge Function.

### Otimização de Build

O `vite.config.ts` já inclui configurações de performance:

```typescript
build: {
  chunkSizeWarningLimit: 1000,
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],           // ~140KB
        ui: ['@radix-ui/react-*'],                // ~200KB (27 pacotes)
      },
    },
  },
},
```

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o Vite dev server (porta 8080) |
| `npm run build` | Build de produção → `dist/` |
| `npm run build:dev` | Build em modo development |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Executa ESLint (TypeScript) |
| `npm test` | Executa testes unitários (Vitest) |
| `npm run test:watch` | Testes em modo watch |
| `npm run test:chat` | Testa endpoint do chat via CLI |
| `npm run start:local` | Frontend + Backend simultâneos (concurrently) |

---

## 🔐 Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|:-----------:|-----------|
| `LLM_PROVIDER` | Não | Provider da IA: `groq` (padrão) ou `openai` |
| `GROQ_API_KEY` | Sim* | Chave da API Groq ([console.groq.com/keys](https://console.groq.com/keys)) |
| `OPENAI_API_KEY` | Sim* | Chave da API OpenAI ([platform.openai.com](https://platform.openai.com/api-keys)) |
| `USE_GROQ` | Não | Legado — use `LLM_PROVIDER` em vez disso |

> \* Pelo menos uma chave é obrigatória, dependendo do provider escolhido.

---

## 🔧 Solução de Problemas

### Chat não responde

| Causa | Solução |
|-------|---------|
| Chave de API inválida | Verifique a variável `GROQ_API_KEY` ou `OPENAI_API_KEY` |
| Sem créditos (OpenAI) | Verifique o saldo em [platform.openai.com/usage](https://platform.openai.com/usage) |
| Provider errado | Verifique `LLM_PROVIDER` no `.env` |
| API não disponível (local) | Use `npm run start:local` em vez de `npm run dev` |

### Erro de Build

| Causa | Solução |
|-------|---------|
| Chunk Size Warning | Apenas informativo — já otimizado via `manualChunks` |
| TypeScript errors | Execute `npx tsc --noEmit` para verificar tipos |
| Node.js incompatível | Garanta Node 20.x (`node -v`) |

### Fontes não carregam

- Verifique a conexão de internet (Google Fonts é carregado via CDN)
- Limpe o cache do navegador

### Deploy falha na Vercel

- Verifique se as variáveis de ambiente estão configuradas no dashboard
- Confirme que `api/chat.ts` está na raiz do projeto (não dentro de `src/`)
- Verifique os logs de build em `vercel.com/dashboard`

---

## 📄 Licença

Projeto privado — Todos os direitos reservados © Roosevelt Contabilidade.

---

<p align="center">
  Desenvolvido com ☕ e 💙 para a <strong>Roosevelt Contabilidade</strong>
</p>