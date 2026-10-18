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
    <section className="bg-emerald-950 rounded-2xl flex flex-col m-8">
      <h1 className="text-white text-2xl p-8">{t("converterTitle")}</h1>
      <hr className="border-0 bg-slate-700 h-[0.5px]" />
      <div className="p-8 flex justify-center items-center gap-8">
        <CurrencyInput
          label={t("youSend")}
          value={amount}
          onChange={handleAmountChange}
          currency={from}
          onCurrencyChange={onFromChange}
          currencies={currencies}
        />
        <button
          onClick={handleSwap}
          className="flex items-center justify-center rounded-full w-14 h-14 border border-gray-500 hover:bg-emerald-800 transition-colors"
        >
          <ArrowRightLeft color="white" />
        </button>
        <CurrencyInput
          label={t("youReceive")}
          value={result ? result.toFixed(4) : ""}
          readOnly
          currency={to}
          onCurrencyChange={onToChange}
          currencies={currencies}
        />
      </div>
      {loading && (
        <div className="text-gray-300 p-4 rounded-b-2xl text-center">
          {t("loading")}
        </div>
      )}
      {error && (
        <div className="text-red-300 p-4 rounded-b-2xl text-center">
          {t("errorLoading")}
        </div>
      )}
      {rate && !loading && !error && (
        <div className="flex text-gray-200 bg-emerald-900 p-4 rounded-b-2xl">
          <p className="flex-1">{t("commercialRate")}</p>
          <p>
            1 {from} = {formatRate(rate, language)} {to} • {date}
          </p>
        </div>
      )}
    </section>
  );
}
