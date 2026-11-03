import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { useLanguage } from "../context/useLanguage";
import { formatRate } from "../utils/formatters";
import { TOP_CURRENCIES, useTopCurrencies } from "../hooks/useTopCurrencies";

const COUNTRY_CODES = {
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  JPY: "jp",
  CNY: "cn",
};

function VariationBadge({ variation, isBase, loading }) {
  const { t } = useLanguage();

  if (loading) {
    return <span className="h-5 w-24 rounded-md bg-emerald-200 animate-pulse" />;
  }

  if (isBase) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
        <Minus className="w-3.5 h-3.5" />
        {t("baseCurrency")}
      </span>
    );
  }

  if (variation == null) {
    return <span className="text-xs text-emerald-700">—</span>;
  }

  const isUp = variation >= 0;
  const Icon = isUp ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${
        isUp ? "text-emerald-800" : "text-red-700"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {isUp ? "+" : ""}
      {variation.toFixed(2)}%
      <span
        className={`font-normal ${isUp ? "text-emerald-700" : "text-red-700"}`}
      >
        {t("rateVsPreviousDay")}
      </span>
    </span>
  );
}

export default function TopCurrencyCards({ from, currencies = {} }) {
  const { t, language } = useLanguage();
  const { rates, variations, loading, error } = useTopCurrencies(from);

  return (
    <section
      className="mx-4 sm:mx-6 md:mx-8 my-6"
      aria-label={t("topCurrenciesTitle")}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
        <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-emerald-700">
          {t("topCurrenciesTitle")}
        </h2>
        <p className="text-[11px] sm:text-xs text-emerald-600">
          {t("basedOn")}{" "}
          <span className="font-semibold text-emerald-800">{from}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {TOP_CURRENCIES.map((code) => {
          const rate = rates[code];
          const variation = variations[code];
          const isBase = code === from;
          const isDown = !isBase && variation != null && variation < 0;

          const tone = isDown
            ? {
                card: "bg-red-100 border-red-200 hover:bg-red-200/70",
                strong: "text-red-950",
                muted: "text-red-700",
                skeleton: "bg-red-200",
              }
            : {
                card: "bg-emerald-100 border-emerald-200 hover:bg-emerald-200/70",
                strong: "text-emerald-950",
                muted: "text-emerald-700",
                skeleton: "bg-emerald-200",
              };

          return (
            <article
              key={code}
              className={`${tone.card} border rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col gap-3 transition-colors ${
                code === TOP_CURRENCIES[TOP_CURRENCIES.length - 1]
                  ? "col-span-2 sm:col-span-1"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={`https://flagcdn.com/w40/${COUNTRY_CODES[code] || "un"}.png`}
                  srcSet={`https://flagcdn.com/w80/${COUNTRY_CODES[code] || "un"}.png 2x`}
                  width="24"
                  height="18"
                  alt=""
                  aria-hidden="true"
                  className="w-6 h-4.5 rounded-xs object-cover shadow-xs border border-black/10 shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className={`text-sm font-semibold leading-tight ${tone.strong}`}>
                    {code}
                  </p>
                  <p className={`text-[11px] truncate ${tone.muted}`}>
                    {currencies[code] || code}
                  </p>
                </div>
              </div>

              <div>
                <p className={`text-[11px] ${tone.muted}`}>1 {from} =</p>
                {loading ? (
                  <span
                    className={`mt-1 block h-6 w-24 rounded-md animate-pulse ${tone.skeleton}`}
                  />
                ) : (
                  <p className={`text-base sm:text-lg font-bold leading-tight ${tone.strong}`}>
                    {formatRate(rate, language)}{" "}
                    <span className={`text-xs font-semibold ${tone.muted}`}>
                      {code}
                    </span>
                  </p>
                )}
              </div>

              <VariationBadge
                variation={variation}
                isBase={isBase}
                loading={loading}
              />
            </article>
          );
        })}
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-500">{t("topCurrenciesError")}</p>
      )}
    </section>
  );
}
