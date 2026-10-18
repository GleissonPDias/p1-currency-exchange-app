import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="flex flex-col sm:flex-row p-4 sm:p-6 md:p-8 items-center justify-between gap-4 border-t border-slate-100 mt-8">
      <div className="flex items-center gap-3">
        <img className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-xs" src="/avatar.jpg" alt="Hermes" />
        <h1 className="text-green-950 tracking-widest font-bold text-lg sm:text-xl">
          HERMES
        </h1>
      </div>
      <p className="text-xs sm:text-sm text-slate-500 text-center sm:text-right">{t("copyright")}</p>
    </footer>
  );
}

export default Footer;
