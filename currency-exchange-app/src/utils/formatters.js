const localeMap = { PT: "pt-BR", EN: "en-US", ES: "es-ES" };

/**
 * Formata uma data local como YYYY-MM-DD sem converter para UTC.
 * Evita o deslocamento de um dia em fusos negativos perto da meia-noite.
 */
export function toISODate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatRate(value, language) {
  if (value == null || isNaN(value)) return "-";
  return new Intl.NumberFormat(localeMap[language] || "pt-BR", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(value);
}
