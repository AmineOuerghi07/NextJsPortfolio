import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-stone-200 px-4 py-8 sm:px-6 lg:px-10 dark:border-stone-800">
      <div>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          © {new Date().getFullYear()} {t("copyright")}
        </p>
        <p className="mt-1 text-sm text-stone-400 dark:text-stone-500">{t("builtWith")}</p>
      </div>
    </footer>
  );
};
