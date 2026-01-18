# 🚀 Como Rodar o Portfólio

## Instalação

1. **Instalar dependências:**
```bash
npm install
```

## Desenvolvimento

2. **Rodar servidor de desenvolvimento:**
```bash
npm run dev
```

3. **Abrir no navegador:**
```
http://localhost:3000
```

O site vai recarregar automaticamente quando você editar arquivos.

---

## Build de Produção

Para gerar a versão otimizada para deploy:

```bash
npm run build
npm run start
```

---

## Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| Dev | `npm run dev` | Servidor de desenvolvimento (porta 3000) |
| Build | `npm run build` | Build de produção otimizado |
| Start | `npm run start` | Serve a build de produção |
| Lint | `npm run lint` | Verifica código com ESLint |

---

## Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **Framer Motion** - Animações
- **shadcn/ui** - Componentes UI

---

## Estrutura do Projeto

```
site_portifolio_2.0/
├── app/                    # Rotas e layouts (App Router)
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout raiz
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── hero-section.tsx
│   ├── vaultis-showcase.tsx
│   ├── projects-carousel.tsx
│   └── ...
├── lib/                   # Utilitários
│   └── animations.ts
├── public/               # Arquivos estáticos
│   └── images/
└── scripts/              # Scripts auxiliares
    └── optimize-images.js
```

---

## 🎨 Redesign Completo

Mudanças implementadas:
- ✅ Headline específica com números reais
- ✅ Tipografia Space Grotesk (diferenciada)
- ✅ Seção exclusiva Vaultis
- ✅ Microinterações nos cards
- ✅ Background customizado (sem gradientes genéricos)
- ✅ Prova social com métricas
- ✅ CTAs otimizados com WhatsApp direto
- ✅ Hover states profissionais
- ✅ Responsividade mobile

---

## 📱 Testar no Mobile

```bash
# Descobrir seu IP local
ipconfig

# Acessar de outro dispositivo na mesma rede
http://[SEU_IP]:3000
```

---

## Problemas Comuns

**Porta 3000 ocupada?**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [número] /F

# Ou use outra porta
npm run dev -- -p 3001
```

**Erro de módulos?**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

*Redesign implementado com foco em eliminar padrões visuais de IA e maximizar conversões.*
