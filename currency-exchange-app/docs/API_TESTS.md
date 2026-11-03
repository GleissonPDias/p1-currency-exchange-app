# 🧪 Investigação e Testes de API (Postman) — Hermes

Este documento consolida os testes de integração e investigação técnica realizados na API pública **Frankfurter** (`https://api.frankfurter.dev/v1`), utilizada como backend de dados cambiais do projeto **Hermes**.

A collection completa e executável do Postman está disponível em:  
📁 [Hermes_Currency_API.postman_collection.json](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/docs/Hermes_Currency_API.postman_collection.json)

---

## 1. Visão Geral da API Frankfurter

- **Base URL:** `https://api.frankfurter.dev/v1` (configurável via variável de ambiente `VITE_API_BASE_URL`).
- **Provedor de Dados:** Banco Central Europeu (BCE / ECB).
- **Protocolo:** HTTPS / REST / JSON.
- **Autenticação:** Aberta (sem necessidade de API Key).
- **CORS:** Habilitado nativamente (`access-control-allow-origin: *`).
- **Frequência de Atualização:** Diária, por volta das 16:00 CET em dias úteis bancários.
- **Camada de Consumo no Hermes:** Implementada em [api.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/services/api.js) com timeout de 10s via `AbortSignal.timeout`, retry automático de até 2 tentativas em caso de erro 5xx/timeout/TypeError e cache em memória de 5 minutos por URL.

---

## 2. Matriz de Testes de Endpoints

| ID | Cenário de Teste | Método | Endpoint / Query Params | Status Esperado | Status Obtido | Tempo Médio |
| :--- | :--- | :---: | :--- | :---: | :---: | :---: |
| **API-01** | Listar moedas disponíveis | `GET` | `/currencies` | `200 OK` | `200 OK` | ~120ms |
| **API-02** | Cotação mais recente (USD -> BRL) | `GET` | `/latest?from=USD&to=BRL` | `200 OK` | `200 OK` | ~95ms |
| **API-03** | Cotação mais recente (EUR -> USD) | `GET` | `/latest?from=EUR&to=USD` | `200 OK` | `200 OK` | ~90ms |
| **API-04** | Histórico por intervalo de datas | `GET` | `/{startDate}..{endDate}?from=USD&to=BRL` | `200 OK` | `200 OK` | ~180ms |
| **API-05** | Série Recente Multi-Moedas (Top Cards) | `GET` | `/{startDate}..{endDate}?from=USD&to=EUR,GBP,JPY,CNY` | `200 OK` | `200 OK` | ~140ms |
| **API-06** | Erro com moeda inválida | `GET` | `/latest?from=INVALID&to=BRL` | `404 Not Found` | `404 Not Found` | ~85ms |
| **API-07** | Cotação de moedas idênticas | `GET` | `/latest?from=USD&to=USD` | `200 OK` | `200 OK` | ~70ms |

---

## 3. Detalhamento dos Testes Realizados

### 3.1. Teste API-01: Listagem de Moedas
- **Objetivo:** Garantir que o catálogo de moedas ativas seja retornado em formato chave-valor (código ISO e nome completo).
- **Requisição:** `GET https://api.frankfurter.dev/v1/currencies`
- **Headers:** `Accept: application/json`
- **Payload de Resposta (Amostra):**
  ```json
  {
    "AUD": "Australian Dollar",
    "BRL": "Brazilian Real",
    "CAD": "Canadian Dollar",
    "CHF": "Swiss Franc",
    "EUR": "Euro",
    "GBP": "British Pound",
    "JPY": "Japanese Yen",
    "USD": "United States Dollar"
  }
  ```
- **Script de Teste (Postman):**
  ```javascript
  pm.test("Status 200 OK", () => pm.response.to.have.status(200));
  pm.test("Retorna dicionário de moedas", () => {
      const data = pm.response.json();
      pm.expect(data).to.have.property("USD");
      pm.expect(data).to.have.property("BRL");
      pm.expect(Object.keys(data).length).to.be.above(25);
  });
  ```

