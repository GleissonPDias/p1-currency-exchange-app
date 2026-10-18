import { useLanguage } from "../context/LanguageContext";

function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="flex flex-direction-row p-8 place-items-center gap-4">
      <img className="w-10 rounded-full" src="/avatar.jpg" alt="Hermes" />
      <h1 className="flex-1 text-green-950 tracking-widest font-bold text-[20px]">
        HERMES
      </h1>
      <div className="flex justify-end bg-gray-100 box-content rounded gap-6 text-gray-500 p-2 pl-4 pr-4 font-bold">
        <button
          className={`rounded-2xl p-1 ${language === "PT" ? "bg-white shadow" : ""}`}
          onClick={() => setLanguage("PT")}
        >
          PT
        </button>
        <button
          className={`rounded-2xl p-1 ${language === "EN" ? "bg-white shadow" : ""}`}
          onClick={() => setLanguage("EN")}
        >
          EN
        </button>
        <button
          className={`rounded-2xl p-1 ${language === "ES" ? "bg-white shadow" : ""}`}
          onClick={() => setLanguage("ES")}
        >
          ES
        </button>
      </div>
    </header>
  );
}

export default Header;
