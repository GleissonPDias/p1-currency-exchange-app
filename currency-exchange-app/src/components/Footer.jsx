import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="flex flex-direction-row p-8 place-items-center gap-4">
      <img className="w-10 rounded-full" src="/avatar.jpg" alt="Hermes" />
      <h1 className="flex-1 text-green-950 tracking-widest font-bold text-[20px]">
        HERMES
      </h1>
      <p>{t("copyright")}</p>
    </footer>
  );
}

export default Footer;
