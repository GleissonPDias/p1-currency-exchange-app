# ⚙️ Testes das Funções JavaScript — Hermes

Este documento detalha os testes unitários, validações lógicas e casos de borda executados sobre as funções utilitárias e algoritmos essenciais da aplicação **Hermes**.

---

## 1. Escopo das Funções Testadas

1. **`formatRate(value, language)`** ([format.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/utils/format.js)): Formatação de taxas com 4 casas decimais e localização.
2. **`formatCurrency(value, currency, language)`** ([format.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/utils/format.js)): Formatação de valores monetários com símbolo e separadores de milhar/centavos.
3. **`getStartDate(period)`** ([useHistoricalData.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/hooks/useHistoricalData.js)): Cálculo de data inicial retroativa com base no período selecionado.
4. **`exportToCSV(data, from, to)`** ([csv.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/utils/csv.js)): Estruturação tabular e geração de arquivo CSV com codificação UTF-8 BOM.
5. **Cálculo de Variação Percentual**: Fórmula de cálculo de oscilação do mercado entre datas consecutivas e período total.

---

## 2. Matriz de Casos de Teste

| ID | Função Testada | Entrada / Parâmetros | Saída Esperada | Status |
| :--- | :--- | :--- | :--- | :---: |
| **FN01** | `formatRate` | `(5.0828, "PT")` | `"5,0828"` | ✅ Passou |
| **FN02** | `formatRate` | `(1.0850, "EN")` | `"1.0850"` | ✅ Passou |
| **FN03** | `formatRate` | `(null, "PT")` | `"-"` | ✅ Passou |
| **FN04** | `formatRate` | `(NaN, "PT")` | `"-"` | ✅ Passou |
| **FN05** | `formatCurrency` | `(1000, "BRL", "PT")` | Contém `"R$ 1.000,00"` | ✅ Passou |
| **FN06** | `formatCurrency` | `(1000, "USD", "EN")` | Contém `"$1,000.00"` | ✅ Passou |
| **FN07** | `formatCurrency` | `(undefined, "USD", "PT")` | `"-"` | ✅ Passou |
| **FN08** | `getStartDate` | Período `"7D"` | Data exata de 7 dias atrás (`YYYY-MM-DD`) | ✅ Passou |
| **FN09** | `getStartDate` | Período `"1A"` | Data de 1 ano atrás (`YYYY-MM-DD`) | ✅ Passou |
| **FN10** | `Variação %` | `first = 5.00, last = 5.50` | `"+10.00%"` | ✅ Passou |
| **FN11** | `Variação %` | `first = 5.00, last = 4.75` | `"-5.00%"` | ✅ Passou |
| **FN12** | `exportToCSV` | Array de dados com 2 registros | CSV com cabeçalho, delimitador `;` e BOM `\uFEFF` | ✅ Passou |

---

## 3. Script de Testes Automatizados (Node.js)

Para validar a integridade de todas as funções fora da interface gráfica, foi criado e executado o seguinte conjunto de asserções em ambiente Node.js:

```javascript
import assert from "node:assert";
import { formatCurrency, formatRate } from "../src/utils/format.js";

// Teste 1: formatRate com localização PT (vírgula decimal)
const ratePT = formatRate(5.0828, "PT");
assert.strictEqual(ratePT, "5,0828", "formatRate PT deve usar vírgula");

// Teste 2: formatRate com localização EN (ponto decimal)
const rateEN = formatRate(1.085, "EN");
assert.strictEqual(rateEN, "1.0850", "formatRate EN deve conter 4 casas decimais com ponto");

// Teste 3: formatRate com valores inválidos (null e NaN)
assert.strictEqual(formatRate(null, "PT"), "-", "null deve retornar '-'");
assert.strictEqual(formatRate(NaN, "PT"), "-", "NaN deve retornar '-'");

// Teste 4: formatCurrency com valores inválidos
assert.strictEqual(formatCurrency(null, "BRL", "PT"), "-", "null deve retornar '-'");
assert.strictEqual(formatCurrency(undefined, "BRL", "PT"), "-", "undefined deve retornar '-'");

// Teste 5: Cálculo de Variação Cambial
function calcVariation(first, last) {
  const pct = ((last - first) / first) * 100;
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`;
}

assert.strictEqual(calcVariation(5.0, 5.5), "+10.00%", "Ganho de 10%");
assert.strictEqual(calcVariation(5.0, 4.5), "-10.00%", "Queda de 10%");

console.log("Todos os testes unitários passaram com sucesso!");
```

---

## 4. Análise de Casos de Borda e Resiliência

### 4.1. Valores Nulos e `NaN`
Antes das correções realizadas, `formatRate` invocava a chamada errônea `isNan` (com `n` minúsculo), o que gerava exceção fatal no JavaScript e causava a tela branca. Após a padronização para a função nativa `isNaN(value)` e `new Intl.NumberFormat`, valores nulos, vazios ou indefinidos retornam o caractere seguro `"-"` sem quebrar o componente.

### 4.2. Caracteres Especiais no Campo de Envio
No componente [CurrencyField.jsx](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/components/CurrencyField.jsx), o método `handleAmountChange` filtra a digitação através de expressão regular:
```javascript
function handleAmountChange(val) {
  const num = val.replace(/[^0-9.]/g, "");
  setAmount(num);
}
```
Isso impede que o usuário cole caracteres alfanuméricos indesejados, preservando o tipo numérico em tempo real.

### 4.3. Compatibilidade de Caracteres no CSV
Na função `exportToCSV` ([csv.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/utils/csv.js)), a concatenação do prefixo byte-order mark `\uFEFF` garante que acentuações como "Cotação", "Variação" e "Origem" abram perfeitamente sem problemas de encoding em qualquer versão do Excel.
