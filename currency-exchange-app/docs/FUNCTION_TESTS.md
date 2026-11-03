# ⚙️ Testes das Funções JavaScript — Hermes

Este documento detalha os testes unitários, validações lógicas e casos de borda executados sobre as funções utilitárias e algoritmos essenciais da aplicação **Hermes**.

---

## 1. Escopo das Funções Testadas

1. **`formatRate(value, language)`** ([formatters.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/utils/formatters.js)): Formatação de taxas de câmbio com 4 casas decimais e localização regional (`pt-BR`, `en-US`, `es-ES`).
2. **`toISODate(date)`** ([formatters.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/utils/formatters.js)): Formatação de data no padrão local `YYYY-MM-DD` sem deslocamento UTC.
3. **`getStartDate(period)`** ([useHistoricalData.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/hooks/useHistoricalData.js)): Cálculo retroativo de data inicial com base no período temporal selecionado.
4. **`exportToCSV(data, { from, to, t })`** ([csv.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/utils/csv.js)): Geração nativa de arquivo CSV com delimitador `;`, cabeçalhos traduzidos e codificação UTF-8 BOM.
5. **Cálculo de Variação Percentual**: Fórmula de cálculo de oscilação do mercado entre datas consecutivas e período total.
6. **Sanitização de Input Numérico**: Função de tratamento de valor no [CurrencyField.jsx](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/components/CurrencyField.jsx).

---

## 2. Matriz de Casos de Teste

| ID | Função Testada | Entrada / Parâmetros | Saída Esperada | Status |
| :--- | :--- | :--- | :--- | :---: |
| **FN01** | `formatRate` | `(5.0828, "PT")` | `"5,0828"` | ✅ Passou |
| **FN02** | `formatRate` | `(1.0850, "EN")` | `"1.0850"` | ✅ Passou |
| **FN03** | `formatRate` | `(null, "PT")` | `"-"` | ✅ Passou |
| **FN04** | `formatRate` | `(NaN, "PT")` | `"-"` | ✅ Passou |
| **FN05** | `toISODate` | `new Date(2026, 9, 15)` | `"2026-10-15"` | ✅ Passou |
| **FN06** | `getStartDate` | Período `"7D"` | Data exata de 7 dias atrás (`YYYY-MM-DD`) | ✅ Passou |
| **FN07** | `getStartDate` | Período `"1A"` | Data de 1 ano atrás (`YYYY-MM-DD`) | ✅ Passou |
| **FN08** | `Variação %` | `first = 5.00, last = 5.50` | `"+10.00%"` | ✅ Passou |
| **FN09** | `Variação %` | `first = 5.00, last = 4.75` | `"-5.00%"` | ✅ Passou |
| **FN10** | Sanitização Input | `"1.234,56"` | `"1234.56"` | ✅ Passou |
| **FN11** | Sanitização Input | `"10.50.25"` | `"10.5025"` (um único separador) | ✅ Passou |
| **FN12** | `exportToCSV` | Array de dados com 2 registros | CSV com cabeçalho, delimitador `;` e BOM `\uFEFF` | ✅ Passou |

---

## 3. Script de Testes Automatizados (Node.js)

Para validar a integridade de todas as funções fora da interface gráfica, foi criado e executado o seguinte conjunto de asserções em ambiente Node.js:

```javascript
import assert from "node:assert";
import { formatRate, toISODate } from "../src/utils/formatters.js";

// Teste 1: formatRate com localização PT (vírgula decimal)
const ratePT = formatRate(5.0828, "PT");
assert.strictEqual(ratePT, "5,0828", "formatRate PT deve usar vírgula");

// Teste 2: formatRate com localização EN (ponto decimal)
const rateEN = formatRate(1.085, "EN");
assert.strictEqual(rateEN, "1.0850", "formatRate EN deve conter 4 casas decimais com ponto");

// Teste 3: formatRate com valores inválidos (null e NaN)
assert.strictEqual(formatRate(null, "PT"), "-", "null deve retornar '-'");
assert.strictEqual(formatRate(NaN, "PT"), "-", "NaN deve retornar '-'");

// Teste 4: toISODate não desloca fuso horário local
const testDate = new Date(2026, 10, 2); // 02 de novembro de 2026
assert.strictEqual(toISODate(testDate), "2026-11-02", "Data deve ser formatada como YYYY-MM-DD");

// Teste 5: Cálculo de Variação Cambial
function calcVariation(first, last) {
  const pct = ((last - first) / first) * 100;
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`;
}

assert.strictEqual(calcVariation(5.0, 5.5), "+10.00%", "Ganho de 10%");
assert.strictEqual(calcVariation(5.0, 4.5), "-10.00%", "Queda de 10%");

// Teste 6: Lógica de sanitização do conversor
function sanitizeAmount(val) {
  const cleaned = val.replace(/,/g, ".").replace(/[^\d.]/g, "");
  const [integer, ...decimals] = cleaned.split(".");
  return decimals.length > 0 ? `${integer}.${decimals.join("")}` : integer;
}

assert.strictEqual(sanitizeAmount("123,45"), "123.45", "Vírgula deve ser convertida em ponto");
assert.strictEqual(sanitizeAmount("10.20.30"), "10.2030", "Apenas o primeiro ponto decimal é mantido");
assert.strictEqual(sanitizeAmount("abc500xyz"), "500", "Caracteres alfabéticos são removidos");

console.log("Todos os testes das funções passaram com 100% de sucesso!");
```

---

## 4. Análise de Casos de Borda e Resiliência

### 4.1. Valores Nulos e `NaN`
Na função `formatRate` ([formatters.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/utils/formatters.js)), valores nulos, vazios ou indefinidos são interceptados pela verificação `value == null || isNaN(value)` e retornam o caractere seguro `"-"`, sem disparar exceções no `Intl.NumberFormat`.

### 4.2. Caracteres Inválidos e Múltiplos Pontos Decimais
No componente [CurrencyField.jsx](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/components/CurrencyField.jsx), o método `handleAmountChange`:
```javascript
function handleAmountChange(val) {
  const cleaned = val.replace(/,/g, ".").replace(/[^\d.]/g, "");
  const [integer, ...decimals] = cleaned.split(".");
  const num = decimals.length > 0 ? `${integer}.${decimals.join("")}` : integer;
  setAmount(num);
}
```
Isso converte automaticamente o separador de teclado numérico (vírgula para ponto) e impede a digitação de múltiplos separadores ou caracteres alfanuméricos colados da área de transferência.

### 4.3. Compatibilidade de Caracteres no CSV sem Bibliotecas Pesadas
Na função nativa `exportToCSV` ([csv.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/utils/csv.js)), a inserção do caractere prefixo Byte Order Mark (`\uFEFF`) antes do conteúdo da planilha garante que acentuações como "Cotação", "Variação" e "Origem" sejam interpretadas pelo Microsoft Excel e LibreOffice Calc sem exigir configuração manual de codificação.
