import { toISODate } from "../utils/formatters";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.frankfurter.dev/v1";
const TIMEOUT_MS = 10_000;
const MAX_ATTEMPTS = 2;
const RETRY_DELAY_MS = 400;
const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map();

async function request(path, signal) {
  const url = `${BASE_URL}${path}`;
  const cached = cache.get(url);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const timeoutSignal = AbortSignal.timeout(TIMEOUT_MS);
    const combinedSignal = signal
      ? AbortSignal.any([signal, timeoutSignal])
      : timeoutSignal;

    try {
      const res = await fetch(url, { mode: "cors", signal: combinedSignal });

      if (!res.ok) {
        const error = new Error(`Request failed with status ${res.status}`);
        error.status = res.status;
        throw error;
      }

      const data = await res.json();
      cache.set(url, { data, timestamp: Date.now() });
      return data;
    } catch (err) {
      if (signal?.aborted) throw err;

      const timedOut = timeoutSignal.aborted;
      const retryable =
        timedOut || err.name === "TypeError" || err.status >= 500;

      if (!retryable || attempt === MAX_ATTEMPTS) {
        if (timedOut) throw new Error("Request timed out", { cause: err });
        throw err;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY_MS * attempt),
      );
    }
  }

  throw new Error("Request failed");
}

export function fetchCurrencies(signal) {
  return request("/currencies", signal);
}

export async function fetchLatestRate(from, to, signal) {
  const data = await request(`/latest?from=${from}&to=${to}`, signal);
  return { rate: data.rates[to], date: data.date };
}

export function fetchHistory(from, to, startDate, endDate, signal) {
  return request(
    `/${startDate}..${endDate}?from=${from}&to=${to}`,
    signal,
  );
}

export function fetchRecentRates(from, to, days = 7, signal) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);

  return request(
    `/${toISODate(start)}..${toISODate(end)}?from=${from}&to=${to.join(",")}`,
    signal,
  );
}
