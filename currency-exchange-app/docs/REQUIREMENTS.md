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
Desenvolver uma aplicação web SPA (Single Page Application) responsiva, intuitiva e multilíngue que permita a conversão de moedas globais com dados em tempo real da Frankfurter API, oferecendo ferramentas analíticas visuais (gráficos históricos, estatísticas de máxima, mínima e variação percentual), filtros temporais e exportação de dados tabulados em formato CSV.

---

## 4. Escopo

### 4.1. No Escopo (In-Scope)
- Consulta de lista de moedas suportadas pelo Banco Central Europeu via Frankfurter API.
- Conversão instantânea e bidirecional entre qualquer par de moedas disponível.
- Alternância instantânea de moedas de origem e destino (função *Swap*).
- Apresentação visual da cotação comercial atualizada e data de referência.
- Consulta de dados históricos de câmbio em múltiplos períodos predefinidos (7D, 15D, 30D, 3M, 6M, 1A, 5A, 10A).
- Gráfico interativo de área mostrando a evolução da cotação com *tooltip* dinâmico.
- Painel analítico de resumo de mercado (Cotação Máxima, Cotação Mínima e Variação percentual do período).
- Filtros manuais avançados para o histórico (intervalo de datas inicial/final e valor mínimo/máximo de cotação).
- Tabela com dados diários ordenáveis por data e cotação, além do cálculo automático de variação diária.
- Exportação dos dados filtrados para planilha no formato CSV com codificação UTF-8 (BOM).
- Suporte a múltiplos idiomas de interface (Português, Inglês e Espanhol).
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
| **RF05** | Seleção de Períodos | O sistema deve permitir ao usuário alternar rapidamente entre períodos históricos: 7 dias, 15 dias, 30 dias, 3 meses, 6 meses, 1 ano, 5 anos e 10 anos. | Alta |
| **RF06** | Gráfico Interativo | O sistema deve exibir um gráfico de área com o histórico de taxas, eixos formatados e tooltip com o valor exato ao passar o mouse/tocar. | Alta |
| **RF07** | Indicadores de Mercado | O sistema deve calcular e exibir automaticamente a Cotação Máxima, Cotação Mínima e Variação % do período selecionado. | Média |
| **RF08** | Filtragem Customizada | O sistema deve permitir filtrar a tabela e o gráfico por intervalo de datas (Data Inicial / Final) e faixa de cotação (Mínima / Máxima). | Média |
| **RF09** | Limpeza de Filtros | O sistema deve disponibilizar ação de redefinir filtros aplicados para restaurar o período completo. | Baixa |
| **RF10** | Tabela Ordenável | A tabela de histórico deve permitir ordenação crescente e decrescente pelas colunas "Data" e "Cotação". | Média |
| **RF11** | Cálculo de Variação Diária | A tabela deve calcular a variação percentual de cada dia em relação ao dia anterior, indicando ganho (+) ou perda (-). | Média |
| **RF12** | Exportação para CSV | O sistema deve permitir o download de arquivo CSV dos dados históricos filtrados, formatado com separador `;` e cabeçalhos legíveis. | Alta |
| **RF13** | Internacionalização (i18n) | O sistema deve permitir alternância instantânea de idioma entre Português (PT), Inglês (EN) e Espanhol (ES). | Média |
| **RF14** | Tratamento de Erros e Retry | Em caso de falha de conexão com a API, exibir feedback visual com botão de "Tentar novamente". | Alta |

---

## 6. Requisitos Não Funcionais (RNF)

