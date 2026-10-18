import { useLanguage } from "../context/LanguageContext";

function Title() {
  const { t } = useLanguage();

  return (
    <section className="p-8">
      <p className="text-green-800 font-bold tracking-widest text-[12px]">
        {t("tagline")}
      </p>
      <h1 className="text-6xl text-green-950 mt-4">{t("heroTitle")}</h1>
      <p className="text-slate-500 mt-6">{t("heroSubtitle")}</p>
    </section>
  );
}

export default Title;