---

### 3.2. Teste API-02: Cotação Atual (USD -> BRL)
- **Objetivo:** Obter a taxa de conversão em tempo real e a data de referência oficial para o cálculo no conversor `CurrencyField`.
- **Requisição:** `GET https://api.frankfurter.dev/v1/latest?from=USD&to=BRL`
- **Payload de Resposta:**
  ```json
  {
    "amount": 1,
    "base": "USD",
    "date": "2026-11-02",
    "rates": {
      "BRL": 5.4378
    }
  }
  ```
- **Validações:**
  - `amount === 1`
  - `base === "USD"`
  - `rates.BRL` é um número positivo com até 4 casas decimais.
  - `date` respeita o formato ISO `YYYY-MM-DD`.

---

### 3.3. Teste API-04: Série Temporal Histórica
- **Objetivo:** Obter cotações diárias consecutivas para alimentar o gráfico de área e a tabela analítica com cálculo de variações.
- **Requisição:** `GET https://api.frankfurter.dev/v1/2026-10-01..2026-11-02?from=USD&to=BRL`
- **Payload de Resposta:**
  ```json
  {
    "amount": 1,
    "base": "USD",
    "start_date": "2026-10-01",
    "end_date": "2026-11-02",
    "rates": {
      "2026-10-01": { "BRL": 5.4412 },
      "2026-10-02": { "BRL": 5.4214 },
      "2026-11-02": { "BRL": 5.4378 }
    }
  }
  ```
- **Comportamento Observado:** A API não retorna dias de finais de semana e feriados bancários. O frontend trata a ausência mapeando as datas existentes em ordem cronológica contínua.

---

### 3.4. Teste API-05: Série Recente Multi-Moedas (TopCurrencyCards)
- **Objetivo:** Obter a cotação recente das 5 principais moedas em uma única requisição para calcular a variação diária dos cards de destaque.
- **Requisição:** `GET https://api.frankfurter.dev/v1/2026-10-26..2026-11-02?from=USD&to=EUR,GBP,JPY,CNY`
- **Payload de Resposta:**
  ```json
  {
    "amount": 1,
    "base": "USD",
    "start_date": "2026-10-26",
    "end_date": "2026-11-02",
    "rates": {
      "2026-10-30": { "EUR": 0.8938, "GBP": 0.7492, "JPY": 157.45, "CNY": 6.6681 },
      "2026-11-02": { "EUR": 0.8915, "GBP": 0.7451, "JPY": 157.90, "CNY": 6.6483 }
    }
  }
  ```
- **Validações:**
  - Retorna as cotações de todas as moedas solicitadas para cada dia útil.
  - O hook `useTopCurrencies` compara a última data com a penúltima data para computar a variação percentual.

---

### 3.5. Teste API-06: Resiliência e Tratamento de Erro (404 Not Found)
- **Objetivo:** Verificar a resposta da API diante de parâmetros inexistentes ou formato inválido.
- **Requisição:** `GET https://api.frankfurter.dev/v1/latest?from=INVALID&to=BRL`
- **Código HTTP:** `404 Not Found`
- **Payload de Resposta:**
  ```json
  {
    "message": "not found"
  }
  ```
- **Tratamento no Frontend:** A função [api.js](file:///c:/Users/GleissonBdf/Downloads/p1-currency-exchange-app/currency-exchange-app/src/services/api.js) captura `!res.ok`, lança um `Error` e os componentes exibem feedback amigável com opção de retry manual (banner de alerta no topo para `/currencies` e card `ErrorState` no histórico).

---

## 4. Como Executar a Collection no Postman

1. Abra o **Postman**.
2. Clique no botão **Import** (canto superior esquerdo).
3. Selecione o arquivo `docs/Hermes_Currency_API.postman_collection.json`.
4. Clique com o botão direito na Collection importada e selecione **Run Collection**.
5. Verifique que todos os testes automatizados foram executados com status `PASS`.
