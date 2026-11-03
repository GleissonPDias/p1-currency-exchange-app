import Header from "./components/Header";
import Title from "./components/Title";
import CurrencyField from "./components/CurrencyField";
import TopCurrencyCards from "./components/TopCurrencyCards";
import HistoryField from "./components/HistoryField";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { fetchCurrencies } from "./services/api";
import { useLanguage } from "./context/useLanguage";

function App() {
  const { t } = useLanguage();
  const [currencies, setCurrencies] = useState({});
  const [currenciesError, setCurrenciesError] = useState(null);
  const [currenciesRetry, setCurrenciesRetry] = useState(0);
  const [from, setFrom] = useState("BRL");
  const [to, setTo] = useState("USD");

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    fetchCurrencies(controller.signal)
      .then((data) => {
        if (cancelled) return;
        setCurrencies(data);
        setCurrenciesError(null);
      })
      .catch((err) => {
        if (cancelled || err.name === "AbortError") return;
        setCurrenciesError(err.message);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [currenciesRetry]);

  function handleRetryCurrencies() {
    setCurrenciesError(null);
    setCurrenciesRetry((value) => value + 1);
  }

  return (
    <div className="bg-white min-h-screen w-full flex flex-col justify-between">
      <div className="max-w-7xl w-full mx-auto">
        <Header />
        <hr className="border-0 bg-slate-200 h-[0.5px] mx-4 sm:mx-6 md:mx-8" />
        <Title />
        {currenciesError && (
          <div
            role="alert"
            className="mx-4 sm:mx-6 md:mx-8 mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <span>{t("currenciesError")}</span>
            <button
              type="button"
              onClick={handleRetryCurrencies}
              className="font-semibold underline underline-offset-2 hover:text-red-900"
            >
              {t("retry")}
            </button>
          </div>
        )}
        <TopCurrencyCards from={from} currencies={currencies} />
        <CurrencyField
          currencies={currencies}
          from={from}
          to={to}
          onFromChange={setFrom}
          onToChange={setTo}
        />
        <HistoryField from={from} to={to} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
