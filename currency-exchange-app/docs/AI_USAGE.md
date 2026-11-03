# 🤖 Registro de Uso de Inteligência Artificial — Hermes

Este documento registra a utilização de Inteligência Artificial generativa no ciclo de desenvolvimento, depuração, arquitetura e documentação do projeto **Hermes Currency Exchange**.

---

## 1. Ferramentas de IA Utilizadas

- **Assistente de Desenvolvimento:** Antigravity AI (Google DeepMind)
- **Modelo:** Gemini 3.8 Flash
- **Ambiente:** Antigravity IDE com integração a Browser Subagent, Terminal Shell e Sistema de Arquivos

---

## 2. Etapas de Atuação da IA no Projeto

### 2.1. Diagnóstico e Resolução do Erro de "Tela Branca" (Bugfix Inicial)
- **Problema Relatado:** A aplicação compilava no Vite, mas ao ser aberta no navegador ficava completamente em branco.
- **Investigação da IA:**
  1. A IA executou `npm run lint` e capturou os erros em tempo de execução:
     ```
     Uncaught ReferenceError: isNan is not defined at formatRate (format.js:12:6)
     ```
  2. Identificou também `new IntL.NumberFormat` com `L` maiúsculo indevido.
  3. Realizou a correção substituindo `isNan` por `isNaN` e `IntL` por `Intl`.
  4. Adicionou o `@import "tailwindcss";` no `index.css`, garantindo que as classes utilitárias do Tailwind CSS v4 fossem compiladas globalmente.

### 2.2. Implementação de Responsividade Completa
- **Problema Relatado:** Elementos com larguras fixas e alinhamentos rígidos quebravam em smartphones.
- **Atuação da IA:**
  - **Conversor de Moedas ([CurrencyField.jsx](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/components/CurrencyField.jsx)):** Empilhamento vertical responsivo (`flex-col md:flex-row`), rotação de 90° no botão de swap em mobile e normalização de vírgula para ponto.
  - **Seletor de Períodos ([PeriodSelector.jsx](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/components/PeriodSelector.jsx)):** Rolagem horizontal fluida (`overflow-x-auto`) com toque para os 8 períodos.
  - **Cards das Moedas Principais ([TopCurrencyCards.jsx](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/components/TopCurrencyCards.jsx)):** Grid adaptativo de 2 colunas no mobile, 3 no tablet e 5 no desktop, com o 5º card expandido no mobile para evitar linha órfã.
  - **Tabela Histórica ([DataTable.jsx](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/components/DataTable.jsx)):** Largura mínima (`min-w-[540px]`), rolagem horizontal suave e paginação integrada de 10 linhas por página.

### 2.3. Simplificação e Refatoração Arquitetural
- **Problema:** Fragmentação excessiva de micro-arquivos e dependências extras no projeto.
- **Atuação da IA:**
  - **Remoção do PapaParse:** Substituído por exportador CSV nativo com UTF-8 BOM (`\uFEFF`) e delimitador `;`, reduzindo o bundle inicial em ~20 kB.
  - **Modernização da API ([api.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/services/api.js)):** Implementação de `AbortSignal.timeout(10_000)` e `AbortSignal.any([signal, timeoutSignal])`, eliminando timers manuais e listeners propensos a vazamento de memória.
  - **Fusão de Módulos:** Inlining de micro-componentes de uso único (`Divider`, `AppErrorFallback`, `ExportButton`, `ErrorState`) e fusão de utilitários em `formatters.js`.
  - **Consolidação de Memos em [HistoryField.jsx](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/components/HistoryField.jsx):** Unificação de 4 blocos de cálculo em um fluxo único de alta performance sem perigo de estouro de pilha.

### 2.4. Diagnóstico e Resolução do Bug no Gráfico (Recharts)
- **Problema Relatado:** Para períodos acima de 30 dias (ex: 3 meses), o cursor e a bolinha do gráfico travavam sem acompanhar o mouse, e o dia "26 de setembro" aparecia repetidamente.
- **Diagnóstico da IA:**
  1. A máscara `"MMM yy"` gerava `"set. 26"` (onde 26 era o ano de 2026, confundido visualmente com o dia 26).
  2. Como o eixo X utilizava `dataKey="label"`, todos os ~30 dias de setembro compartilhavam a mesma chave textual (`"set. 26"`). A escala categórica do Recharts colapsava, travando o rastreamento do mouse.
- **Solução Implementada:**
  - Configuração de `dataKey="date"` (chave ISO única por ponto) no `<XAxis>`.
  - Tooltip formatando a data real completa do ponto (`"dd MMM yyyy"`, ex: `15 set. 2026`).
  - Legendas dos ticks formatadas contextualmente (`"dd MMM"` para períodos até 3M, `"MMM yyyy"` para 6M/1A e `"yyyy"` para 5A/10A).

### 2.5. Elaboração e Manutenção da Documentação Técnica
- A IA estruturou e atualizou continuamente o ecossistema documental:
  1. [REQUIREMENTS.md](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/docs/REQUIREMENTS.md): Requisitos funcionais, regras de negócio e critérios de aceite.
  2. [COMPONENTS.md](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/docs/COMPONENTS.md): Catálogo de componentes, props, diagramas e hierarquia.
  3. [FIGMA.md](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/docs/FIGMA.md): Mapeamento de design tokens, paleta e telas do protótipo Figma.
  4. [API_TESTS.md](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/docs/API_TESTS.md): Relatório de testes de integração na API Frankfurter.
  5. [FUNCTION_TESTS.md](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/docs/FUNCTION_TESTS.md): Testes unitários das funções lógicas de formatação e cálculo.
  6. [Hermes_Currency_API.postman_collection.json](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/docs/Hermes_Currency_API.postman_collection.json): Collection exportada do Postman.
  7. [README.md](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/README.md): Documentação técnica completa e mapa do repositório.

---

## 3. Avaliação Crítica e Supervisão Humana

- **Validação de Código:** Todas as sugestões e códigos gerados pela IA foram testados através do build oficial do Vite (`npm run build`), análise estática (`npm run lint` com 0 erros) e verificados no navegador em múltiplos viewports.
- **Precisão Financeira:** As fórmulas matemáticas de câmbio (`amount * rate`), variação percentual do período e variação diária foram auditadas e comparadas diretamente com as respostas reais do Banco Central Europeu / Frankfurter API.
- **Transparência:** O uso de IA atuou como acelerador de produtividade, revisão de qualidade estática (linters) e estruturação de documentação técnica.
