import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";

export const Expertise = () => {
  const t = useTranslations("Expertise");
  const areas = ["0", "1", "2", "3"];

  return (
    <section id="about" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:scroll-mt-10 lg:px-10 lg:py-20">
      <SectionHeading index="01" label={t("label")} title={t("title")} />

      <ul className="mt-8 divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
        {areas.map((id) => (
          <li key={id} className="grid gap-2 py-6 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8">
            <h3 className="text-base font-semibold text-stone-950 dark:text-stone-50">
              {t(`expertiseAreas.${id}.title`)}
            </h3>
            <p className="text-sm leading-relaxed text-stone-600 sm:text-base dark:text-stone-300">
              {t(`expertiseAreas.${id}.description`)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
