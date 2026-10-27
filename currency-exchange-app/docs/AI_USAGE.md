# 🤖 Registro de Uso de Inteligência Artificial — Hermes

Este documento registra a utilização de Inteligência Artificial generativa no ciclo de desenvolvimento, depuração, arquitetura e documentação do projeto **Hermes Currency Exchange**.

---

## 1. Ferramentas de IA Utilizadas

- **Assistente de Desenvolvimento:** Antigravity AI (Google DeepMind)
- **Modelo:** Gemini 3.8 Flash (Medium)
- **Ambiente:** Antigravity IDE com integração a Browser Subagent, Terminal Shell e Sistema de Arquivos

---

## 2. Etapas de Atuação da IA no Projeto

### 2.1. Diagnóstico e Resolução do Erro de "Tela Branca" (Bugfix)
- **Problema Relatado:** A aplicação compilava no Vite, mas ao ser aberta no navegador ficava completamente em branco.
- **Investigação da IA:**
  1. A IA executou `npm run lint` e utilizou um subagente de navegador com DevTools automatizado para capturar a pilha de erros em tempo de execução no `localhost:5175`.
  2. Foi capturado o erro:
     ```
     Uncaught ReferenceError: isNan is not defined at formatRate (format.js:12:6)
     ```
  3. A IA identificou também que a linha subsequente continha `new IntL.NumberFormat` com `L` maiúsculo indevido.
  4. Realizou a correção atômica em [format.js](p1-currency-exchange-app/currency-exchange-app/src/utils/format.js), substituindo `isNan` por `isNaN` e `IntL` por `Intl`.
  5. Adicionou o import `@import "tailwindcss";` em [index.css](p1-currency-exchange-app/currency-exchange-app/src/index.css), garantindo que as classes do Tailwind CSS v4 fossem compiladas globalmente.

### 2.2. Implementação de Responsividade Completa
- **Problema Relatado:** A aplicação continha elementos com larguras fixas e alinhamentos rígidos que quebravam em smartphones e telas pequenas.
- **Atuação da IA:**
  - **Conversor de Moedas ([CurrencyField.jsx](p1-currency-exchange-app/currency-exchange-app/src/components/CurrencyField.jsx)):** Refatorou o contêiner para empilhamento vertical (`flex-col md:flex-row`), ajustou paddings e fez o botão de swap rotacionar 90° em telas menores para harmonizar com o fluxo de leitura.
  - **Seletor de Períodos ([PeriodSelector.jsx](p1-currency-exchange-app/currency-exchange-app/src/components/PeriodSelector.jsx)):** Implementou rolagem horizontal fluida (`overflow-x-auto`) com toque, impedindo que os 8 botões de período causassem overflow da página.
  - **Gráfico e Card de Mercado ([HistoryField.jsx](p1-currency-exchange-app/currency-exchange-app/src/components/HistoryField.jsx)):** Reestruturou o layout de lado a lado para grid responsivo (`flex-col lg:flex-row`), permitindo visualização clara das estatísticas em celulares e tablets.
  - **Tabela Histórica ([DataTable.jsx](p1-currency-exchange-app/currency-exchange-app/src/components/DataTable.jsx)):** Estabeleceu largura mínima (`min-w-[540px]`) e rolagem horizontal suave para preservação dos dados diários.

### 2.3. Elaboração da Documentação Técnica do Projeto
- A IA gerou a documentação de engenharia de software do projeto:
  1. [REQUIREMENTS.md](p1-currency-exchange-app/currency-exchange-app/docs/REQUIREMENTS.md): Requisitos funcionais, não funcionais, regras de negócio e critérios de aceite.
  2. [COMPONENTS.md](p1-currency-exchange-app/currency-exchange-app/docs/COMPONENTS.md): Catálogo de componentes, props, estados, diagramas Mermaid e hierarquia.
  3. [FIGMA.md](p1-currency-exchange-app/currency-exchange-app/docs/FIGMA.md): Mapeamento de design tokens, paleta e telas do protótipo Figma.
  4. [API_TESTS.md](p1-currency-exchange-app/currency-exchange-app/docs/API_TESTS.md): Relatório de testes de integração na API Frankfurter.
  5. [FUNCTION_TESTS.md](p1-currency-exchange-app/currency-exchange-app/docs/FUNCTION_TESTS.md): Testes unitários das funções lógicas de formatação e cálculo.
  6. [Hermes_Currency_API.postman_collection.json](p1-currency-exchange-app/currency-exchange-app/docs/Hermes_Currency_API.postman_collection.json): Collection exportada do Postman pronta para execução.
  7. [README.md](p1-currency-exchange-app/currency-exchange-app/README.md): Apresentação institucional, guia de instalação e arquitetura.

---

## 3. Avaliação Crítica e Supervisão Humana

- **Validação de Código:** Todas as sugestões e códigos gerados pela IA foram testados através do build oficial do Vite (`npm run build`) e validados visualmente no navegador em múltiplos viewports (mobile 375px e desktop 1280px).
- **Precisão Financeira:** As fórmulas matemáticas de câmbio (`amount * rate`) e variação percentual foram auditadas e comparadas diretamente com as respostas reais do Banco Central Europeu / Frankfurter API.
- **Transparência:** O uso de IA atuou como acelerador de produtividade, revisão de qualidade estática (linters) e estruturação de documentação técnica.
