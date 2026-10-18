import { useLanguage } from "../context/LanguageContext";
import { formatRate } from "../utils/format";

export default function DataTable({ data, onSort, sortField, sortDir }) {
  const { t, language } = useLanguage();

  return (
    <table className="w-full min-w-[540px] border-collapse">
      <thead>
        <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
          <th
            onClick={() => onSort("date")}
            className="py-2 px-4 cursor-pointer select-none"
          >
            {t("data")}{" "}
            {sortField === "date" && (sortDir === "asc" ? "↑" : "↓")}
          </th>
          <th className="py-2 px-4">{t("origin")}</th>
          <th className="py-2 px-4">{t("destination")}</th>
          <th
            onClick={() => onSort("rate")}
            className="py-2 px-4 cursor-pointer select-none"
          >
            {t("rate")}{" "}
            {sortField === "rate" && (sortDir === "asc" ? "↑" : "↓")}
          </th>
          <th className="py-2 px-4">{t("variation")}</th>
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
          data.map((row, i) => {
            const prev = data[i - 1];
            const variation = prev
              ? ((row.rate - prev.rate) / prev.rate) * 100
              : null;
            return (
              <tr key={row.date} className="border-b border-gray-100 text-sm">
                <td className="py-2 px-4">{row.date}</td>
                <td className="py-2 px-4">{row.from}</td>
                <td className="py-2 px-4">{row.to}</td>
                <td className="py-2 px-4">{formatRate(row.rate, language)}</td>
                <td
                  className={`py-2 px-4 ${variation == null ? "text-gray-400" : variation >= 0 ? "text-emerald-600" : "text-red-500"}`}
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
  );
}
