import { useLanguage } from "../context/LanguageContext";

export default function CurrencyInput({
  label,
  value,
  onChange,
  currency,
  onCurrencyChange,
  currencies,
  readOnly,
}) {
  const { language } = useLanguage();

  const displayValue = () => {
    if (readOnly && value && !isNaN(parseFloat(value))) {
      return new Intl.NumberFormat(
        { PT: "pt-BR", EN: "en-US", ES: "es-ES" }[language] || "pt-BR",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 },
      ).format(parseFloat(value));
    }
    return value;
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 w-full shadow-sm">
      <p className="text-gray-500 font-semibold text-xs sm:text-sm">{label}</p>
      <div className="flex items-baseline gap-1.5 mt-1">
        <span className="text-lg sm:text-xl font-semibold text-gray-400">{currency}</span>
        <textarea
          className="text-2xl sm:text-3xl font-semibold resize-none w-full outline-none focus:ring-0 bg-transparent text-gray-900"
          rows={1}
          value={displayValue()}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
        />
      </div>
      <hr className="border-0 bg-slate-200 h-[0.5px] my-3 sm:my-4" />
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="w-full p-2 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
      >
        {Object.keys(currencies).map((code) => (
          <option key={code} value={code}>
            {code} — {currencies[code]}
          </option>
        ))}
      </select>
    </div>
  );
}
