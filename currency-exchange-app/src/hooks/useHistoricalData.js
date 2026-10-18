import { useState, useEffect } from "react";
import { fetchHistory } from "../services/api";

export function useHistoricalData(from, to, period) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    return start.toISOString().split("T")[0];
  }

  useEffect(() => {
    if (!from || !to || from === to) {
      setData([]);
      setLoading(false);
      return;
    }

    const startDate = getStartDate(period);
    const endDate = new Date().toISOString().split("T")[0];

    setLoading(true);
    setError(null);

    fetchHistory(from, to, startDate, endDate)
      .then((res) => {
        const items = Object.entries(res.rates).map(([date, val]) => ({
          date,
          rate: val[to],
          from,
          to,
        }));
        setData(items);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [from, to, period]);

  return { data, loading, error };
}
