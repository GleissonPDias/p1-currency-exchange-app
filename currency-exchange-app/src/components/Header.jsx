import { useLanguage } from "../context/LanguageContext";

function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="flex flex-row p-4 sm:p-6 md:p-8 items-center gap-3 sm:gap-4 justify-between">
      <div className="flex items-center gap-3">
        <img className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm" src="/avatar.jpg" alt="Hermes" />
        <h1 className="text-green-950 tracking-widest font-bold text-lg sm:text-xl">
          HERMES
        </h1>
      </div>
      <div className="flex items-center bg-gray-100 rounded-xl gap-1 sm:gap-2 text-gray-500 p-1 font-bold text-xs sm:text-sm">
        <button
          className={`rounded-lg px-2.5 py-1 transition-all ${language === "PT" ? "bg-white shadow text-emerald-950 font-bold" : "hover:text-gray-800"}`}
          onClick={() => setLanguage("PT")}
        >
          PT
        </button>
        <button
          className={`rounded-lg px-2.5 py-1 transition-all ${language === "EN" ? "bg-white shadow text-emerald-950 font-bold" : "hover:text-gray-800"}`}
          onClick={() => setLanguage("EN")}
        >
          EN
        </button>
        <button
          className={`rounded-lg px-2.5 py-1 transition-all ${language === "ES" ? "bg-white shadow text-emerald-950 font-bold" : "hover:text-gray-800"}`}
          onClick={() => setLanguage("ES")}
        >
          ES
        </button>
      </div>
    </header>
  );
}

export default Header;
