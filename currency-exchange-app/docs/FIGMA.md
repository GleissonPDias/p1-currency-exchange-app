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
| **Slate Background** | `#f8fafc` / `#ffffff` | `bg-slate-50` / `bg-white` | Fundo principal da aplicação e cards de input |
| **Border & Divider** | `#e2e8f0` / `#cbd5e1` | `border-gray-200` / `bg-slate-200` | Divisores sutis e bordas dos cards analíticos |
| **Text Dark** | `#0f172a` | `text-gray-900` | Valores monetários e dados de cotação |
| **Text Muted** | `#64748b` | `text-slate-500` / `text-gray-400` | Subtítulos, rótulos e metadados informativos |
| **Danger / Loss** | `#ef4444` | `text-red-500` | Variações cambiais diárias negativas |

### 2.2. Tipografia
- **Família:** Sans-serif moderna (Inter / Geist / Sistema).
- **Hierarquia:**
  - *Tagline:* `text-xs font-bold tracking-widest uppercase` (HERMES / CLAREZA PARA SUAS DECISÕES).
  - *Hero Title:* `text-3xl` a `text-6xl font-extrabold tracking-tight`.
  - *Valores em Destaque:* `text-2xl` a `text-3xl font-semibold`.
  - *Corpo e Rótulos:* `text-sm` e `text-xs font-medium`.

### 2.3. Formas e Elevações
- **Bordas arredondadas:** Cantos suaves (`rounded-2xl` de 16px e `rounded-xl` de 12px).
- **Sombras:** Sutis e discretas (`shadow-sm` e `shadow-xl` no container do conversor).

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

### 3.3. Painel Conversor de Moedas (CurrencyField)
- Caixa de destaque em tom verde-esmeralda escuro (`#022c22`).
- Dois cartões brancos internos (`CurrencyInput`) contendo:
  - Rótulo ("Você envia" / "Você recebe").
  - Prefixo da moeda e campo de digitação de valor em destaque tipográfico.
  - Divisor horizontal sutil.
  - Dropdown com código e nome por extenso de cada moeda disponível.
- Botão central de **Swap** circular com ícone de setas opostas (`ArrowRightLeft`), invertendo origem e destino.
- Rodapé informativo com a cotação comercial exata calculada e a data de referência oficial.

### 3.4. Seção Analítica de Histórico (HistoryField)
- Título da seção alinhado ao seletor de períodos em abas (*pill selector*): `7D`, `15D`, `30D`, `3M`, `6M`, `1A`, `5A`, `10A`.
- Gráfico de área em gradiente suave verde representando as taxas no tempo.
- Card lateral **MERCADO** com métricas em tempo real:
  - Cotação Máxima no período.
  - Cotação Mínima no período.
  - Variação percentual total do período.

### 3.5. Filtros e Tabela de Registros (Filters & DataTable)
- Filtros para período específico (data inicial e data final) e faixas de corte de cotação (mínima e máxima).
- Tabela com colunas *Data*, *Origem*, *Destino*, *Cotação* e *Variação*, com cabeçalhos ordenáveis por clique.
- Botão primário para exportação rápida dos dados em formato `.csv`.

---

## 4. Evidências de Fidelidade e Responsividade

| Requisito do Figma | Implementação no Código | Validação |
| :--- | :--- | :---: |
| Paleta Emerald / Slate | Classes nativas Tailwind v4 (`bg-emerald-950`, `bg-emerald-900`) | ✅ Aprovado |
| Conversor com Swap Central | Componente `CurrencyField` com rotação do botão em mobile | ✅ Aprovado |
| Seletor de Idiomas em Abas | `LanguageContext` com botões pill integrados | ✅ Aprovado |
| Gráfico Histórico Interativo | `Recharts` (`AreaChart`) com gradiente e tooltip | ✅ Aprovado |
| Tabela de Histórico Diário | `DataTable` com scroll horizontal responsivo e badges de variação | ✅ Aprovado |
| Adaptação Mobile (375px+) | Layout em coluna única com elementos expansíveis | ✅ Aprovado |
