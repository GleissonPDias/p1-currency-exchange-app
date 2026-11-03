# 📋 Requisitos e Regras de Negócio — Hermes Currency Exchange

## 1. Contexto
No cenário globalizado atual, pessoas físicas e jurídicas realizam transações internacionais constantemente, seja para viagens a turismo, compras em e-commerce internacional, investimentos em moedas estrangeiras ou recebimento de serviços prestados para o exterior. A volatilidade constante do mercado cambial exige ferramentas intuitivas, confiáveis e rápidas para conversão monetária e acompanhamento em tempo real das flutuações históricas. 

O projeto **Hermes** surge com a proposta de oferecer uma interface moderna, transparente e sem atrito para consulta de cotações, conversão de pares de moedas e análise gráfica da evolução do mercado financeiro.

---

## 2. Público-Alvo
- **Viajantes e Turistas:** Pessoas que necessitam calcular orçamentos de viagens e planejar compra de moeda estrangeira no melhor momento.
- **Profissionais Remotos e Freelancers:** Prestadores de serviços internacionais que recebem pagamentos em moedas fortes (USD, EUR, GBP) e necessitam converter valores para sua moeda local (BRL, etc.).
- **Investidores e Estudantes do Mercado Financeiro:** Indivíduos que acompanham tendências de médio e longo prazo dos pares cambiais e precisam exportar dados históricos para análise.
- **Consumidores de E-commerce:** Usuários que compram em sites globais e necessitam prever o valor final em moeda local.

---

## 3. Objetivo
Desenvolver uma aplicação web SPA (Single Page Application) responsiva, intuitiva e multilíngue que permita a conversão de moedas globais com dados em tempo real da Frankfurter API (Banco Central Europeu), oferecendo ferramentas analíticas visuais (cards das principais moedas, gráficos históricos de área com lazy loading, estatísticas de mercado, tabela paginada), filtros temporais avançados e exportação de dados tabulados em formato CSV.

---

## 4. Escopo

### 4.1. No Escopo (In-Scope)
- Consulta de lista de moedas suportadas pelo Banco Central Europeu via Frankfurter API (`/currencies`).
- Conversão instantânea e bidirecional entre qualquer par de moedas disponível.
- Alternância instantânea de moedas de origem e destino (função *Swap*).
- Apresentação visual da cotação comercial atualizada e data de referência.
- Cards informativos das 5 moedas mais negociadas do mundo (`USD`, `EUR`, `GBP`, `JPY`, `CNY`), tendo a moeda de origem como base, com taxa unitária e variação em relação ao dia anterior útil.
- Consulta de dados históricos de câmbio em múltiplos períodos predefinidos (7D, 15D, 30D, 3M, 6M, 1A, 5A, 10A).
- Gráfico interativo de área carregado sob demanda (*lazy chunk*), com chave única no eixo X para movimentação fluida do cursor e *tooltip* com data completa e cotação com 4 casas decimais.
- Painel analítico de resumo de mercado (Cotação Máxima, Cotação Mínima e Variação percentual do período).
- Filtros manuais avançados para o histórico (intervalo de datas inicial/final e valor mínimo/máximo de cotação).
- Tabela com dados diários ordenáveis por data e cotação, cálculo automático de variação diária e paginação client-side (10 linhas por página).
- Exportação nativa dos dados filtrados para formato CSV com codificação UTF-8 (BOM) e delimitador `;`.
- Suporte a múltiplos idiomas de interface (Português, Inglês e Espanhol).
- Barreira global de tratamento de erros em tempo de execução (*ErrorBoundary*).
- Camada de rede resiliente com cancelamento via `AbortController`, timeout de 10s, retry automático e cache em memória de 5 minutos.
- Design responsivo para smartphones, tablets e monitores desktop.

### 4.2. Fora do Escopo (Out-of-Scope)
- Execução de ordens financeiras de câmbio ou integração com gateways de pagamento bancário (o sistema é estritamente informativo/consultivo).
- Criação e autenticação de contas de usuário (login/senha).
- Alertas por e-mail ou push notifications de variação de taxa.
- Suporte a criptomoedas (o sistema utiliza moedas fiduciárias emitidas por bancos centrais).

---

## 5. Requisitos Funcionais (RF)

