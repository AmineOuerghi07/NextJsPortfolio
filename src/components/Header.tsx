import { useTheme } from "@/context/ThemeContext";
import { ArrowUpRight, Menu, Moon, Sun, X, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { routing } from "@/i18n/routing";

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const currentLocale = useLocale(); // Get current locale from next-intl
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // Desktop hover state
  const [isMobileLanguageMenuOpen, setIsMobileLanguageMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t('navLinks.about') },
    { href: '#projects', label: t('navLinks.projects') },
    { href: '#experience', label: t('navLinks.experience') },
    { href: '#contact', label: t('navLinks.contact') }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const switchLanguage = (newLocale: string) => {
  startTransition(() => {
    // Extract the path without the current locale prefix
    const currentPathWithoutLocale = pathname.startsWith(`/${currentLocale}`)
      ? pathname.slice(currentLocale.length + 1) || '/'  // Remove '/en' and keep the rest (e.g., '/' or '/#about')
      : pathname;

    // Build the new path with the new locale
    const newPath = `/${newLocale}${currentPathWithoutLocale === '/' ? '' : currentPathWithoutLocale}`;

    router.push(newPath);
    setIsLanguageDropdownOpen(false); // Close desktop dropdown
    setIsMobileLanguageMenuOpen(false); // Close mobile menu
  });
};

const getLanguageName = (locale: string) => {
    const langMap: Record<string, string> = {
      en: 'english',
      fr: 'french',
      ar: 'arabic',
    };
    const langKey = langMap[locale] || 'english'; // Default to 'english' if unknown
    return t(`languages.${langKey}`);
  };

// Handle dropdown close with delay
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsLanguageDropdownOpen(false), 200); // 200ms delay
  };

  // Clear timeout on mouse enter
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsLanguageDropdownOpen(true);
  };
return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <a 
            href="#" 
            className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-transform hover:scale-105"
            onClick={(e) => handleNavClick(e, '#')}
          >
            {t('brandPart1')}<span className="text-blue-600 dark:text-blue-400">{t('brandPart2')}</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 ml-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              aria-label={t('themeToggleAria')}
            >
              {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
            </button>
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="p-2 ml-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                aria-label={t('languageSwitchAria')}
                disabled={isPending}
              >
                <Globe size={20} className="text-gray-700 dark:text-gray-300" />
              </button>
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                  {['english', 'french', 'arabic'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => switchLanguage(lang === 'english' ? 'en' : lang === 'french' ? 'fr' : 'ar')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {t(`languages.${lang}`)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              aria-label={t('themeToggleAria')}
            >
              {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700" />}
            </button>
            <button 
              className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('menuToggleAria')}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200 dark:border-gray-800">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setIsMobileLanguageMenuOpen(!isMobileLanguageMenuOpen)}
              className="block w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label={t('languageSwitchAria')}
            >
              <Globe size={24} className="inline mr-2 text-gray-700 dark:text-gray-300" /> {getLanguageName(currentLocale)}
            </button>
            {isMobileLanguageMenuOpen && (
              <div className="pl-4 space-y-1">
                {['english', 'french', 'arabic'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => switchLanguage(lang === 'english' ? 'en' : lang === 'french' ? 'fr' : 'ar')}
                    className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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