| ID | Requisito Não Funcional | Descrição |
| :--- | :--- | :--- |
| **RNF01** | **Performance e Tempo de Resposta** | As requisições de conversão e dados históricos devem ser renderizadas em menos de 1,5s sob condições normais de internet. |
| **RNF02** | **Responsividade** | A interface deve se adaptar fluidamente a resoluções de telas de 320px (smartphones compactos) até 2560px (monitores ultrawide). |
| **RNF03** | **Acessibilidade e Usabilidade** | Elementos interativos devem conter contraste visual adequado (WCAG AA), tamanhos de toque mínimos de 44x44px em mobile e rótulos semânticos. |
| **RNF04** | **Compatibilidade Cross-Browser** | O sistema deve funcionar uniformemente nos navegadores modernos: Google Chrome, Mozilla Firefox, Microsoft Edge e Apple Safari. |
| **RNF05** | **Modularidade e Manutenibilidade** | A arquitetura deve seguir separação de responsabilidades em componentes reutilizáveis, custom hooks para chamadas de dados e utilitários isolados. |
| **RNF06** | **Internacionalização de Números** | A formatação de valores e datas deve respeitar os padrões de localização de cada idioma (`pt-BR`, `en-US`, `es-ES`) via `Intl.NumberFormat` e `date-fns`. |

---

## 7. Regras de Negócio (RN)

- **RN01 — Moedas Iguais:** Se a moeda de origem for igual à moeda de destino (ex: `USD` para `USD`), não deve ser feita requisição externa; a taxa deve ser tratada como `1.0000` ou a busca histórica deve ser suprimida/zerada.
- **RN02 — Limitação de Entrada de Valores:** O campo de envio deve aceitar apenas caracteres numéricos e separador decimal (ponto), impedindo caracteres alfabéticos ou múltiplos pontos.
- **RN03 — Precisão Decimal:** 
  - O valor convertido de destino deve ser exibido com 4 casas decimais para precisão cambial ou formatado conforme o padrão monetário da moeda.
  - A cotação unitária deve conter 4 casas decimais fixas (`0.0000`).
- **RN04 — Cálculo de Variação de Mercado:**
  - A variação geral do período é dada pela fórmula:  
    $$\text{Variação \%} = \left(\frac{\text{Última Cotação} - \text{Primeira Cotação}}{\text{Primeira Cotação}}\right) \times 100$$
  - Deve ser precedida de sinal de mais (`+`) se positiva e exibida em cor verde esmeralda.
- **RN05 — Delimitador e Codificação CSV:**
  - O CSV exportado deve incluir o caractere UTF-8 BOM (`\uFEFF`) para abertura correta sem desconfiguração de acentos no Microsoft Excel e Google Planilhas.
  - O delimitador de colunas padrão deve ser ponto-e-vírgula (`;`).
- **RN06 — Intervalos de Período Histórico:**
  - O período padrão inicial selecionado deve ser `30D` (30 dias).
  - A data final é sempre a data corrente (`hoje`) e a data inicial é subtraída conforma a regra (7 dias, 15 dias, 30 dias, 3 meses, 6 meses, 1 ano, 5 anos ou 10 anos).

---

## 8. Critérios de Aceite (CA)

1. **Conversão de Câmbio:**
   - *Dado que* o usuário define $ 1.000 USD para BRL e a cotação é 5.5000;
   - *Quando* o cálculo for processado;
   - *Então* o campo de recebimento deve apresentar exatamente `5500.0000` (ou formatado como R$ 5.500,00) e a taxa comercial unitária deve indicar `1 USD = 5.5000 BRL`.

2. **Ação de Swap:**
   - *Dado que* o conversor está com USD no envio e BRL no recebimento;
   - *Quando* o usuário clica no botão de swap;
   - *Então* a moeda de envio passa a ser BRL e a de recebimento passa a ser USD, recalculando a cotação imediatamente.

3. **Alternância de Idiomas:**
   - *Dado que* a interface está em Português;
   - *Quando* o usuário clica no botão `EN`;
   - *Então* todos os rótulos, títulos, cabeçalhos de tabela e botões devem ser atualizados instantaneamente para o idioma inglês, e os formatos numéricos para o padrão anglo-saxão.

4. **Filtragem e Exportação:**
   - *Dado que* o usuário filtra o período para taxas acima de 5.20;
   - *Quando* clica no botão "Exportar CSV";
   - *Então* o arquivo baixado deve conter apenas os registros com taxa $\ge 5.20$, devidamente separados por ponto-e-vírgula.
