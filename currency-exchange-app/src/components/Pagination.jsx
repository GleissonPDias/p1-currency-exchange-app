import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/useLanguage";

export default function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
}) {
  const { t } = useLanguage();

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 sm:px-4 py-3">
      <p aria-live="polite" className="text-xs sm:text-sm text-gray-500">
        {t("page")} {page} {t("of")} {totalPages} · {start}–{end} {t("of")}{" "}
        {totalItems}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label={t("previous")}
          className="flex items-center gap-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">{t("previous")}</span>
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label={t("next")}
          className="flex items-center gap-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span className="hidden sm:inline">{t("next")}</span>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
