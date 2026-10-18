import { ArrowDownToLine } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ExportButton({ onClick, disabled }) {
  const { t } = useLanguage();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 bg-emerald-950 text-white font-semibold p-2 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ArrowDownToLine />
      {t("exportCSV")}
    </button>
  );
}
