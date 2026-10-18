import { createContext, useContext, useState } from "react";

const translations = {
  PT: {
    tagline: "CLAREZA PARA SUAS DECISÕES",
    heroTitle: "Câmbio, sem complicação.",
    heroSubtitle: "Converta moedas e acompanhe o mercado em um só lugar.",
    converterTitle: "Conversor de moedas",
    youSend: "Você envia",
    youReceive: "Você recebe",
    commercialRate: "Cotação comercial",
    loading: "Carregando cotação...",
    errorLoading: "Não foi possível carregar os dados",
    historyTitle: "Histórico da cotação",
    tableTitle: "Dados",
    data: "Data",
    origin: "Origem",
    destination: "Destino",
    rate: "Cotação",
    minRate: "Cotação mín",
    maxRate: "Cotação máx",
    clearFilters: "Limpar filtros",
    exportCSV: "Exportar CSV",
    recordsFound: "registro(s) encontrado(s)",
    variation: "Variação",
    noData: "Sem dados para exibir",
    noDataAvailable: "Nenhum dado disponível para este período.",
    loadingHistory: "Carregando histórico...",
    errorHistory: "Houve uma falha na conexão. Tente novamente em instantes.",
    retry: "Tentar novamente",
    copyright: "© 2025 Hermes",
  },
  EN: {
    tagline: "CLARITY FOR YOUR DECISIONS",
    heroTitle: "Exchange, without complication.",
    heroSubtitle: "Convert currencies and track the market in one place.",
    converterTitle: "Currency converter",
    youSend: "You send",
    youReceive: "You receive",
    commercialRate: "Commercial rate",
    loading: "Loading rate...",
    errorLoading: "Unable to load data",
    historyTitle: "Rate history",
    tableTitle: "Data",
    data: "Date",
    origin: "Origin",
    destination: "Destination",
    rate: "Rate",
    minRate: "Min rate",
    maxRate: "Max rate",
    clearFilters: "Clear filters",
    exportCSV: "Export CSV",
    recordsFound: "record(s) found",
    variation: "Variation",
    noData: "No data to display",
    noDataAvailable: "No data available for this period.",
    loadingHistory: "Loading history...",
    errorHistory:
      "There was a connection failure. Please try again in a moment.",
    retry: "Try again",
    copyright: "© 2025 Hermes",
  },
  ES: {
    tagline: "CLARIDAD PARA SUS DECISIONES",
    heroTitle: "Cambio, sin complicaciones.",
    heroSubtitle: "Convierte monedas y sigue el mercado en un solo lugar.",
    converterTitle: "Conversor de monedas",
    youSend: "Envías",
    youReceive: "Recibes",
    commercialRate: "Cotação comercial",
    loading: "Cargando cotización...",
    errorLoading: "No se pudieron cargar los datos",
    historyTitle: "Historial de cotización",
    tableTitle: "Datos",
    data: "Fecha",
    origin: "Origen",
    destination: "Destino",
    rate: "Cotización",
    minRate: "Cotización mín",
    maxRate: "Cotización máx",
    clearFilters: "Limpiar filtros",
    exportCSV: "Exportar CSV",
    recordsFound: "registro(s) encontrado(s)",
    variation: "Variación",
    noData: "Sin datos para mostrar",
    noDataAvailable: "No hay datos disponibles para este período.",
    loadingHistory: "Cargando historial...",
    errorHistory:
      "Hubo un fallo de conexión. Inténtalo de nuevo en unos instantes.",
    retry: "Intentar de nuevo",
    copyright: "© 2025 Hermes",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("PT");

  function t(key) {
    return translations[language][key] || key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
