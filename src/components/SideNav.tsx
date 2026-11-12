"use client";

import { useTheme } from "@/context/ThemeContext";
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const sections = [
  { id: "about", index: "01", key: "about" },
  { id: "projects", index: "02", key: "projects" },
  { id: "skills", index: "03", key: "skills" },
  { id: "experience", index: "04", key: "experience" },
  { id: "contact", index: "05", key: "contact" },
] as const;

const locales = [
  { id: "en", code: "EN", name: "english" },
  { id: "fr", code: "FR", name: "french" },
  { id: "ar", code: "AR", name: "arabic" },
] as const;

export const SideNav = () => {
  const t = useTranslations("Header");
  const hero = useTranslations("Hero");
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [active, setActive] = useState("");

  useEffect(() => {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });
        const next = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        setActive(next ? next[0] : "");
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setActive(id);
    const element = document.getElementById(id);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - 32;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const switchLanguage = (nextLocale: string) => {
    startTransition(() => {
      const pathWithoutLocale = pathname.startsWith(`/${currentLocale}`)
        ? pathname.slice(currentLocale.length + 1) || "/"
        : pathname;
      const nextPath = `/${nextLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
      router.push(nextPath);
    });
  };

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-0 flex h-screen flex-col px-6 py-10">
        <a href="#hero" onClick={(event) => handleNavClick(event, "hero")} className="text-lg font-semibold tracking-tight">
          {t("brandPart1")}
          <span className="text-amber-800 dark:text-amber-400">{t("brandPart2")}</span>
        </a>
        <p className="mt-2 text-sm font-medium text-stone-800 dark:text-stone-200">{hero("title")}</p>
        <p className="mt-3 text-sm leading-relaxed text-stone-500 dark:text-stone-400">{hero("tag")}</p>

        <nav className="mt-10" aria-label={t("sectionNavAria")}>
          <ul className="space-y-1">
            {sections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => handleNavClick(event, section.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-baseline gap-3 rounded-md px-2 py-1.5 font-mono text-xs transition-colors ${
                      isActive
                        ? "bg-amber-800/10 text-amber-900 dark:bg-amber-400/10 dark:text-amber-300"
                        : "text-stone-500 hover:text-stone-950 dark:hover:text-stone-100"
                    }`}
                  >
                    <span>{section.index}</span>
                    <span className="font-sans text-sm">{t(`navLinks.${section.key}`)}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto space-y-5">
          <div className="flex items-center gap-2">
            {locales.map((locale) => (
              <button
                key={locale.id}
                type="button"
                onClick={() => switchLanguage(locale.id)}
                disabled={isPending}
                aria-label={t(`languages.${locale.name}`)}
                aria-current={currentLocale === locale.id ? "true" : undefined}
                className={`rounded-full px-2.5 py-1 font-mono text-xs ${
                  currentLocale === locale.id
                    ? "bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950"
                    : "text-stone-500 hover:text-stone-950 dark:hover:text-stone-100"
                }`}
              >
                {locale.code}
              </button>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t("themeToggleAria")}
              className="ms-auto rounded-full border border-stone-300 p-2 text-stone-700 dark:border-stone-700 dark:text-stone-300"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <div className="flex gap-3 text-stone-500">
            <a href="https://github.com/AmineOuerghi07" target="_blank" rel="noopener noreferrer" aria-label={hero("socialLinks.github")} className="hover:text-amber-800 dark:hover:text-amber-400">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/mohamed-amine-ouerghi" target="_blank" rel="noopener noreferrer" aria-label={hero("socialLinks.linkedin")} className="hover:text-amber-800 dark:hover:text-amber-400">
              <Linkedin size={18} />
            </a>
            <a href="mailto:MohamedAmineOuerghi07@gmail.com" aria-label={hero("socialLinks.email")} className="hover:text-amber-800 dark:hover:text-amber-400">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};
