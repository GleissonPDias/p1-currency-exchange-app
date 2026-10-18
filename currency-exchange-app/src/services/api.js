const BASE_URL = "https://api.frankfurter.dev/v1";

export async function fetchCurrencies() {
  const res = await fetch(`${BASE_URL}/currencies`);
  if (!res.ok) throw new Error("Erro ao carregar moedas");
  return res.json();
}

export async function fetchLatestRate(from, to) {
  const res = await fetch(`${BASE_URL}/latest?from=${from}&to=${to}`, {
    mode: "cors",
  });
  if (!res.ok) throw new Error("Erro ao carregar cotacao");
  const data = await res.json();
  return { rate: data.rates[to], date: data.date };
}

export async function fetchHistory(from, to, startDate, endDate) {
  const res = await fetch(
    `${BASE_URL}/${startDate}..${endDate}?from=${from}&to=${to}`,
    { mode: "cors" },
  );
  if (!res.ok) throw new Error("Erro ao carregar historico");
  return res.json();
}
