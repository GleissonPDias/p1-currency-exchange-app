export default function PeriodSelector({ period, onChange }) {
  const periods = ["7D", "15D", "30D", "3M", "6M", "1A", "5A", "10A"];

  return (
    <div className="flex max-w-full overflow-x-auto bg-slate-200 rounded-xl sm:rounded-2xl font-semibold text-slate-500 p-1 text-xs sm:text-sm">
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl transition-all whitespace-nowrap shrink-0 ${
            period === p ? "bg-white text-emerald-950 shadow-sm" : "hover:bg-slate-300"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
