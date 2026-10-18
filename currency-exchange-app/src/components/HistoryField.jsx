import { useState, useMemo } from "react";
import { useHistoricalData } from "../hooks/useHistoricalData";
import Chart from "./Chart";
import DataTable from "./DataTable";
import Filters from "./Filters";
import PeriodSelector from "./PeriodSelector";
import ExportButton from "./ExportButton";
import ErrorState from "./ErrorState";
import { exportToCSV } from "../utils/csv";
import { useLanguage } from "../context/LanguageContext";
import { formatRate } from "../utils/format";

export default function HistoryField({ from, to }) {
  const [period, setPeriod] = useState("30D");
  const { data, loading, error } = useHistoricalData(from, to, period);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minRate: "",
    maxRate: "",
  });
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const { t, language } = useLanguage();

  const filteredData = useMemo(() => {
    let result = [...data];
    if (filters.startDate)
      result = result.filter((r) => r.date >= filters.startDate);
    if (filters.endDate)
      result = result.filter((r) => r.date <= filters.endDate);
    if (filters.minRate)
      result = result.filter((r) => r.rate >= parseFloat(filters.minRate));
    if (filters.maxRate)
      result = result.filter((r) => r.rate <= parseFloat(filters.maxRate));

    result.sort((a, b) => {
      const valA = sortField === "date" ? a.date : a.rate;
      const valB = sortField === "date" ? b.date : b.rate;
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, filters, sortField, sortDir]);

  function handleSort(field) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  function handleExport() {
    exportToCSV(filteredData, from, to);
  }

  function clearFilters() {
    setFilters({ startDate: "", endDate: "", minRate: "", maxRate: "" });
  }

  return (
    <section className="p-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl">{t("historyTitle")}</h1>
        <PeriodSelector period={period} onChange={setPeriod} />
      </div>

      {loading && (
        <p className="text-gray-400 mt-8 text-center">{t("loadingHistory")}</p>
      )}
      {error && !loading && (
        <div className="mt-8">
          <ErrorState onRetry={() => setPeriod((p) => p)} />
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <>
          <div className="mt-8 flex gap-4">
            <div className="flex-1">
              <Chart data={filteredData} period={period} />
            </div>
            <div className="w-64 border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
              <p className="text-xs text-gray-400 tracking-widest font-semibold">
                MERCADO
              </p>
              <div>
                <p className="text-sm text-gray-500">Máxima</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatRate(
                    Math.max(...filteredData.map((d) => d.rate)),
                    language,
                  )}
                </p>
              </div>
              <hr className="border-0 bg-slate-200 h-[0.5px]" />
              <div>
                <p className="text-sm text-gray-500">Mínima</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatRate(
                    Math.min(...filteredData.map((d) => d.rate)),
                    language,
                  )}
                </p>
              </div>
              <hr className="border-0 bg-slate-200 h-[0.5px]" />
              <div>
                <p className="text-sm text-gray-500">Variação</p>
                <p className="text-lg font-bold text-emerald-600">
                  {(() => {
                    const rates = filteredData.map((d) => d.rate);
                    const first = rates[0];
                    const last = rates[rates.length - 1];
                    const pct = ((last - first) / first) * 100;
                    return `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`;
                  })()}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Filters
              filters={filters}
              onChange={setFilters}
              onClear={clearFilters}
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {filteredData.length} {t("recordsFound")}
            </p>
            <ExportButton
              onClick={handleExport}
              disabled={filteredData.length === 0}
            />
          </div>

          <div className="mt-4 overflow-x-auto">
            <DataTable
              data={filteredData}
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
