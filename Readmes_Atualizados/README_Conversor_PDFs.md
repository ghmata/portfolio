# 📄 PDF Extractor Pro

> Aplicação desktop para extração em lote de tabelas PDF para Excel

## ✨ Funcionalidades

- 📂 **Seleção de pasta** - Processa todos os PDFs de uma vez
- 📊 **Extração de tabelas** - Converte tabelas PDF para Excel automaticamente
- 🔍 **Classificação automática** - Separa PDFs convertidos, escaneados e com falhas
- 📋 **Relatório consolidado** - Gera Excel master com todos os dados
- 🎨 **Interface premium** - GUI moderna com tema escuro e verde neon
- 📈 **Barra de progresso** - Acompanhamento em tempo real
- 🖥️ **Log de execução** - Terminal integrado com feedback visual

## 🚀 Como Usar

1. Execute o script:
```bash
python converter_pdfs.py
```

2. Clique em "Buscar Pasta" e selecione a pasta com seus PDFs
3. Clique em "INICIAR PROCESSAMENTO"
4. Aguarde o processamento

## 📁 Estrutura de Saída

Após o processamento, a pasta terá:
```
📂 Pasta_Original/
├── 📂 01_Convertidos/          # PDFs convertidos com sucesso
│   ├── documento1.xlsx
│   └── documento2.xlsx
├── 📂 02_Escaneados_Sem_Texto/ # PDFs que são imagens (sem texto)
├── 📂 03_Falhas_Corrompidos/   # PDFs que deram erro
└── 📊 Relatorio_Geral_Master.xlsx  # Consolidado de todos os dados
```

## 🛠️ Tecnologias

- **Python 3.8+**
- **CustomTkinter** - Interface gráfica moderna
- **pdfplumber** - Extração de tabelas de PDFs
- **pandas** - Manipulação de dados e exportação Excel

## 📦 Dependências

```bash
pip install customtkinter pdfplumber pandas openpyxl
```

## 📸 Preview

Interface com:
- Sidebar com menu de navegação
- Seletor de tema (Dark/Light/System)
- Card de ação com barra de progresso
- Terminal de log com estilo "hacker"

---

Desenvolvido para automação de extração de dados de manifestos e documentos tabulares.
