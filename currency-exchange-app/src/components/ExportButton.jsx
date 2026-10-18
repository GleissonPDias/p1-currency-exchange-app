import { ArrowDownToLine } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ExportButton({ onClick, disabled }) {
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
