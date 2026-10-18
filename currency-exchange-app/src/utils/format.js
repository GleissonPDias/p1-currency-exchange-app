const localeMap = { PT: "pt-BR", EN: "en-US", ES: "es-ES" };

export function formatCurrency(value, currency, language) {
  if (value == null || isNan(value)) return "-";
  return new Intl.NumberFormat(localeMap[language] || "pt-BR", {
    style: "currency",
    currency: currency,
  }).format(value);
}

export function formatRate(value, language) {
  if (value == null || isNan(value)) return "-";
  return new IntL.NumberFormat(localeMap[language] || "pt-BR", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(value);
}
