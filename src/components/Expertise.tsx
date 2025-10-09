import { BarChart, Code, Cpu, Layout, Server, Smartphone } from "lucide-react";
import { useTranslations } from 'next-intl';

export const Expertise = () => {
  const t = useTranslations('Expertise');

  const expertiseAreas = [
    {
      icon: <Code size={32} />,
      title: "0", // Reference to the expertise area index in translations
      description: "0", // Reference to the expertise area index in translations
    },
    {
      icon: <Smartphone size={32} />,
      title: "1",
      description: "1",
    },
    {
      icon: <Layout size={32} />,
      title: "2",
      description: "2",
    },
    {
      icon: <Cpu size={32} />,
      title: "3",
      description: "3",
    },
    {
      icon: <Server size={32} />,
      title: "4",
      description: "4",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            "{t('quote')}"
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center max-w-7xl mx-auto">
          {expertiseAreas.map((area, idx) => (
            <div 
              key={idx}
              className="group p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform inline-block">
                {area.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">{t(`expertiseAreas.${area.title}.title`)}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{t(`expertiseAreas.${area.description}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};