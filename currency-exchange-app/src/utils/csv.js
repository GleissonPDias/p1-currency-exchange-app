import { toISODate } from "./formatters";

export function exportToCSV(data, { from, to, t }) {
  if (!data || data.length === 0) {
    alert(t("noDataToExport"));
    return;
  }

  const header = [
    t("csvData"),
    t("csvOrigin"),
    t("csvDestination"),
    t("csvRate"),
    t("csvVariation"),
  ].join(";");

  const rows = data.map((row) => {
    const variation =
      row.variation == null
        ? ""
        : `${row.variation >= 0 ? "+" : ""}${row.variation.toFixed(2)}%`;
    return [row.date, from, to, row.rate.toFixed(4), variation].join(";");
  });

  const csv = [header, ...rows].join("\r\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${from}_${to}_historico_${toISODate()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
