import { useMemo, useState } from "react";
import { useLanguage } from "../context/useLanguage";
import { formatRate } from "../utils/formatters";
import Pagination from "./Pagination";

const DEFAULT_PAGE_SIZE = 10;

export default function DataTable({
  data,
  onSort,
  sortField,
  sortDir,
  pageSize = DEFAULT_PAGE_SIZE,
}) {
  const { t, language } = useLanguage();
  const [page, setPage] = useState(1);
  const [prevData, setPrevData] = useState(data);

  // Volta para a primeira página quando os dados filtrados/ordenados mudam.
  // Ajustar o estado durante a renderização é o padrão recomendado pelo React
  // para "resetar estado quando uma prop muda".
  if (prevData !== data) {
    setPrevData(data);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const rows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, safePage, pageSize]);

  function ariaSort(field) {
    if (sortField !== field) return "none";
    return sortDir === "asc" ? "ascending" : "descending";
  }

  return (
    <>
      <table className="w-full min-w-[540px] border-collapse">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
            <th
              scope="col"
              aria-sort={ariaSort("date")}
              className="py-2 px-4"
            >
              <button
                type="button"
                onClick={() => onSort("date")}
                aria-label={t("sortByDate")}
                className="flex items-center gap-1 cursor-pointer select-none hover:text-gray-800 transition-colors"
              >
                {t("data")}
                {sortField === "date" && (
                  <span aria-hidden="true">
                    {sortDir === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            </th>
            <th scope="col" className="py-2 px-4">
              {t("origin")}
            </th>
            <th scope="col" className="py-2 px-4">
              {t("destination")}
            </th>
            <th
              scope="col"
              aria-sort={ariaSort("rate")}
              className="py-2 px-4"
            >
              <button
                type="button"
                onClick={() => onSort("rate")}
                aria-label={t("sortByRate")}
                className="flex items-center gap-1 cursor-pointer select-none hover:text-gray-800 transition-colors"
              >
                {t("rate")}
                {sortField === "rate" && (
                  <span aria-hidden="true">
                    {sortDir === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            </th>
            <th scope="col" className="py-2 px-4">
              {t("variation")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-400">
                {t("noData")}
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              const { variation } = row;
              return (
                <tr
                  key={`${row.date}-${row.from}-${row.to}`}
                  className="border-b border-gray-100 text-sm"
                >
                  <td className="py-2 px-4">{row.date}</td>
                  <td className="py-2 px-4">{row.from}</td>
                  <td className="py-2 px-4">{row.to}</td>
                  <td className="py-2 px-4">
                    {formatRate(row.rate, language)}
                  </td>
                  <td
                    className={`py-2 px-4 ${
                      variation == null
                        ? "text-gray-400"
                        : variation >= 0
                          ? "text-emerald-600"
                          : "text-red-500"
                    }`}
                  >
                    {variation == null
                      ? "—"
                      : `${variation >= 0 ? "+" : ""}${variation.toFixed(2)}%`}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <Pagination
        page={safePage}
        pageSize={pageSize}
        totalItems={data.length}
        onPageChange={setPage}
      />
    </>
  );
}
