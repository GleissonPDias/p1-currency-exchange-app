import Papa from "papaparse";

export function exportToCSV(data, from, to) {
  if (!data || data.length === 0) {
    alert("Não há dados para exportar");
    return;
  }

  const rows = data.map((r, i) => {
    const prev = data[i - 1];
    const variation = prev
      ? (((r.rate - prev.rate) / prev.rate) * 100).toFixed(2) + "%"
      : "";
    return {
      Data: r.date,
      "Moeda Origem": from,
      "Moeda Destino": to,
      Cotação: r.rate.toFixed(4),
      Variação: variation,
    };
  });

  const csv = Papa.unparse(rows, {
    delimiter: ";",
    header: true,
  });

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${from}_${to}_historico_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
