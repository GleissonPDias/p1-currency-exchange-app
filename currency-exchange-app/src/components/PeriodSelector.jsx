export default function PeriodSelector({ period, onChange }) {
  const periods = ["7D", "15D", "30D", "3M", "6M", "1A", "5A", "10A"];

  return (
    <div className="flex bg-slate-200 rounded-2xl font-semibold text-slate-500">
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`p-4 rounded-2xl transition-colors ${
            period === p ? "bg-white text-emerald-950" : "hover:bg-slate-300"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
