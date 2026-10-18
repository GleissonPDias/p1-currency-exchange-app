import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { ptBR, enUS, es } from "date-fns/locale";
import { useLanguage } from "../context/LanguageContext";

const locales = { PT: ptBR, EN: enUS, ES: es };

function formatDate(dateStr, period, language) {
  const date = parseISO(dateStr);
  const locale = locales[language] || ptBR;
  if (period === "7D" || period === "15D" || period === "30D")
    return format(date, "dd MMM", { locale });
  if (period === "3M" || period === "6M")
    return format(date, "MMM yy", { locale });
  if (period === "1A") return format(date, "MMM yyyy", { locale });
  return format(date, "yyyy", { locale });
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-emerald-700">
        {payload[0].value.toFixed(4)}
      </p>
    </div>
  );
}

export default function Chart({ data, period }) {
  const { language } = useLanguage();

  if (!data || data.length === 0)
    return (
      <p className="text-gray-400 text-center py-8">Nenhum dado para exibir</p>
    );

  const chartData = data.map((d) => ({
    date: d.date,
    label: formatDate(d.date, period, language),
    rate: d.rate,
  }));

  return (
    <div className="w-full h-75">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#059669" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickLine={false}
            axisLine={{ stroke: "#d1d5db" }}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickLine={false}
            axisLine={{ stroke: "#d1d5db" }}
            domain={["auto", "auto"]}
            tickFormatter={(val) => val.toFixed(2)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#059669"
            strokeWidth={2}
            fill="url(#colorRate)"
            dot={false}
            activeDot={{ r: 4, fill: "#059669" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
