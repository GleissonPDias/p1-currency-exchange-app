import { useState, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";
import CurrencyInput from "./CurrencyInput";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { useLanguage } from "../context/LanguageContext";
import { formatRate } from "../utils/format";

export default function CurrencyField({
  currencies,
  from,
  to,
  onFromChange,
  onToChange,
}) {
  const [amount, setAmount] = useState("1000");
  const { rate, date, loading, error } = useExchangeRate(from, to);
  const { t, language } = useLanguage();

  const result =
    rate && amount && !isNaN(parseFloat(amount))
      ? parseFloat(amount) * rate
      : null;

  function handleSwap() {
    onFromChange(to);
    onToChange(from);
  }

  function handleAmountChange(val) {
    const num = val.replace(/[^0-9.]/g, "");
    setAmount(num);
  }

  return (
    <section className="bg-emerald-950 rounded-2xl flex flex-col mx-4 my-6 sm:mx-6 md:mx-8 shadow-xl overflow-hidden">
      <h1 className="text-white text-xl sm:text-2xl p-5 sm:p-7 md:p-8 font-bold">{t("converterTitle")}</h1>
      <hr className="border-0 bg-slate-700 h-[0.5px]" />
      <div className="p-4 sm:p-6 md:p-8 flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8">
        <div className="w-full md:flex-1">
          <CurrencyInput
            label={t("youSend")}
            value={amount}
            onChange={handleAmountChange}
            currency={from}
            onCurrencyChange={onFromChange}
            currencies={currencies}
          />
        </div>
        <button
          onClick={handleSwap}
          aria-label="Trocar moedas"
          className="flex items-center justify-center shrink-0 rounded-full w-12 h-12 sm:w-14 sm:h-14 border border-gray-500 hover:bg-emerald-800 transition-all shadow-md rotate-90 md:rotate-0"
        >
          <ArrowRightLeft color="white" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="w-full md:flex-1">
          <CurrencyInput
            label={t("youReceive")}
            value={result ? result.toFixed(4) : ""}
            readOnly
            currency={to}
            onCurrencyChange={onToChange}
            currencies={currencies}
          />
        </div>
      </div>
      {loading && (
        <div className="text-gray-300 p-4 text-center text-sm">
          {t("loading")}
        </div>
      )}
      {error && (
        <div className="text-red-300 p-4 text-center text-sm">
          {t("errorLoading")}
        </div>
      )}
      {rate && !loading && !error && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-gray-200 bg-emerald-900/90 p-4 px-6 text-xs sm:text-sm">
          <p className="font-medium">{t("commercialRate")}</p>
          <p className="text-gray-300">
            1 {from} = {formatRate(rate, language)} {to} • {date}
          </p>
        </div>
      )}
    </section>
  );
}
