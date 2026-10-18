import { ArrowDownToLine } from "lucide-react";
import "./App.css";
import Header from "./components/Header";
import Divider from "./components/Divider";
import Title from "./components/Title";
import CurrencyField from "./components/CurrencyField";
import HistoryField from "./components/HistoryField";
import RecentQuotes from "./components/RecentQuotes";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { fetchCurrencies } from "./services/api";

function App() {
  const [currencies, setCurrencies] = useState({});
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("BRL");

  useEffect(() => {
    fetchCurrencies()
      .then(setCurrencies)
      .catch((err) => console.error("Erro ao carregar moedas:", err));
  }, []);

  return (
    <div className="bg-white w-full h-full">
      <Header />
      <Divider />
      <Title />
      <CurrencyField
        currencies={currencies}
        from={from}
        to={to}
        onFromChange={setFrom}
        onToChange={setTo}
      />
      <HistoryField from={from} to={to} />
      <Footer />
    </div>
  );
}

export default App;
