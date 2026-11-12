import { ChevronRight, Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

export const Hero = () => {
  const t = useTranslations("Hero");
  const overviewPoints = ["0", "1", "2"] as const;

  return (
    <section id="hero" className="scroll-mt-24 px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:scroll-mt-8 lg:px-10 lg:pb-16 lg:pt-16">
      <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-800 dark:text-amber-400">
            {t("tag")}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl dark:text-stone-50">
            {t("name")}
          </h1>
          <p className="mt-3 text-lg font-medium text-amber-800 sm:text-xl dark:text-amber-400">
            {t("title")}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-700 sm:text-lg dark:text-stone-300">
            {t("description")}
          </p>
          <p className="mt-4 text-sm text-stone-700 dark:text-stone-300">
            <span className="font-mono text-amber-800 dark:text-amber-400">{t("nowLabel")}</span>
            <span className="ms-2">{t("now")}</span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, "#projects")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800 dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400"
            >
              {t("viewProjects")}
              <ChevronRight size={18} />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-900 transition-colors hover:border-stone-950 dark:border-stone-700 dark:bg-transparent dark:text-stone-100 dark:hover:border-amber-400"
            >
              {t("getInTouch")}
            </a>
          </div>

          <div className="mt-8 flex gap-3">
            {[
              { Icon: Github, href: "https://github.com/AmineOuerghi07", label: t("socialLinks.github") },
              { Icon: Linkedin, href: "https://linkedin.com/in/mohamed-amine-ouerghi", label: t("socialLinks.linkedin") },
              { Icon: Mail, href: "mailto:MohamedAmineOuerghi07@gmail.com", label: t("socialLinks.email") },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 transition-colors hover:border-stone-950 dark:border-stone-700 dark:bg-transparent dark:text-stone-300 dark:hover:border-amber-400 dark:hover:text-amber-400"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-sm sm:p-8 dark:border-stone-800 dark:bg-stone-900 dark:shadow-none">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
            {t("overviewLabel")}
          </p>
          <p className="mt-4 text-base leading-relaxed text-stone-700 dark:text-stone-300">{t("overview")}</p>
          <dl className="mt-6 space-y-4 border-t border-stone-200 pt-6 dark:border-stone-800">
            {overviewPoints.map((key) => (
              <div key={key}>
                <dt className="text-sm font-medium text-stone-950 dark:text-stone-50">
                  {t(`overviewPoints.${key}.label`)}
                </dt>
                <dd className="mt-0.5 text-sm text-stone-600 dark:text-stone-400">
                  {t(`overviewPoints.${key}.value`)}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
};
