import { useLanguage } from "../context/LanguageContext";

export default function Filters({ filters, onChange, onClear }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center">
      <div className="flex flex-1 sm:flex-none gap-2 min-w-[260px]">
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm bg-white"
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm bg-white"
        />
      </div>
      <div className="flex flex-1 sm:flex-none gap-2 min-w-[200px]">
        <input
          type="number"
          placeholder={t("minRate")}
          value={filters.minRate}
          onChange={(e) => onChange({ ...filters, minRate: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm bg-white"
        />
        <input
          type="number"
          placeholder={t("maxRate")}
          value={filters.maxRate}
          onChange={(e) => onChange({ ...filters, maxRate: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm bg-white"
        />
      </div>
      <button
        onClick={onClear}
        className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-medium px-2 py-1.5 cursor-pointer transition-colors"
      >
        {t("clearFilters")}
      </button>
    </div>
  );
}
