import { useTheme } from "@/context/ThemeContext";
import { Menu, Moon, Sun, X, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const currentLocale = useLocale();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileLanguageMenuOpen, setIsMobileLanguageMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: t("navLinks.about") },
    { href: "#projects", label: t("navLinks.projects") },
    { href: "#skills", label: t("navLinks.skills") },
    { href: "#experience", label: t("navLinks.experience") },
    { href: "#contact", label: t("navLinks.contact") },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const switchLanguage = (newLocale: string) => {
    startTransition(() => {
      const currentPathWithoutLocale = pathname.startsWith(`/${currentLocale}`)
        ? pathname.slice(currentLocale.length + 1) || "/"
        : pathname;

      const newPath = `/${newLocale}${currentPathWithoutLocale === "/" ? "" : currentPathWithoutLocale}`;

      router.push(newPath);
      setIsLanguageDropdownOpen(false);
      setIsMobileLanguageMenuOpen(false);
    });
  };

  const getLanguageName = (locale: string) => {
    const langMap: Record<string, string> = {
      en: "english",
      fr: "french",
      ar: "arabic",
    };
    const langKey = langMap[locale] || "english";
    return t(`languages.${langKey}`);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsLanguageDropdownOpen(false), 200);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsLanguageDropdownOpen(true);
  };

  const iconButtonClass =
    "rounded-full border border-stone-300 p-2 text-stone-700 transition-colors hover:border-amber-700 hover:text-amber-800 dark:border-stone-700 dark:text-stone-300 dark:hover:border-amber-400 dark:hover:text-amber-400";

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b backdrop-blur-md transition-colors lg:hidden ${
        scrolled
          ? "border-stone-200 bg-stone-100/95 dark:border-stone-800 dark:bg-stone-950/95"
          : "border-transparent bg-stone-100/80 dark:bg-stone-950/80"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <a
            href="#hero"
            className="text-lg font-semibold tracking-tight text-stone-950 sm:text-xl dark:text-stone-50"
            onClick={(e) => handleNavClick(e, "#hero")}
          >
            {t("brandPart1")}
            <span className="text-amber-800 dark:text-amber-400">{t("brandPart2")}</span>
          </a>

          <div className="hidden items-center gap-1 md:flex lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="rounded-full px-3 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-200/70 hover:text-stone-950 lg:px-4 lg:text-base dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-50"
              >
                {link.label}
              </a>
            ))}
            <button onClick={toggleTheme} className={`${iconButtonClass} ms-2`} aria-label={t("themeToggleAria")}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className={iconButtonClass} aria-label={t("languageSwitchAria")} disabled={isPending}>
                <Globe size={18} />
              </button>
              {isLanguageDropdownOpen && (
                <div className="absolute end-0 z-10 mt-2 w-40 rounded-xl border border-stone-200 bg-white py-1 shadow-sm dark:border-stone-700 dark:bg-stone-900">
                  {["english", "french", "arabic"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => switchLanguage(lang === "english" ? "en" : lang === "french" ? "fr" : "ar")}
                      className="block w-full px-4 py-2 text-start text-sm text-stone-700 transition-colors hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                    >
                      {t(`languages.${lang}`)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleTheme} className={iconButtonClass} aria-label={t("themeToggleAria")}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className={iconButtonClass}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t("menuToggleAria")}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="space-y-1 border-t border-stone-200 py-4 md:hidden dark:border-stone-800">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block rounded-lg px-3 py-2 text-stone-700 transition-colors hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setIsMobileLanguageMenuOpen(!isMobileLanguageMenuOpen)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-start text-stone-700 transition-colors hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-stone-800"
              aria-label={t("languageSwitchAria")}
            >
              <Globe size={18} />
              {getLanguageName(currentLocale)}
            </button>
            {isMobileLanguageMenuOpen && (
              <div className="space-y-1 ps-4">
                {["english", "french", "arabic"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => switchLanguage(lang === "english" ? "en" : lang === "french" ? "fr" : "ar")}
                    className="block w-full rounded-lg px-3 py-2 text-start text-sm text-stone-700 transition-colors hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-stone-800"
                  >
                    {t(`languages.${lang}`)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
