import { lazy, Suspense, useState, useMemo } from "react";
import { ArrowDownToLine } from "lucide-react";
import { useHistoricalData } from "../hooks/useHistoricalData";
import DataTable from "./DataTable";
import Filters from "./Filters";
import PeriodSelector from "./PeriodSelector";
import { exportToCSV } from "../utils/csv";
import { useLanguage } from "../context/useLanguage";
import { formatRate } from "../utils/formatters";

const Chart = lazy(() => import("./Chart"));

function ExportButton({ onClick, disabled }) {
  const { t } = useLanguage();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center gap-2 bg-emerald-950 text-white font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm hover:bg-emerald-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
    >
      <ArrowDownToLine className="w-4 h-4 sm:w-5 sm:h-5" />
      {t("exportCSV")}
    </button>
  );
}

function ErrorState({ onRetry }) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center border border-gray-100">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {t("errorLoading")}
      </h3>
      <p className="text-sm text-gray-500 mb-6">{t("errorHistory")}</p>
      <button
        onClick={onRetry}
        className="bg-emerald-950 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors"
      >
        {t("retry")}
      </button>
    </div>
  );
}

export default function HistoryField({ from, to }) {
  const [period, setPeriod] = useState("30D");
  const { data, loading, error, refetch } = useHistoricalData(
    from,
    to,
    period,
  );
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minRate: "",
    maxRate: "",
  });
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const { t, language } = useLanguage();

  const { chronologicalData, dataWithVariation, stats } = useMemo(() => {
    const filtered = data
      .filter((row) => {
        if (filters.startDate && row.date < filters.startDate) return false;
        if (filters.endDate && row.date > filters.endDate) return false;
        if (filters.minRate && row.rate < parseFloat(filters.minRate))
          return false;
        if (filters.maxRate && row.rate > parseFloat(filters.maxRate))
          return false;
        return true;
      })
      .sort((a, b) => a.date.localeCompare(b.date));

    if (filtered.length === 0) {
      return { chronologicalData: [], dataWithVariation: [], stats: null };
    }

    let min = Infinity;
    let max = -Infinity;
    const withVariation = filtered.map((row, index) => {
      if (row.rate < min) min = row.rate;
      if (row.rate > max) max = row.rate;
      const prev = filtered[index - 1];
      return {
        ...row,
        variation: prev
          ? ((row.rate - prev.rate) / prev.rate) * 100
          : null,
      };
    });

    const first = filtered[0].rate;
    const last = filtered[filtered.length - 1].rate;
    const statsResult = {
      min,
      max,
      variation: first ? ((last - first) / first) * 100 : 0,
    };

    return {
      chronologicalData: filtered,
      dataWithVariation: withVariation,
      stats: statsResult,
    };
  }, [data, filters]);

  const tableData = useMemo(() => {
    if (!dataWithVariation.length) return [];
    return [...dataWithVariation].sort((a, b) => {
      const valA = sortField === "date" ? a.date : a.rate;
      const valB = sortField === "date" ? b.date : b.rate;
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [dataWithVariation, sortField, sortDir]);

  function handleSort(field) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  function handleExport() {
    exportToCSV(dataWithVariation, { from, to, language, t });
  }

  function clearFilters() {
    setFilters({ startDate: "", endDate: "", minRate: "", maxRate: "" });
  }

  return (
    <section className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t("historyTitle")}
        </h1>
        <PeriodSelector period={period} onChange={setPeriod} />
      </div>

      {loading && (
        <p className="text-gray-400 mt-8 text-center">{t("loadingHistory")}</p>
      )}
      {error && !loading && (
        <div className="mt-8">
          <ErrorState onRetry={refetch} />
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <>
          <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row gap-6">
            <div className="flex-1 w-full min-w-0 bg-white border border-gray-100 rounded-2xl p-2 sm:p-4 shadow-xs">
              <Suspense
                fallback={
                  <p className="text-gray-400 text-center py-8">
                    {t("loadingHistory")}
                  </p>
                }
              >
                <Chart data={chronologicalData} period={period} />
              </Suspense>
            </div>
            {stats && (
              <div className="w-full lg:w-72 border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-row flex-wrap sm:flex-nowrap lg:flex-col justify-between gap-4 bg-white">
                <p className="w-full text-xs text-gray-400 tracking-widest font-semibold uppercase">
                  {t("market")}
                </p>
                <div className="flex-1 sm:flex-initial">
                  <p className="text-xs sm:text-sm text-gray-500">
                    {t("high")}
                  </p>
                  <p className="text-base sm:text-lg font-bold text-gray-900">
                    {formatRate(stats.max, language)}
                  </p>
                </div>
                <hr className="hidden lg:block border-0 bg-slate-200 h-[0.5px]" />
                <div className="flex-1 sm:flex-initial">
                  <p className="text-xs sm:text-sm text-gray-500">{t("low")}</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900">
                    {formatRate(stats.min, language)}
                  </p>
                </div>
                <hr className="hidden lg:block border-0 bg-slate-200 h-[0.5px]" />
                <div className="flex-1 sm:flex-initial">
                  <p className="text-xs sm:text-sm text-gray-500">
                    {t("variation")}
                  </p>
                  <p
                    className={`text-base sm:text-lg font-bold ${
                      stats.variation >= 0
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {`${stats.variation >= 0 ? "+" : ""}${stats.variation.toFixed(2)}%`}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 sm:mt-8">
            <Filters
              filters={filters}
              onChange={setFilters}
              onClear={clearFilters}
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-gray-500">
              {dataWithVariation.length} {t("recordsFound")}
            </p>
            <ExportButton
              onClick={handleExport}
              disabled={dataWithVariation.length === 0}
            />
          </div>

          <div className="mt-4 overflow-x-auto">
            <DataTable
              data={tableData}
              onSort={handleSort}
              sortField={sortField}
              sortDir={sortDir}
            />
          </div>
        </>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="text-gray-400 mt-8 text-center">{t("noDataAvailable")}</p>
      )}
    </section>
  );
}
