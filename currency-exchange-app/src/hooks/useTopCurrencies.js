import { useEffect, useState } from "react";
import { fetchRecentRates } from "../services/api";

export const TOP_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CNY"];

export function useTopCurrencies(from) {
  const [state, setState] = useState({
    from: null,
    rates: {},
    variations: {},
    date: null,
    error: null,
  });

  useEffect(() => {
    if (!from) return;

    const controller = new AbortController();
    let cancelled = false;
    const targets = TOP_CURRENCIES.filter((code) => code !== from);

    fetchRecentRates(from, targets, 7, controller.signal)
      .then((res) => {
        if (cancelled) return;

        const dates = Object.keys(res.rates || {}).sort();
        const latestDate = dates[dates.length - 1];
        const previousDate = dates[dates.length - 2];
        const latest = latestDate ? res.rates[latestDate] : {};
        const previous = previousDate ? res.rates[previousDate] : {};

        const rates = {};
        const variations = {};

        TOP_CURRENCIES.forEach((code) => {
          if (code === from) {
            rates[code] = 1;
            variations[code] = null;
            return;
          }

          const current = latest[code] ?? null;
          const prev = previous[code];

          rates[code] = current;
          variations[code] =
            current != null && prev != null
              ? ((current - prev) / prev) * 100
              : null;
        });

        setState({
          from,
          rates,
          variations,
          date: res.end_date || latestDate || null,
          error: null,
        });
      })
      .catch((err) => {
        if (cancelled || err.name === "AbortError") return;
        setState({
          from,
          rates: {},
          variations: {},
          date: null,
          error: err.message,
        });
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [from]);

  const isCurrent = !from || state.from === from;

  return {
    rates: isCurrent ? state.rates : {},
    variations: isCurrent ? state.variations : {},
    date: isCurrent ? state.date : null,
    loading: Boolean(from) && !isCurrent,
    error: isCurrent ? state.error : null,
  };
}
