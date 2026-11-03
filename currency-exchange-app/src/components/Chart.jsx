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
import { useLanguage } from "../context/useLanguage";

const locales = { PT: ptBR, EN: enUS, ES: es };

function formatTick(dateStr, period, language) {
  if (!dateStr) return "";
  try {
    const date = parseISO(dateStr);
    const locale = locales[language] || ptBR;
    if (
      period === "7D" ||
      period === "15D" ||
      period === "30D" ||
      period === "3M"
    ) {
      return format(date, "dd MMM", { locale });
    }
    if (period === "6M" || period === "1A") {
      return format(date, "MMM yyyy", { locale });
    }
    return format(date, "yyyy", { locale });
  } catch {
    return dateStr;
  }
}

function formatTooltipDate(dateStr, language) {
  if (!dateStr) return "";
  try {
    const date = parseISO(dateStr);
    const locale = locales[language] || ptBR;
    return format(date, "dd MMM yyyy", { locale });
  } catch {
    return dateStr;
  }
}

function CustomTooltip({ active, payload, label, language }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="text-xs text-gray-500 font-medium">
        {formatTooltipDate(label, language)}
      </p>
      <p className="text-sm font-semibold text-emerald-700">
        {payload[0].value.toFixed(4)}
      </p>
    </div>
  );
}

export default function Chart({ data, period }) {
  const { language, t } = useLanguage();

  if (!data || data.length === 0)
    return (
      <p className="text-gray-400 text-center py-8">{t("chartNoData")}</p>
    );

  return (
    <div className="w-full h-64 sm:h-72 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
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
            dataKey="date"
            tickFormatter={(dateStr) => formatTick(dateStr, period, language)}
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickLine={false}
            axisLine={{ stroke: "#d1d5db" }}
            minTickGap={25}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickLine={false}
            axisLine={{ stroke: "#d1d5db" }}
            domain={["auto", "auto"]}
            tickFormatter={(val) => val.toFixed(2)}
          />
          <Tooltip content={<CustomTooltip language={language} />} />
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
