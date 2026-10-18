import { useLanguage } from "../context/LanguageContext";

export default function Filters({ filters, onChange, onClear }) {
  const { t } = useLanguage();

  return (
    <div className="flex gap-4 items-center flex-wrap">
      <input
        type="date"
        value={filters.startDate}
        onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      />
      <input
        type="date"
        value={filters.endDate}
        onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      />
      <input
        type="number"
        placeholder={t("minRate")}
        value={filters.minRate}
        onChange={(e) => onChange({ ...filters, minRate: e.target.value })}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      />
      <input
        type="number"
        placeholder={t("maxRate")}
        value={filters.maxRate}
        onChange={(e) => onChange({ ...filters, maxRate: e.target.value })}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      />
      <button
        onClick={onClear}
        className="text-sm text-red-500 hover:text-red-700"
      >
        {t("clearFilters")}
      </button>
    </div>
  );
}
