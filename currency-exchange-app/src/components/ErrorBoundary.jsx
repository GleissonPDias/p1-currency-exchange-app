import { Component } from "react";
import { useLanguage } from "../context/useLanguage";

function AppErrorFallback() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-md text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-emerald-950">
          {t("appErrorTitle")}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500">
          {t("appErrorDescription")}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 bg-emerald-950 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors"
        >
          {t("reload")}
        </button>
      </div>
    </div>
  );
}

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled application error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <AppErrorFallback />;
    }

    return this.props.children;
  }
}
