import { useEffect, useState } from "react";
import { fetchLatestRate } from "../services/api";

export function useExchangeRate(from, to) {
  const key = `${from}|${to}`;
  const [state, setState] = useState({
    key: null,
    rate: null,
    date: null,
    error: null,
  });

  useEffect(() => {
    if (!from || !to || from === to) return;

    const controller = new AbortController();
    let cancelled = false;

    fetchLatestRate(from, to, controller.signal)
      .then(({ rate, date }) => {
        if (cancelled) return;
        setState({ key, rate, date, error: null });
      })
      .catch((err) => {
        if (cancelled || err.name === "AbortError") return;
        setState({ key, rate: null, date: null, error: err.message });
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [from, to, key]);

  const active = Boolean(from && to && from !== to);
  const isCurrent = state.key === key;

  return {
    rate: isCurrent ? state.rate : null,
    date: isCurrent ? state.date : null,
    loading: active && !isCurrent && !state.error,
    error: isCurrent ? state.error : null,
  };
}