| ID | Requisito Funcional | Descrição | Prioridade |
| :--- | :--- | :--- | :--- |
| **RF01** | Listagem de Moedas | O sistema deve carregar e listar no dropdown todas as moedas suportadas pela API (`/currencies`). | Alta |
| **RF02** | Conversão de Valores | O sistema deve calcular dinamicamente o valor convertido conforme o usuário digita o montante de envio (`valor * taxa`). | Alta |
| **RF03** | Inversão de Moedas (Swap) | O sistema deve fornecer um botão interativo para alternar a moeda de origem com a moeda de destino. | Média |
| **RF04** | Exibição da Taxa Comercial | O sistema deve apresentar a taxa de câmbio comercial unitária (`1 [Origem] = X.XXXX [Destino]`) e a data da cotação. | Alta |
| **RF05** | Cards de Moedas Principais | O sistema deve exibir cards das 5 moedas mais negociadas (USD, EUR, GBP, JPY, CNY) baseadas na moeda de envio, indicando cotação e variação diária com cores dinâmicas. | Alta |
| **RF06** | Seleção de Períodos | O sistema deve permitir ao usuário alternar rapidamente entre períodos históricos: 7D, 15D, 30D, 3M, 6M, 1A, 5A e 10A. | Alta |
| **RF07** | Gráfico Interativo | O sistema deve exibir um gráfico de área com o histórico de taxas, eixos formatados contextualmente e tooltip dinâmico que acompanha o cursor sem travar. | Alta |
| **RF08** | Indicadores de Mercado | O sistema deve calcular e exibir automaticamente a Cotação Máxima, Cotação Mínima e Variação % do período selecionado. | Média |
| **RF09** | Filtragem Customizada | O sistema deve permitir filtrar a tabela e o gráfico por intervalo de datas (Data Inicial / Final) e faixa de cotação (Mínima / Máxima). | Média |
| **RF10** | Limpeza de Filtros | O sistema deve disponibilizar ação de redefinir filtros aplicados para restaurar o período completo. | Baixa |
| **RF11** | Tabela Ordenável | A tabela de histórico deve permitir ordenação crescente e decrescente pelas colunas "Data" e "Cotação", sem alterar o gráfico ou a variação. | Média |
| **RF12** | Cálculo de Variação Diária | A tabela deve calcular a variação percentual de cada dia em relação ao dia anterior útil cronológico, indicando alta (+) ou baixa (-). | Média |
| **RF13** | Paginação Client-Side | A tabela de histórico deve segmentar os dados em páginas de 10 registros, retornando à página 1 quando novos filtros forem aplicados. | Média |
| **RF14** | Exportação para CSV | O sistema deve permitir o download de arquivo CSV nativo dos dados filtrados completos, com delimitador `;`, UTF-8 BOM e cabeçalhos legíveis. | Alta |
| **RF15** | Internacionalização (i18n) | O sistema deve permitir alternância instantânea de idioma entre Português (PT), Inglês (EN) e Espanhol (ES). | Média |
| **RF16** | Resiliência e Retry | Em caso de falha de conexão com a API, exibir feedback visual com botão funcional de "Tentar novamente" tanto na lista de moedas quanto no histórico. | Alta |
| **RF17** | Error Boundary | Capturar falhas críticas inesperadas de renderização, exibindo tela de fallback amigável com opção de recarregar a página. | Alta |

---

## 6. Requisitos Não Funcionais (RNF)

| ID | Requisito Não Funcional | Descrição |
| :--- | :--- | :--- |
| **RNF01** | **Performance e Carregamento** | O bundle inicial deve ser otimizado (gráfico carregado via *React.lazy*), garantindo inicialização veloz e bundle abaixo de 300 kB. |
| **RNF02** | **Responsividade** | A interface deve se adaptar fluidamente de 320px (smartphones) até monitores ultrawide, com colunas e botões adaptativos. |
| **RNF03** | **Acessibilidade (a11y)** | Elementos interativos devem conter contraste visual WCAG AA, tags semânticas, `aria-label`, `aria-pressed`, `aria-sort` e navegação por teclado. |
| **RNF04** | **Compatibilidade Cross-Browser** | O sistema deve funcionar uniformemente nos navegadores modernos: Chrome, Firefox, Edge e Safari. |
| **RNF05** | **Modularidade e Manutenibilidade** | Arquitetura limpa com separação entre camada de rede (`api.js`), hooks de negócio, componentes e utilitários puros. |
| **RNF06** | **Internacionalização de Números e Datas** | A formatação de valores e datas deve respeitar os padrões de localização de cada idioma (`pt-BR`, `en-US`, `es-ES`) via `Intl.NumberFormat` e `date-fns`. |

---

## 7. Regras de Negócio (RN)

