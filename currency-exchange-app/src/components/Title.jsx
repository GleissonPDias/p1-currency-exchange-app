import { useLanguage } from "../context/LanguageContext";

function Title() {
  const { t } = useLanguage();

  return (
    <section className="px-4 py-6 sm:px-6 sm:py-8 md:px-8">
      <p className="text-green-800 font-bold tracking-widest text-xs uppercase">
        {t("tagline")}
      </p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-950 mt-3 tracking-tight">
        {t("heroTitle")}
      </h1>
      <p className="text-slate-500 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 max-w-2xl">
        {t("heroSubtitle")}
      </p>
    </section>
  );
}

export default Title;
