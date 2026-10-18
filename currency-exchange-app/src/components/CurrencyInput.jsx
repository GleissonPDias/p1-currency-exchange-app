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
    <div className="bg-white rounded-2xl p-8">
      <p className="text-gray-500 font-semibold">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-semibold text-gray-400">{currency}</span>
        <textarea
          className="text-3xl font-semibold resize-none w-full"
          value={displayValue()}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
        />
      </div>
      <hr className="border-0 bg-slate-200 h-[0.5px] my-4" />
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="w-full p-2 border border-gray-200 rounded"
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
