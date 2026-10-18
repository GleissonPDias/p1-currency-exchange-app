import { useEffect, useState } from "react";
import { fetchLatestRate } from "../services/api";

export function useExchangeRate(from, to) {
  const [rate, setRate] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!from || !to || from === to) {
      setRate(null);
      setDate(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchLatestRate(from, to)
      .then(({ rate, date }) => {
        setRate(rate);
        setDate(date);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [from, to]);

  return { rate, date, loading, error };
}
