import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className="text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400 dark:text-gray-500 text-sm sm:text-base">
          © {new Date().getFullYear()} {t('copyright')}
        </p>
        <p className="text-gray-500 dark:text-gray-600 mt-2 text-sm">
          {t('builtWith')}
        </p>
      </div>
    </footer>
  );
};