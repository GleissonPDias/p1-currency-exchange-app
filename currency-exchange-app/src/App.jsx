import { ArrowDownToLine } from "lucide-react";
import "./App.css";
import Header from "./components/Header";
import Divider from "./components/Divider";
import Title from "./components/Title";
import CurrencyField from "./components/CurrencyField";
import HistoryField from "./components/HistoryField";
import RecentQuotes from "./components/RecentQuotes";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-white w-full h-full">
      <Header />
      <Divider />
      <Title />
      <CurrencyField />
      <HistoryField />
      <RecentQuotes />
      <Divider />
      <Footer />
    </div>
  );
}

export default App;
