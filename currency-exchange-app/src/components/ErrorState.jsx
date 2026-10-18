import { useLanguage } from "../context/LanguageContext";

export default function ErrorState({ onRetry }) {
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