- **RN01 — Moedas Iguais:** Se a moeda de origem for igual à moeda de destino (`from === to`), o sistema não deve disparar requisição externa; o conversor não exibe cotação comercial e o histórico fica vazio.
- **RN02 — Limitação de Entrada de Valores:** O campo de envio aceita números, vírgula e ponto. Vírgulas são normalizadas automaticamente para ponto e apenas um único separador decimal é permitido.
- **RN03 — Precisão Decimal:** 
  - O valor convertido de destino deve ser exibido com formatação numérica de 2 casas no campo de recebimento.
  - A cotação unitária comercial e as taxas da tabela devem conter 4 casas decimais fixas (`0.0000`).
- **RN04 — Cards das Moedas Principais:**
  - Moedas fixas: USD, EUR, GBP, JPY e CNY.
  - O card correspondente à própria moeda base exibe a taxa `1,0000` e o rótulo *"Moeda base"*.
  - A variação compara os 2 últimos dias úteis disponíveis na série recente da API.
  - Variação positiva ou nula: card verde claro (`bg-emerald-100`). Variação negativa: card vermelho claro (`bg-red-100`).
- **RN05 — Cálculo de Variação de Mercado:**
  - A variação geral do período é dada pela primeira e última cotação em ordem cronológica:  
    $$\text{Variação \%} = \left(\frac{\text{Última Cotação} - \text{Primeira Cotação}}{\text{Primeira Cotação}}\right) \times 100$$
- **RN06 — Variação Diária na Tabela:**
  - A variação diária deve ser calculada estritamente sobre a série em ordem cronológica antes de qualquer ordenação visual. Ordenar a tabela por cotação não pode inverter o sinal da variação.
- **RN07 — Delimitador e Codificação CSV:**
  - O CSV exportado deve incluir o caractere UTF-8 BOM (`\uFEFF`) para abertura correta de acentos no Microsoft Excel e Google Planilhas.
  - O delimitador de colunas padrão é ponto-e-vírgula (`;`).
  - O CSV deve conter todos os dados filtrados, independentemente da página visualizada na tabela.
- **RN08 — Paginação da Tabela:**
  - Tamanho de página padrão: 10 registros.
  - Quando os dados filtrados mudam ou a ordenação é alterada, a página corrente retorna automaticamente para a página 1.
- **RN09 — Camada de Rede:**
  - As requisições possuem timeout de 10 segundos via `AbortSignal.timeout` e até 2 tentativas em caso de erro 5xx, timeout ou falha de rede.
  - Resultados de URLs idênticas são guardados em cache em memória por 5 minutos.

---

## 8. Critérios de Aceite (CA)

1. **Conversão de Câmbio:**
   - *Dado que* o usuário digita 1000 USD para BRL e a cotação é 5.5000;
   - *Quando* o cálculo for processado;
   - *Então* o campo de recebimento deve apresentar `5.500,00` (ou `5,500.00` em EN) e a taxa comercial deve indicar `1 USD = 5,5000 BRL`.

2. **Ação de Swap:**
   - *Dado que* o conversor está com USD no envio e BRL no recebimento;
   - *Quando* o usuário clica no botão de swap;
   - *Então* a moeda de envio passa a ser BRL e a de recebimento passa a ser USD, cancelando requisições anteriores e recalculando a cotação e o histórico imediatamente.

3. **Cards de Moedas Principais:**
   - *Dado que* a moeda de envio é USD;
   - *Então* o card de USD exibe `1,0000` e selo de Moeda base, enquanto EUR, GBP, JPY e CNY exibem as taxas convertidas e suas variações diárias coloridas.

4. **Alternância de Idiomas:**
   - *Dado que* a interface está em Português;
   - *Quando* o usuário clica no botão `EN`;
   - *Então* todos os rótulos, títulos, cabeçalhos de tabela, cards e mensagens devem ser atualizados instantaneamente para inglês, com formato numérico correspondente.

5. **Gráfico e Hover:**
   - *Dado que* o usuário seleciona o período de 3 meses (3M);
   - *Quando* move o cursor ao longo da curva;
   - *Então* a bolinha acompanha suavemente o mouse em cada dia útil e o tooltip exibe a data completa (ex: `15 set. 2026`) e o valor exato da taxa.

6. **Paginação e Exportação:**
   - *Dado que* a consulta retorna 30 dias úteis e o usuário está na página 2 da tabela;
   - *Quando* clica no botão "Exportar CSV";
   - *Então* o arquivo CSV baixado deve conter todos os 30 registros filtrados, e não apenas os 10 da página atual.
