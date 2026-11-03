import { useCallback, useEffect, useState } from "react";
import { fetchHistory } from "../services/api";
import { toISODate } from "../utils/formatters";

function getStartDate(period) {
  const end = new Date();
  const start = new Date();

  switch (period) {
    case "7D":
      start.setDate(end.getDate() - 7);
      break;
    case "15D":
      start.setDate(end.getDate() - 15);
      break;
    case "30D":
      start.setDate(end.getDate() - 30);
      break;
    case "3M":
      start.setMonth(end.getMonth() - 3);
      break;
    case "6M":
      start.setMonth(end.getMonth() - 6);
      break;
    case "1A":
      start.setFullYear(end.getFullYear() - 1);
      break;
    case "5A":
      start.setFullYear(end.getFullYear() - 5);
      break;
    case "10A":
      start.setFullYear(end.getFullYear() - 10);
      break;
    default:
      start.setDate(end.getDate() - 30);
  }

  return toISODate(start);
}

export function useHistoricalData(from, to, period) {
  const [retryKey, setRetryKey] = useState(0);
  const key = `${from}|${to}|${period}|${retryKey}`;
  const [state, setState] = useState({ key: null, data: [], error: null });

  useEffect(() => {
    if (!from || !to || from === to) return;

    const controller = new AbortController();
    let cancelled = false;
    const startDate = getStartDate(period);
    const endDate = toISODate();

    fetchHistory(from, to, startDate, endDate, controller.signal)
      .then((res) => {
        if (cancelled) return;

        const items = Object.entries(res.rates || {})
          .map(([date, val]) => ({
            date,
            rate: val[to],
            from,
            to,
          }))
          .sort((a, b) => a.date.localeCompare(b.date));

        setState({ key, data: items, error: null });
      })
      .catch((err) => {
        if (cancelled || err.name === "AbortError") return;
        setState({ key, data: [], error: err.message });
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [from, to, period, key]);

  const active = Boolean(from && to && from !== to);
  const isCurrent = state.key === key;

  const refetch = useCallback(() => setRetryKey((value) => value + 1), []);

  return {
    data: isCurrent ? state.data : [],
    loading: active && !isCurrent && !state.error,
    error: isCurrent ? state.error : null,
    refetch,
  };
}
