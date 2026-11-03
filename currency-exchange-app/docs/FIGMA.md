# 🎨 Protótipos e Design System no Figma — Hermes Currency App

## 1. Link Oficial do Protótipo

O protótipo interativo e o layout do projeto foram concebidos e detalhados na ferramenta Figma e podem ser acessados através do link abaixo:

🔗 **Figma:** [Protótipo de App de Conversão (Hermes)](https://www.figma.com/make/GKwWQToZbbIJ4HcDSUUFtk/Prototipo-de-app-de-convers%C3%A3o--Copy-?t=DxCf0OszhArwWoXm-1)

---

## 2. Visão Geral do Design e Identidade Visual

O design do **Hermes** foi projetado seguindo conceitos modernos de **Fintechs**, priorizando clareza de dados, alta legibilidade, contraste balanceado e paleta com identidade institucional forte.

### 2.1. Paleta de Cores

| Cor / Token | Código Hexadecimal | Tailwind Utility | Aplicação no Projeto |
| :--- | :--- | :--- | :--- |
| **Emerald Primary** | `#022c22` | `bg-emerald-950` / `text-emerald-950` | Fundo do conversor de moedas, títulos institucionais e botões primários |
| **Emerald Accent** | `#047857` / `#059669` | `bg-emerald-700` / `stroke-emerald-600` | Linha e gradiente do gráfico, variações cambiais positivas |
| **Emerald Soft (Cards)** | `#d1fae5` / `#a7f3d0` | `bg-emerald-100` / `border-emerald-200` | Fundo e borda dos cards de moedas principais com cotação em alta/estável |
| **Danger Soft (Cards)** | `#fee2e2` / `#fecaca` | `bg-red-100` / `border-red-200` | Fundo e borda dos cards de moedas principais com cotação em baixa |
| **Slate Background** | `#f8fafc` / `#ffffff` | `bg-slate-50` / `bg-white` | Fundo principal da aplicação e cards de input |
| **Border & Divider** | `#e2e8f0` / `#cbd5e1` | `border-gray-200` / `bg-slate-200` | Divisores sutis e bordas dos cards analíticos |
| **Text Dark** | `#0f172a` | `text-gray-900` | Valores monetários e dados de cotação |
| **Text Muted** | `#64748b` | `text-slate-500` / `text-gray-400` | Subtítulos, rótulos e metadados informativos |
| **Danger / Loss** | `#ef4444` / `#b91c1c` | `text-red-500` / `text-red-700` | Variações cambiais diárias negativas |

### 2.2. Tipografia
- **Família:** Sans-serif moderna do sistema.
- **Hierarquia:**
  - *Tagline:* `text-xs font-bold tracking-widest uppercase` (HERMES / CLAREZA PARA SUAS DECISÕES).
  - *Hero Title:* `text-3xl` a `text-6xl font-extrabold tracking-tight`.
  - *Valores em Destaque:* `text-2xl` a `text-3xl font-semibold`.
  - *Corpo e Rótulos:* `text-sm` e `text-xs font-medium`.

### 2.3. Formas e Elevações
- **Bordas arredondadas:** Cantos suaves (`rounded-2xl` de 16px e `rounded-xl` de 12px).
- **Sombras:** Sutis e discretas (`shadow-xs`, `shadow-sm` e `shadow-xl` no container do conversor).

---

## 3. Telas e Seções Mapeadas do Figma

### 3.1. Barra de Navegação Superior (Header)
- Marca com logotipo HERMES em caixa alta com espaçamento ampliado (`tracking-widest`).
- Avatar institucional circular.
- Seletor de idioma em formato *segmented pill* (`PT`, `EN`, `ES`), destacando visualmente o idioma ativo com fundo branco e sombra.

### 3.2. Seção Hero (Title)
- Identificador com tagline verde escura.
- Título principal com alto impacto: *"Câmbio, sem complicação."*.
- Subtítulo explicativo contextualizando o serviço.

### 3.3. Cards das Moedas Principais (TopCurrencyCards)
- Grid de alta visibilidade apresentando as 5 moedas mais negociadas do mundo (`USD`, `EUR`, `GBP`, `JPY`, `CNY`).
- Bandeiras em emoji para rápida identificação visual.
- Dinâmica de cores semântica: cards em verde claro (`bg-emerald-100`) para variação positiva e vermelho claro (`bg-red-100`) para variação negativa.
- A moeda base selecionada no conversor exibe automaticamente o valor `1,0000` e o selo institucional *"Moeda base"*.
- Layout adaptativo: 2 colunas no mobile (com o 5º card expandido horizontalmente), 3 colunas no tablet e 5 colunas no desktop.

### 3.4. Painel Conversor de Moedas (CurrencyField)
- Caixa de destaque em tom verde-esmeralda escuro (`#022c22`).
- Dois cartões brancos internos (`CurrencyInput`) contendo:
  - Rótulo ("Você envia" / "Você recebe").
  - Prefixo da moeda e campo de digitação de valor em destaque tipográfico.
  - Divisor horizontal sutil.
  - Dropdown acessível com código e nome por extenso de cada moeda disponível.
- Botão central de **Swap** circular com ícone de setas opostas (`ArrowRightLeft`), invertendo origem e destino e rotacionando 90° em smartphones para acompanhar o fluxo vertical.
- Rodapé informativo com a cotação comercial exata calculada e a data de referência oficial.

### 3.5. Seção Analítica de Histórico (HistoryField)
- Título da seção alinhado ao seletor de períodos em abas (*pill selector*): `7D`, `15D`, `30D`, `3M`, `6M`, `1A`, `5A`, `10A`.
- Gráfico de área interativo (`Chart`) com carregamento sob demanda (*lazy chunk*), sem atrasar o paint inicial da aplicação.
- Card lateral **MERCADO** com métricas em tempo real:
  - Cotação Máxima no período.
  - Cotação Mínima no período.
  - Variação percentual total do período.

### 3.6. Filtros, Tabela Paginada e Exportação (Filters, DataTable & Pagination)
- Formulário de filtros para intervalo de datas (inicial/final) e faixas de cotação (mínima/máxima) com botão de limpeza.
- Tabela com colunas *Data*, *Origem*, *Destino*, *Cotação* e *Variação*, com cabeçalhos clicáveis e indicadores de ordenação `↑`/`↓`.
- Componente de **Paginação** client-side (10 linhas por página) com botões acessíveis e retorno automático para a página 1 ao filtrar ou ordenar.
- Botão primário para exportação rápida dos dados filtrados completos em formato `.csv` com delimitador `;` e codificação UTF-8 BOM para Excel.

---

## 4. Evidências de Fidelidade e Responsividade

| Requisito do Figma | Implementação no Código | Validação |
| :--- | :--- | :---: |
| Paleta Emerald / Slate / Red | Classes nativas Tailwind v4 (`bg-emerald-950`, `bg-emerald-100`, `bg-red-100`) | ✅ Aprovado |
| Conversor com Swap Central | Componente `CurrencyField` com rotação do botão em mobile | ✅ Aprovado |
| Cards das 5 Moedas Principais | Componente `TopCurrencyCards` com cores semânticas e skeletons | ✅ Aprovado |
| Seletor de Idiomas em Abas | `LanguageProvider` com botões pill e foco acessível | ✅ Aprovado |
| Gráfico Histórico Interativo | `Recharts` (`AreaChart`) sob demanda com eixos dinâmicos | ✅ Aprovado |
| Tabela de Histórico Paginada | `DataTable` + `Pagination` com variação pré-calculada e 10 itens/página | ✅ Aprovado |
| Exportação de Dados | Função nativa `exportToCSV` sem dependências pesadas | ✅ Aprovado |
| Adaptação Mobile (320px+) | Layout em coluna única, cards fluidos e rolagem horizontal em tabelas | ✅ Aprovado |
