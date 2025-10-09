import { Award, Briefcase, ChevronRight, Code, Github, Linkedin, Mail, Users } from "lucide-react";
import { useTranslations } from 'next-intl';

interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
}

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

export const Hero = () => {
  const t = useTranslations('Hero');

  const techContext = {
    react: 'React',
    flutter: 'Flutter',
    nestjs: 'NestJS',
    dotnet: '.NET',
    springboot: 'Spring Boot',
    mongodb: 'MongoDB',
    sqlserver: 'SQL Server'
  };

  return (
    <section id="hero" className="pt-4 sm:pt-8 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                {t('tag')}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              {t('titlePart1')}
              <span className="block text-blue-600 dark:text-blue-400 mt-2">{t('titlePart2')}</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              {t('description', techContext)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#projects" 
                className="group bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all hover:shadow-xl hover:scale-105 inline-flex items-center justify-center gap-2"
                onClick={(e) => handleNavClick(e, '#projects')}
              >
                {t('viewProjects')}
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 font-medium transition-all hover:shadow-lg inline-flex items-center justify-center gap-2"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                {t('getInTouch')}
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3 sm:gap-4 pt-4">
              {[
                { Icon: Github, href: 'https://github.com/AmineOuerghi07', label: t('socialLinks.github') },
                { Icon: Linkedin, href: 'https://linkedin.com/in/mohamed-amine-ouerghi', label: t('socialLinks.linkedin') },
                { Icon: Mail, href: 'mailto:MohamedAmineOuerghi07@gmail.com', label: t('socialLinks.email') }
              ].map(({ Icon, href, label }) => (
                <a 
                  key={label}
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-all hover:shadow-lg hover:scale-110"
                  aria-label={label}
                >
                  <Icon size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl transition-colors">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">{t("carrerHighlight")}</h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <StatCard icon={<Code />} number="6+" label={t('statCards.projectsCompleted')} />
              <StatCard icon={<Briefcase />} number="3" label={t('statCards.internships')} />
              <StatCard icon={<Award />} number="6+" label={t('statCards.techStacksMastered')} />
              <StatCard icon={<Users />} number="∞" label={t('statCards.passionForLearning')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, number, label }: StatCardProps) => (
  <div className="group text-center p-3 sm:p-4 rounded-xl transition-all">
    <div className="inline-flex p-2 sm:p-3 bg-gray-200 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{number}</div>
    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{label}</div>
  </div>
);